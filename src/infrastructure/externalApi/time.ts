import { IExternalAPI } from "../../domain/externalApiRepo";

export const externalAPI: IExternalAPI = {
  getCurrentTime: async () => {
    const timeAPI: Promise<Date> = new Promise((resolve, reject) =>
      resolve(new Date())
    );
    return { ok: true, data: await timeAPI };
  },
};
