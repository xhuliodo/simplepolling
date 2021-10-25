import { Router } from "express";
import express from "express";
import { createPollServiceBuilder } from "../../app/createPoll";
import { getPollServiceBuilder } from "../../app/getPoll";
import { createPollControllerBuilder } from "../../controller/createPoll";
import { getPollControllerBuilder } from "../../controller/getPoll";
import { IPollRepo } from "../../domain/pollRepo";
import { IExternalAPI } from "../../domain/externalApiRepo";

const createv1Router = (
  router: Router,
  repo: IPollRepo,
  externalAPI: IExternalAPI
) => {
  const getPollService = getPollServiceBuilder(repo);
  const getPollController = getPollControllerBuilder(getPollService);
  router.get("/polls/:id", getPollController);

  const createPollService = createPollServiceBuilder(repo, externalAPI);
  const createPollController = createPollControllerBuilder(createPollService);
  router.post("/polls", createPollController);

  return router;
};

export const createRoutes = (
  router: Router,
  repo: IPollRepo,
  externalAPI: IExternalAPI
) => {
  const v1Router = createv1Router(express.Router(), repo, externalAPI);
  router.use("/api/v1", v1Router);

  // catch all route for any non matches
  router.use("*", (_, res) => {
    res.status(501).send({
      error: "not_implemented",
      errorText: "This feature is not available",
    });
  });
};
