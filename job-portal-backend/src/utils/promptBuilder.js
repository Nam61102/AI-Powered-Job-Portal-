/**
 * Utility to build the AI prompt for resume matching.
 * 
 * @param {Object} candidate - The candidate profile data
 * @param {Object} job - The job details
 * @returns {string} - The generated prompt string
 */
function buildResumePrompt(candidate, job) {
  const prompt = `You are an ATS Resume Analyzer.

Candidate Resume:

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

Job Location:

${job.location || "Not provided"}

Job Salary:

${job.salary || "Not provided"}

Analyze the resume against the job.

Return ONLY valid JSON.

Do not explain anything.

Do not use markdown.

Do not use code blocks.

{
  "score": <number 0-100>,
  "matchedSkills": [<array of strings>],
  "missingSkills": [<array of strings>],
  "strengths": [<array of strings>],
  "weaknesses": [<array of strings>],
  "suggestions": [<array of strings>]
}`;

  return prompt;
}

module.exports = {
  buildResumePrompt
};
