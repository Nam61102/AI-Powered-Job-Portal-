const prisma = require("../config/prisma");
const { buildResumePrompt } = require("../utils/promptBuilder");
const ai = require("../config/gemini"); // IMPORTING GEMINI CLIENT

/**
 * Service to fetch candidate profile and job details for resume matching.
 * 
 * @param {number} userId - The authenticated candidate's user ID.
 * @param {number} jobId - The ID of the job to match against.
 * @returns {Promise<Object>}
 */
const getResumeMatchData = async (userId, jobId) => {
  // 1. Fetch the CandidateProfile for the given userId using Prisma
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId: userId
    }
  });

  // 2. If the candidate profile does not exist, throw a 404 error
  if (!candidate) {
    const error = new Error("Candidate profile not found. Please create a profile first.");
    error.statusCode = 404;
    throw error;
  }

  // 3. Fetch the Job for the given jobId using Prisma
  const job = await prisma.job.findUnique({
    where: {
      id: Number(jobId)
    }
  });

  // 4. If the job does not exist, throw a 404 error
  if (!job) {
    const error = new Error("Job not found.");
    error.statusCode = 404;
    throw error;
  }

  // 5. Build the AI Prompt
  const prompt = buildResumePrompt(candidate, job);
  
  // 6. Tell Gemini which model to use (gemini-1.5-flash is fast and good for text)
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  // 7. Send the prompt to Gemini and wait for the result
  const result = await model.generateContent(prompt);
  const aiTextResponse = result.response.text();

  // 8. Clean and parse the response into JSON
  let aiResponse;
  try {
    // Gemini sometimes wraps JSON in ```json ... ``` tags, so we remove them
    const cleanJson = aiTextResponse.replace(/```json/gi, '').replace(/```/gi, '').trim();
    aiResponse = JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error parsing Gemini JSON:", aiTextResponse);
    throw new Error("Failed to process AI response.");
  }

  // 9. Return the final JSON response from Gemini
  return aiResponse;
};

module.exports = {
  getResumeMatchData
};