import { CustomErr, typeOfErr } from "../common/errors/errors";
import { Result } from "../common/errors/resultInterface";
import { BasePoll } from "./pollInterface";

export const createBasePollDomainValidation = (
  question: string = "",
  answers: string[] = [],
  multipleChoice: boolean = false,
  hasDeadline: boolean = false,
  closeAferHours?: number
): Result<BasePoll> => {
  if (!question.length) {
    return {
      ok: false,
      error: new CustomErr(
        typeOfErr.bad_request,
        "you cannot create a poll without a question"
      ),
    };
  }
  if (!answers.length) {
    return {
      ok: false,
      error: new CustomErr(
        typeOfErr.bad_request,
        "you cannot create a poll without answers"
      ),
    };
  }
  if (answers.length > 10) {
    return {
      ok: false,
      error: new CustomErr(
        typeOfErr.bad_request,
        "you cannot create a poll with more than 10 answers"
      ),
    };
  }
  answers.forEach((a) => {
    if (!a.length) {
      return {
        ok: false,
        error: new CustomErr(
          typeOfErr.bad_request,
          "an answers cannot be empty"
        ),
      };
    }
  });
  if (hasDeadline && !closeAferHours) {
    return {
      ok: false,
      error: new CustomErr(
        typeOfErr.bad_request,
        "if your poll has a deadline, provide after how many hours it finishes"
      ),
    };
  }
  return {
    ok: true,
    data: { question, answers, multipleChoice, hasDeadline, closed: false },
  };
};
