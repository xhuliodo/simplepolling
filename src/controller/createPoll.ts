import { Request, Response } from "express";
import { TCreatePollService } from "../app/createPoll";
import { CustomErr, typeOfErr } from "../common/errors/errors";
import { sendErrResponse } from "../common/http/sendErrResponse";

export const createPollControllerBuilder = (
  createPollService: TCreatePollService
) => {
  return async function createPollController(req: Request, res: Response) {
    const question = req.body?.question;
    const answers = req.body?.answers;
    const multipleChoice = req.body?.multipleChoice;
    const hasDeadline = req.body?.hasDeadline;
    const closeAferHours = req.body?.closeAferHours;

    const newPoll = await createPollService(
      question,
      answers,
      multipleChoice,
      hasDeadline,
      closeAferHours
    );

    newPoll.ok === false
      ? sendErrResponse(newPoll.error, res)
      : res.send(newPoll.data);
  };
};
