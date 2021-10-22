import { Response } from "express";
import { typeOfErr } from "../errors/errors";
import { ErrorResponse } from "../errors/errorsInterface";

function sendErrResponse(error: Error, res: Response) {
  let err: ErrorResponse;
  switch (error.name) {
    case typeOfErr.db_connection:
      err = {
        errorText:
          "Service cannot be accessed right now, please try again later",
        statusCode: 503,
      };
      res.send(err);
      break;
    case typeOfErr.not_found:
      err = {
        errorText: error.message,
        statusCode: 404,
      };
      res.send(err);
      break;
    case typeOfErr.bad_request:
      err = {
        errorText: error.message,
        statusCode: 400,
      };
      res.send(err);
      break;
    case typeOfErr.forbidden:
      err = {
        errorText: error.message,
        statusCode: 403,
      };
      res.send(err);
      break;
    default:
      err = {
        errorText: "Something went wrong",
        statusCode: 500,
      };
      res.send(err);
      break;
  }
}
