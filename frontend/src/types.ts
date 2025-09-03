export type Stage = {
  title: string;
  description: string;
  durationWeeks?: number;
  prerequisites?: string[];
};

export type Syllabus = {
  id?: string | number;
  skill: string;
  totalWeeks?: number;
  stages: Stage[];
  createdAt?: string;
};
