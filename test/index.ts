import supertest from "supertest";

import app from "../src/app";

export * as database from "./database";
export const request = supertest(app);

export function expectResponseToBeError(response: supertest.Response) {
  expect(response.body).toEqual({
    error: {
      message: expect.any(String),
    },
  });
}
