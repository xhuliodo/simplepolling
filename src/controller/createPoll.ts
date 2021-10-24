import { Request, Response } from "express";
import { TCreatePollService } from "../app/createPoll";
import { sendErrResponse } from "../common/http/sendErrResponse";
import { Poll } from "../domain/pollInterface";

export const createPollControllerBuilder = (
  createPollService: TCreatePollService
) => {
  return async function createPollController(req: Request, res: Response) {
    const question = req.body?.question;
    const answers = req.body?.answers;
    const multipleChoice = req.body?.multipleChoice;

    const newPoll = await createPollService(question, answers, multipleChoice);
    if (newPoll.ok) {
      res.send({ poll: newPoll.data });
    }
    if (newPoll.ok === false) {
      sendErrResponse(newPoll.error, res);
    }
  };
};
