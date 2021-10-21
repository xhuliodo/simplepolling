import { BasePoll, Poll } from "./pollInterface";

export interface IPollRepo {
  save(poll: BasePoll): Promise<Poll>;
  getById(id: string): Promise<Poll>;
}

