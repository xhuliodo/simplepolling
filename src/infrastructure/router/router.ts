import { Router } from "express";
import { createPollServiceBuilder } from "../../app/createPoll";
import { getPollServiceBuilder } from "../../app/getPoll";
import { createPollControllerBuilder } from "../../controller/createPoll";
import { getPollControllerBuilder } from "../../controller/getPoll";
import { IPollRepo } from "../../domain/pollRepo";

export const createRoutes = (router: Router, repo: IPollRepo) => {
  const getPollService = getPollServiceBuilder(repo);
  const getPollController = getPollControllerBuilder(getPollService);
  router.get("/polls/:id", getPollController);

  const createPollService = createPollServiceBuilder(repo);
  const createPollController = createPollControllerBuilder(createPollService);
  router.post("/polls", createPollController);
};
