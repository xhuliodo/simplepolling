import { BasePoll } from "./pollInterface";

export const createBasePollDomainValidation = (
  question: string = "",
  answers: string[] = []
): BasePoll => {
  if (!question.length) {
    throw new Error("you cannot create a poll without a question");
  }
  if (!answers.length) {
    throw new Error("you cannot create a poll without answers");
  }
  answers.forEach((a) => {
    if (!a.length) {
      throw new Error("an answers cannot be empty");
    }
  });
  return { question, answers };
};
