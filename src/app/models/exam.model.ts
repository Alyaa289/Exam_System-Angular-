export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; 
  passingScore: number; 
  questions: Question[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  examId: string;
  text: string;
  type: 'multiple-choice' | 'single-choice' | 'true-false';
  options: Option[];
  points: number;
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}