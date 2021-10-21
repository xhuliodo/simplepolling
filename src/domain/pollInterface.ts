export interface BasePoll {
  question: string;
  answers: string[];
}

export interface Poll extends BasePoll {
  id: string;
}
