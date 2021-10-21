import { Request, Response } from "express";
import { TGetPollService } from "../app/getPoll";

export const getPollControllerBuilder = (getPollService: TGetPollService) => {
  return async function getPollController(req: Request, res: Response) {
    const id = req.params?.id;
    if (!id) {
      throw new Error("supply an id parameter");
    }

    const foundPoll = await getPollService(id);
    res.send(foundPoll);
  };
};
