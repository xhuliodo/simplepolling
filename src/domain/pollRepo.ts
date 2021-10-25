import { Result } from "../common/errors/resultInterface";
import { BasePoll, Poll } from "./pollInterface";

export interface IPollRepo {
  save(poll: BasePoll): Result<Poll>;
  getById(id: string): Result<Poll>;
}
