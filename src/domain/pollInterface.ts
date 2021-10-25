export interface BasePoll {
  question: string;
  answers: string[];
  multipleChoice: boolean;
  hasDeadline: boolean;
  deadline?: Date;
  closed: boolean;
}

export interface Poll extends BasePoll {
  id: string;
}
