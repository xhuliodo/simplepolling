export const typeOfErr = {
  not_authenticated: "not_authenticated",
  forbidden: "forbidden",
  db_connection: "db_connection",
  not_found: "not_found",
  bad_request: "bad_request",
  rate_limiting: "rate_limiting",
  app_logic: "app_logic",
};

export class CustomErr extends Error {
  name: string;
  message: string;
  constructor(name: string, message: string, stack?: string, ...params) {
    super(...params);
    if (stack) {
      Error.captureStackTrace(this, CustomErr);
    } else {
      this.stack = stack;
    }
    this.name = name;
    this.message = message;
  }
}
