import { Request, Response } from "express";
import { TGetPollService } from "../app/getPoll";
import { sendErrResponse } from "../common/http/sendErrResponse";

export const getPollControllerBuilder = (getPollService: TGetPollService) => {
  return async function getPollController(req: Request, res: Response) {
    const id = req.params?.id;

    const foundPoll = await getPollService(id);

    foundPoll.ok === false
      ? sendErrResponse(foundPoll.error, res)
      : res.send(foundPoll);
  };
};
