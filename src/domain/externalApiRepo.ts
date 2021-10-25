import { Result } from "../common/errors/resultInterface";

export interface IExternalAPI {
  getCurrentTime(): Promise<Result<Date>>;
}
