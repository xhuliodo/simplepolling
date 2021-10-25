import { CustomErr } from "./errors";

export type Result<T, E = CustomErr> =
  | { ok: true; data: T }
  | { ok: false; error: E };
