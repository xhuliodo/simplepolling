import { createBasePollDomainValidation } from "../domain/poll";
import { Poll } from "../domain/pollInterface";
import { IPollRepo } from "../domain/pollRepo";

export type TCreatePollService = (
  question: string,
  answers: string[]
) => Promise<Poll>;

export const createPollServiceBuilder = (
  repo: IPollRepo
): TCreatePollService => {
  return async function createPollService(question: string, answers: string[]) {
    const newPoll = createBasePollDomainValidation(question, answers);
    return await repo.save(newPoll);
  };
};
