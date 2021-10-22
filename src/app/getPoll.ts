import { CustomErr } from "../common/errors/errors";
import { Result } from "../common/resultInterface";
import { Poll } from "../domain/pollInterface";
import { IPollRepo } from "../domain/pollRepo";

export type TGetPollService = (id: string) => Promise<Result<Poll>>;

export const getPollServiceBuilder = (repo: IPollRepo): TGetPollService => {
  return async function getPollService(id: string) {
    const foundPoll = await repo.getById(id);
    if (foundPoll.ok) {
      return { ok: true, data: foundPoll.data };
    }
    return {ok:false, error: foundPoll}
  };
};
