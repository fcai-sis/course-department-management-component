import supertest from "supertest";

import { database, request, expectResponseToBeError } from "../index";
import CourseModel, { CourseType } from "../../src/features/course/data/models/course.model";

describe("GET /course", () => {
  // Connect to the database before running any tests
  beforeAll(async () => {
    await database.connect();
  });

  // Disconnect from the database after running all tests
  afterAll(async () => {
    await database.disconnect();
  });

  describe("when pagination params are invalid", () => {
    describe("when page is not given", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();
        response = await request.get("/course").query({
          pageSize: 10,
        });
      });

      it("should return status code 400", () => {
        expect(response.status).toBe(400);
      });

      it("should return an error response", () => {
        expectResponseToBeError(response);
      });
    });

    describe("when page is not an integer", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();
        response = await request.get("/course").query({
          page: "1",
          pageSize: 10,
        });
      });

      it("should return status code 400", () => {
        expect(response.status).toBe(400);
      });

      it("should return an error response", () => {
        expectResponseToBeError(response);
      });
    });

    describe("when page is less than 1", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();
        response = await request.get("/course").query({
          page: 0,
          pageSize: 10,
        });
      });

      it("should return status code 400", () => {
        expect(response.status).toBe(400);
      });

      it("should return an error response", () => {
        expectResponseToBeError(response);
      });
    });

    describe("when pageSize is not given", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();
        response = await request.get("/course").query({
          page: 1,
        });
      });

      it("should return status code 400", () => {
        expect(response.status).toBe(400);
      });

      it("should return an error response", () => {
        expectResponseToBeError(response);
      });
    });

    describe("when pageSize is not an integer", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();
        response = await request.get("/course").query({
          page: 1,
          pageSize: "10",
        });
      });

      it("should return status code 400", () => {
        expect(response.status).toBe(400);
      });

      it("should return an error response", () => {
        expectResponseToBeError(response);
      });
    });

    describe("when pageSize is less than 1", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();
        response = await request.get("/course").query({
          page: 1,
          pageSize: 0,
        });
      });

      it("should return status code 400", () => {
        expect(response.status).toBe(400);
      });

      it("should return an error response", () => {
        expectResponseToBeError(response);
      });
    });
  });

  describe("when pagination params are valid", () => {
    describe("when there are no courses", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();
        response = await request.get("/course").query({
          page: 1,
          pageSize: 10,
        });
      });

      it("should return status code 200", () => {
        expect(response.status).toBe(200);
      });

      it("should return an empty array", () => {
        expect(response.body).toEqual([]);
      });
    });

    describe("when there are courses", () => {
      describe("when there are less courses than pageSize", () => {
        let response: supertest.Response;

        const pageSize = 10;

        const courses: CourseType[] = [
          {
            code: "CS100",
            name: {
              ar: "مقدمة في علم الحاسوب",
              en: "Introduction to Computer Science",
            },
            description: {
              ar: "مقدمة في علم الحاسوب",
              en: "Introduction to Computer Science",
            },
            department: "CS",
            creditHours: 3,
          },
          {
            code: "CS101",
            name: {
              ar: "مقدمة في علم الحاسوب",
              en: "Introduction to Computer Science",
            },
            description: {
              ar: "مقدمة في علم الحاسوب",
              en: "Introduction to Computer Science",
            },
            department: "CS",
            creditHours: 3,
          },
          {
            code: "CS102",
            name: {
              ar: "مقدمة في علم الحاسوب",
              en: "Introduction to Computer Science",
            },
            description: {
              ar: "مقدمة في علم الحاسوب",
              en: "Introduction to Computer Science",
            },
            department: "CS",
            creditHours: 3,
          },
        ];

        beforeAll(async () => {
          await database.clear();
          await CourseModel.create(courses);
          response = await request.get("/course").query({
            page: 1,
            pageSize,
          });
        });

        it("should return status code 200", () => {
          expect(response.status).toBe(200);
        });

        it("should return the courses", () => {
          expect(response.body).toEqual({ courses });
        });
      });

      describe("when there are more courses than pageSize", () => {
        let response1: supertest.Response
        let response2: supertest.Response
        let response3: supertest.Response

        const pageSize = 2;

        const courses: CourseType[] = [
          {
            code: "CS100",
            name: {
              ar: "مقدمة في علم الحاسوب",
              en: "Introduction to Computer Science",
            },
            description: {
              ar: "مقدمة في علم الحاسوب",
              en: "Introduction to Computer Science",
            },
            department: "CS",
            creditHours: 3,
          },
          {
            code: "CS101",
            name: {
              ar: "مقدمة في علم الحاسوب",
              en: "Introduction to Computer Science",
            },
            description: {
              ar: "مقدمة في علم الحاسوب",
              en: "Introduction to Computer Science",
            },
            department: "CS",
            creditHours: 3,
          },
          {
            code: "CS102",
            name: {
              ar: "مقدمة في علم الحاسوب",
              en: "Introduction to Computer Science",
            },
            description: {
              ar: "مقدمة في علم الحاسوب",
              en: "Introduction to Computer Science",
            },
            department: "CS",
            creditHours: 3,
          },
        ]

        beforeAll(async () => {
          await database.clear();

          for (const course of courses) {
            await CourseModel.create(course);
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          // response1 = await request.get("/course").query({
          //   page: 1,
          //   pageSize,
          // });
          // response2 = await request.get("/course").query({
          //   page: 2,
          //   pageSize,
          // });
          // response3 = await request.get("/course").query({
          //   page: 3,
          //   pageSize,
          // });

          const [res1, res2, res3] = await Promise.all([
            request.get("/course").query({
              page: 1,
              pageSize,
            }),
            request.get("/course").query({
              page: 2,
              pageSize,
            }),
            request.get("/course").query({
              page: 3,
              pageSize,
            }),
          ]);

          response1 = res1;
          response2 = res2;
          response3 = res3;
        });

        it("should return status code 200", () => {
          expect(response1.status).toBe(200);
          expect(response2.status).toBe(200);
          expect(response3.status).toBe(200);
        });

        it("should return the courses", () => {
          expect(response1.body).toEqual({
            courses: [
              { ...courses[0], _id: expect.any(String) },
              { ...courses[1], _id: expect.any(String) },
            ],
          });
          expect(response2.body).toEqual({
            courses: [
              { ...courses[2], _id: expect.any(String) },
            ],
          });
          expect(response3.body).toEqual({
            courses: [],
          });
        });
      });
    });
  });
});
