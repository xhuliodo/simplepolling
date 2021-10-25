import { IPollRepo } from "../../domain/pollRepo";
import * as uuid from "uuid";
import { Poll } from "../../domain/pollInterface";
import { CustomErr, typeOfErr } from "../../common/errors/errors";

const polls: Poll[] = [
  {
    id: "ac073f6f-0047-4216-9ac5-cd6832cdc7d1",
    question: "ca do bojm",
    answers: ["do ham", "do pijm nje c"],
    multipleChoice: false,
  },
];

export const inMemoryPollRepoImpl: IPollRepo = {
  save: (poll) => {
    const newId = uuid.v4();
    const newPoll = { id: newId, ...poll };
    return { ok: true, data: newPoll };
  },
  getById: (id) => {
    const foundPoll = polls.filter((p) => p.id === id);
    if (foundPoll[0]) {
      return { ok: true, data: foundPoll[0] };
    }
    return {
      ok: false,
      error: new CustomErr(
        typeOfErr.not_found,
        "the poll you requested could not be found"
      ),
    };
  },
};
