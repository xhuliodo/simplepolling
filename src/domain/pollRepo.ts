import { Result } from "../common/resultInterface";
import { BasePoll, Poll } from "./pollInterface";

export interface IPollRepo {
  save(poll: BasePoll): Promise<Result<Poll>>;
  getById(id: string): Promise<Result<Poll>>;
}
