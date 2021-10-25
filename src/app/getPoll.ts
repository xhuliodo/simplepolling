import { CustomErr, typeOfErr } from "../common/errors/errors";
import { Result } from "../common/errors/resultInterface";
import { Poll } from "../domain/pollInterface";
import { IPollRepo } from "../domain/pollRepo";

export type TGetPollService = (id: string) => Promise<Result<Poll>>;

export const getPollServiceBuilder = (repo: IPollRepo): TGetPollService => {
  return async function getPollService(id: string) {
    if (!id) {
      return {
        ok: false,
        error: new CustomErr(typeOfErr.bad_request, "submit a valid ID"),
      };
    }
    const foundPoll = await repo.getById(id);
    if (foundPoll.ok === false) {
      return {
        ok: false,
        error: new CustomErr(
          foundPoll.error.name,
          foundPoll.error.message,
          foundPoll.error.stack
        ),
      };
    }
    return { ok: true, data: foundPoll.data };
  };
};
