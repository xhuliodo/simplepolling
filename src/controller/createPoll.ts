import { Request, Response } from "express";
import { TCreatePollService } from "../app/createPoll";
import { Poll } from "../domain/pollInterface";

export const createPollControllerBuilder = (
  createPollService: TCreatePollService
) => {
  return async function createPollController(req: Request, res: Response) {
    const question = req.body?.question;
    const answers = req.body?.answers;
    const multipleChoice = req.body?.multipleChoice;

    let newPoll: Poll;
    try {
      newPoll = await createPollService(question, answers, multipleChoice);
      res.send(newPoll);
    } catch (e) {
      res.send({ error: e?.message });
    }
  };
};
