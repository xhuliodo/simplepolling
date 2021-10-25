// interface Deadline {
//   id: number;
//   pollId: number;
//   deadline: number; // timestamp
// }

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { inMemoryPollRepoImpl } from "./infrastructure/db/inMemoryRepo";
import { createRoutes } from "./infrastructure/router/router";
import { externalAPI } from "./infrastructure/externalApi/time";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const repo = inMemoryPollRepoImpl;
const externalAPIImpl = externalAPI
createRoutes(app, repo, externalAPIImpl);

try {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
} catch (e) {
  console.log(e);
}
