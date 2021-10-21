import { IPollRepo } from "../../domain/pollRepo";
import * as uuid from "uuid";
import { BasePoll, Poll } from "../../domain/pollInterface";

const polls: Poll[] = [
  {
    id: "ac073f6f-0047-4216-9ac5-cd6832cdc7d1",
    question: "ca do bojm",
    answers: ["do ham", "do pijm nje c"],
  },
];

export const inMemoryPollRepoImpl: IPollRepo = {
  getById: async (id: string) => {
    const foundPoll = polls.filter((p) => p.id === id);
    return await foundPoll[0];
  },
  save: async (poll: BasePoll) => {
    const newId = uuid.v4();
    const newPoll = { id: newId, ...poll };
    polls.push(newPoll);
    return await newPoll;
  },
};
