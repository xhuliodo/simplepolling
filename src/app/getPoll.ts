import { Poll } from "../domain/pollInterface";
import { IPollRepo } from "../domain/pollRepo";

export type TGetPollService = (id: string) => Promise<Poll>;

export const getPollServiceBuilder = (repo: IPollRepo): TGetPollService => {
  return async function getPollService(id: string) {
    return await repo.getById(id);
  };
};
