import { Request, Response } from "express";
import { TCreatePollService } from "../app/createPoll";

export const createPollControllerBuilder = (
  createPollService: TCreatePollService
) => {
  return async function createPollController(req: Request, res: Response) {
    const question = req.body?.question;
    const answers = req.body?.answers;

    const newPoll = await createPollService(question, answers);

    res.send(newPoll);
  };
};
