// class Poll {
//     constructor(id, question, answers){

//     }
//   create(){
//     if (question.length<0){
//         throw new Error("You cannot create a poll with an empty")
//     }
//   };
// }

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
createRoutes(app, repo);

try {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
} catch (e) {
  console.log(e);
}
