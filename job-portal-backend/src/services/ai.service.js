const prisma = require("../config/prisma");
const { buildResumePrompt } = require("../utils/promptBuilder");
const ai = require("../config/gemini");
const axios = require("axios");
const { PDFParse } = require("pdf-parse");

/**
 * Programmatically calculates the match level based on the score.
 * 
 * @param {number} score - The matching score (0-100).
 * @returns {string} - The matching level.
 */
const calculateLevel = (score) => {
  if (score >= 90) return "Excellent Match";
  if (score >= 75) return "Good Match";
  if (score >= 60) return "Average Match";
  return "Needs Improvement";
};

/**
 * Sanitizes Gemini's output by removing markdown wrappers (like ```json ... ```).
 * 
 * @param {string} rawText - The raw response text from Gemini.
 * @returns {string} - Cleaned JSON string.
 */
const cleanGeminiResponse = (rawText) => {
  if (!rawText) return "";
  return rawText.replace(/```json/gi, '').replace(/```/gi, '').trim();
};

/**
 * Validates candidate profile, completeness, resume content, and job existence.
 * 
 * @param {Object} candidate - The candidate profile object from Prisma.
 * @param {Object} job - The job object from Prisma.
 */
const validateResumeData = (candidate, job) => {
  // Candidate Profile existence check
  if (!candidate) {
    const error = new Error("Candidate profile not found. Please create a profile first.");
    error.statusCode = 404;
    throw error;
  }

  // Candidate Profile completeness check
  if (!candidate.skills || !candidate.education || candidate.experience === undefined || candidate.experience === null) {
    const error = new Error("Candidate profile is incomplete. Please ensure skills, education, and experience are filled.");
    error.statusCode = 400;
    throw error;
  }

  // Resume text missing check
  if (!candidate.resumeText || candidate.resumeText.trim() === "") {
    const error = new Error("Resume text is missing. Please upload a resume first.");
    error.statusCode = 400;
    throw error;
  }

  // Job existence check
  if (!job) {
    const error = new Error("Job not found.");
    error.statusCode = 404;
    throw error;
  }
};

/**
 * Service to fetch candidate profile and job details for resume matching.
 * 
 * @param {number} userId - The authenticated candidate's user ID.
 * @param {number|string} jobId - The ID of the job to match against.
 * @returns {Promise<Object>}
 */
const getResumeMatchData = async (userId, jobId) => {
  // 0. Validate input jobId
  if (!jobId || isNaN(Number(jobId))) {
    const error = new Error("jobId is required and must be a valid numeric ID.");
    error.statusCode = 400;
    throw error;
  }

  // 1. Fetch the CandidateProfile for the given userId using Prisma
  let candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId: userId
    }
  });

  // 2. Fetch the Job for the given jobId using Prisma
  const job = await prisma.job.findUnique({
    where: {
      id: Number(jobId)
    }
  });

  // 3. On-the-fly PDF parsing if resumeText is missing but resumeUrl is present
  if (candidate && (!candidate.resumeText || candidate.resumeText.trim() === "") && candidate.resumeUrl) {
    try {
      console.log(`Attempting on-the-fly PDF extraction from resumeUrl: ${candidate.resumeUrl}`);
      const response = await axios.get(candidate.resumeUrl, { responseType: "arraybuffer" });
      const parser = new PDFParse({ data: response.data });
      const pdfData = await parser.getText();
      if (pdfData && pdfData.text) {
        candidate.resumeText = pdfData.text;
        
        // Save the parsed text back to the database for future calls
        await prisma.candidateProfile.update({
          where: { id: candidate.id },
          data: { resumeText: pdfData.text }
        });
        console.log("Successfully parsed and backfilled resumeText in database.");
      }
    } catch (e) {
      console.error("Failed to parse PDF from resumeUrl on the fly:", e.message);
    }
  }

  // 4. Perform comprehensive resume/profile and job validation using helper function
  validateResumeData(candidate, job);

  // 5. Build the AI Prompt
  const prompt = buildResumePrompt(candidate, job);
  
  // 6. Tell Gemini which model to use (gemini-3.5-flash is fast and good for text)
  const model = ai.getGenerativeModel({ model: "gemini-3.5-flash" });

  // 7. Send the prompt to Gemini and wait for the result
  let result;
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => {
        const error = new Error("AI request timed out. Please try again later.");
        error.statusCode = 504; // Gateway Timeout
        reject(error);
      }, 15000)
    );

    result = await Promise.race([
      model.generateContent(prompt),
      timeoutPromise
    ]);
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    console.error("Gemini API Error:", error);

    const errMsg = error.message || "";
    if (
      errMsg.includes("API key not valid") || 
      errMsg.includes("API_KEY_INVALID") || 
      errMsg.includes("key is invalid") ||
      error.status === 400 || 
      error.status === 403
    ) {
      const apiError = new Error("Invalid Google Gemini API Key.");
      apiError.statusCode = 401; // Unauthorized
      throw apiError;
    }

    if (
      errMsg.includes("timeout") || 
      errMsg.includes("deadline exceeded") || 
      errMsg.includes("fetch failed")
    ) {
      const apiError = new Error("AI request timed out or connection failed. Please try again.");
      apiError.statusCode = 504;
      throw apiError;
    }

    const apiError = new Error("Google Gemini AI service error: " + errMsg);
    apiError.statusCode = 500;
    throw apiError;
  }

  // 8. Clean and parse the response into JSON
  let aiResponse;
  try {
    const aiTextResponse = result.response.text();
    const cleanJson = cleanGeminiResponse(aiTextResponse);
    aiResponse = JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error parsing Gemini JSON:", error);
    const jsonError = new Error("Failed to parse valid JSON from AI response.");
    jsonError.statusCode = 500;
    throw jsonError;
  }

  // 9. Programmatically enforce/fallback properties for robust schema compatibility
  const finalScore = typeof aiResponse.score === 'number' ? aiResponse.score : (parseInt(aiResponse.score, 10) || 0);
  const finalLevel = calculateLevel(finalScore);

  // 10. Return the final structured response from Gemini
  return {
    success: true,
    data: {
      score: finalScore,
      level: finalLevel,
      summary: aiResponse.summary || `Your resume has been analyzed and matched with a score of ${finalScore}%.`,
      matchedSkills: Array.isArray(aiResponse.matchedSkills) ? aiResponse.matchedSkills : [],
      missingSkills: Array.isArray(aiResponse.missingSkills) ? aiResponse.missingSkills : [],
      strengths: Array.isArray(aiResponse.strengths) ? aiResponse.strengths : [],
      weaknesses: Array.isArray(aiResponse.weaknesses) ? aiResponse.weaknesses : [],
      suggestions: Array.isArray(aiResponse.suggestions) ? aiResponse.suggestions : [],
      recommendedCourses: Array.isArray(aiResponse.recommendedCourses) ? aiResponse.recommendedCourses.map(course => ({
        skill: course.skill || "Unspecified",
        resource: course.resource || "General Resource"
      })) : []
    }
  };
};

module.exports = {
  getResumeMatchData
};