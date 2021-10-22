export interface BasePoll {
  question: string;
  answers: string[];
  multipleChoice: boolean;
}

export interface Poll extends BasePoll {
  id: string;
}
