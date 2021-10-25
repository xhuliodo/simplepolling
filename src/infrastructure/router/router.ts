import { Router, Express } from "express";
import express from "express";
import { createPollServiceBuilder } from "../../app/createPoll";
import { getPollServiceBuilder } from "../../app/getPoll";
import { createPollControllerBuilder } from "../../controller/createPoll";
import { getPollControllerBuilder } from "../../controller/getPoll";
import { IPollRepo } from "../../domain/pollRepo";

const createv1Router = (router: Router, repo: IPollRepo) => {
  const getPollService = getPollServiceBuilder(repo);
  const getPollController = getPollControllerBuilder(getPollService);
  router.get("/polls/:id", getPollController);

  const createPollService = createPollServiceBuilder(repo);
  const createPollController = createPollControllerBuilder(createPollService);
  router.post("/polls", createPollController);

  return router;
};

export const createRoutes = (router: Router, repo: IPollRepo) => {
  const v1Router = createv1Router(express.Router(), repo);
  router.use("/api/v1", v1Router);

  // const getPollService = getPollServiceBuilder(repo);
  // const getPollController = getPollControllerBuilder(getPollService);
  // router.get("/api/v1/polls/:id", getPollController);

  // const createPollService = createPollServiceBuilder(repo);
  // const createPollController = createPollControllerBuilder(createPollService);
  // router.post("/api/v1/polls", createPollController);

  // catch all route for any non matches
  router.use("*", (_, res) => {
    res.status(501).send({
      error: "not_implemented",
      errorText: "This feature is not available",
    });
  });
};
