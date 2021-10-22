import { CustomErr, typeOfErr } from "../common/errors/errors";
import { Result } from "../common/resultInterface";
import { BasePoll } from "./pollInterface";

export const createBasePollDomainValidation = (
  question: string = "",
  answers: string[] = [],
  multipleChoice: boolean = false
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
  return { ok: true, data: { question, answers, multipleChoice } };
};
