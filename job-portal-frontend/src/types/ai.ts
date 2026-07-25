export interface RecommendedCourse {
  skill: string;
  resource: string;
}

export interface ResumeMatchResult {
  score: number;
  level: string;
  summary: string;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  recommendedCourses: RecommendedCourse[];
}

export interface ResumeMatchResponse {
  success: boolean;
  data: ResumeMatchResult;
}
