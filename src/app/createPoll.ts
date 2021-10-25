import { CustomErr, typeOfErr } from "../common/errors/errors";
import { Result } from "../common/errors/resultInterface";
import { IExternalAPI } from "../domain/externalApiRepo";
import { createBasePollDomainValidation } from "../domain/poll";
import { Poll } from "../domain/pollInterface";
import { IPollRepo } from "../domain/pollRepo";

export type TCreatePollService = (
  question: string,
  answers: string[],
  multipleChoice: boolean,
  hasDeadline: boolean,
  closeAferHours?: number
) => Promise<Result<Poll>>;

export const createPollServiceBuilder = (
  repo: IPollRepo,
  externalAPI: IExternalAPI
): TCreatePollService => {
  return async function createPollService(
    question,
    answers,
    multipleChoice,
    hasDeadline,
    closeAferHours
  ) {
    const newPoll = createBasePollDomainValidation(
      question,
      answers,
      multipleChoice,
      hasDeadline,
      closeAferHours
    );
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

    let now: Date;
    if (hasDeadline) {
      const currentTime = await externalAPI.getCurrentTime();
      // TODO: implement something to keep track of how long the request takes to keep the time consistent
      if (currentTime.ok === false) {
        return {
          ok: false,
          error: currentTime.error,
        };
      }

      currentTime.data.setHours(currentTime.data.getHours() + closeAferHours);
      now = currentTime.data;
    }

    const deadline = now ? { deadline: now } : {};
    const savedPoll = await repo.save({
      ...newPoll.data,
      ...deadline,
    });
    if (savedPoll.ok === false) {
      return {
        ok: false,
        error: savedPoll.error,
      };
    }

    return { ok: true, data: savedPoll.data };
  };
};
