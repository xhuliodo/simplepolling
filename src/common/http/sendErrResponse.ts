import { Response } from "express";
import { CustomErr, typeOfErr } from "../errors/errors";
import { ErrorResponse } from "../errors/errorsInterface";

export const sendErrResponse = (error: CustomErr, res: Response) => {
  let err: ErrorResponse;
  switch (error.name) {
    case typeOfErr.db_connection:
      err = {
        error: error.name,
        errorText:
          "Service cannot be accessed right now, please try again later",
      };
      res.status(503).send(err);
      break;
    case typeOfErr.not_found:
      err = {
        error: error.name,
        errorText: error.message,
      };
      res.status(404).send(err);
      break;
    case typeOfErr.bad_request:
      err = {
        error: error.name,
        errorText: error.message,
      };
      res.status(400).send(err);
      break;
    case typeOfErr.forbidden:
      err = {
        error: error.name,
        errorText: error.message,
      };
      res.status(403).send(err);
      break;
    default:
      err = {
        error: "unexpected_error",
        errorText: "Something went wrong",
      };
      res.status(500).send(err);
      break;
  }
};
