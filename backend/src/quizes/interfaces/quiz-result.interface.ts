export interface QuestionFeedback {
  questionId: string;
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string;
}

export interface QuizResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  feedback: QuestionFeedback[];
}
