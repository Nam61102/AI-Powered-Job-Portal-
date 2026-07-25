/**
 * Utility to build the AI prompt for resume matching.
 * 
 * @param {Object} candidate - The candidate profile data
 * @param {Object} job - The job details
 * @returns {string} - The generated prompt string
 */
function buildResumePrompt(candidate, job) {
  const prompt = `You are a professional Applicant Tracking System (ATS) and a Senior Technical Recruiter.
Your task is to perform a detailed, multi-dimensional analysis of the candidate's resume against the specified job requirements.

Evaluate the following criteria:
1. Skills Match: Check how well the candidate's skills align with the required skills.
2. Experience Match: Assess candidate's work experiences and years of experience.
3. Education Match: Check if the candidate's educational background aligns with job expectations.
4. Resume Keywords: Look for industry-specific keywords and technical terms matching the job.
5. Overall ATS Compatibility: Evaluate the formatting, readability, and structural clarity of the resume text.
6. Missing Technologies: Identify tools, frameworks, and programming languages required by the job but missing from the resume.
7. Resume Quality: Assess overall grammar, professionalism, and presentation.

Candidate Resume Text:
${candidate.resumeText || "Not provided"}

Candidate Skills:
${candidate.skills || "Not provided"}

Education:
${candidate.education || "Not provided"}

Experience:
${candidate.experience !== undefined ? candidate.experience + " years" : "Not provided"}

Job Title:
${job.title || "Not provided"}

Job Description:
${job.description || "Not provided"}

Job Skills Required:
${job.skills || "Not provided"}

Job Location:
${job.location || "Not provided"}

Job Salary:
${job.salary || "Not provided"}

Calculate an overall matching score between 0 and 100 based on the evaluation criteria.
Provide the corresponding score level based on these ranges:
- score >= 90: "Excellent Match"
- score >= 75: "Good Match"
- score >= 60: "Average Match"
- score < 60: "Needs Improvement"

Generate:
- "level": The matching score level name based on the score.
- "summary": A professional, cohesive summary of the evaluation (e.g., "Your resume matches most frontend requirements but lacks cloud technologies and backend database experience.").
- "matchedSkills": Array of technical skills and technologies found in both the candidate profile/resume and the job requirements.
- "missingSkills": Array of technical skills and technologies required by the job but missing or lacking in the candidate profile/resume.
- "strengths": Array of candidate's key highlights and strengths relative to this role.
- "weaknesses": Array of candidate's key deficiencies and weaknesses relative to this role.
- "suggestions": Array of highly actionable improvements (e.g., instead of "Learn AWS", suggest "Complete an AWS Cloud Practitioner certification and add one AWS deployment project to your portfolio.").
- "recommendedCourses": Array of objects representing recommended learning resources. Each object must have a "skill" and a "resource" property (e.g., {"skill": "AWS", "resource": "AWS Cloud Practitioner Essentials"}).

Return ONLY a valid, raw JSON object. Do not include markdown code block wrappers (like \`\`\`json or \`\`\`), do not include explanations, and do not include extra text outside the JSON object.

Expected JSON output format:
{
  "score": 82,
  "level": "Good Match",
  "summary": "Your resume is a strong match for this role. You have solid frontend experience but should improve cloud and containerization skills.",
  "matchedSkills": ["React", "Next.js", "TypeScript"],
  "missingSkills": ["AWS", "Docker"],
  "strengths": ["Strong React ecosystem knowledge", "Modern frontend experience"],
  "weaknesses": ["No cloud deployment experience", "No Docker projects"],
  "suggestions": ["Complete AWS Cloud Practitioner certification.", "Build and deploy a Dockerized React application."],
  "recommendedCourses": [
    {
      "skill": "AWS",
      "resource": "AWS Cloud Practitioner Essentials"
    },
    {
      "skill": "Docker",
      "resource": "Docker Official Getting Started Guide"
    }
  ]
}`;

  return prompt;
}

module.exports = {
  buildResumePrompt
};
