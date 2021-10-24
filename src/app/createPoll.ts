import { CustomErr, typeOfErr } from "../common/errors/errors";
import { Result } from "../common/resultInterface";
import { createBasePollDomainValidation } from "../domain/poll";
import { BasePoll, Poll } from "../domain/pollInterface";
import { IPollRepo } from "../domain/pollRepo";

export type TCreatePollService = (
  question: string,
  answers: string[],
  multipleChoice: boolean
) => Promise<Result<Poll>>;

export const createPollServiceBuilder = (
  repo: IPollRepo
): TCreatePollService => {
  return async function createPollService(
    question: string,
    answers: string[],
    multipleChoice: boolean
  ) {
    const newPoll = createBasePollDomainValidation(
      question,
      answers,
      multipleChoice
    );

    if (newPoll.ok) {
      const savedPoll = await repo.save(newPoll.data);
      
      if (savedPoll.ok) {
        return { ok: true, data: savedPoll.data };
      }
      if (savedPoll.ok === false) {
        return { ok: false, error: savedPoll.error };
      }
    }

    if (newPoll.ok === false) {
      return {
        ok: false,
        error: new CustomErr(
          typeOfErr.bad_request,
          newPoll.error.message,
          newPoll.error.stack
        ),
      };
    }
  };
};
