import supertest from "supertest";

import { database, request, expectResponseToBeError } from "../index";
import CourseModel, { CourseType } from "../../src/features/course/data/models/course.model";

describe("POST /course", () => {
  // Connect to the database before running any tests
  beforeAll(async () => {
    await database.connect();
  });

  // Disconnect from the database after running all tests
  afterAll(async () => {
    await database.disconnect();
  });

  describe("when the course data is invalid", () => {
    describe("when the course code is invalid", () => {
      describe("when the course with the given code already exists", () => {
        let response: supertest.Response;

        const course: CourseType = {
          code: "IS101",
          name: {
            ar: "اسم الكورس",
            en: "Course Name",
          },
          description: {
            ar: "وصف الكورس",
            en: "Course Description",
          },
          department: "IS",
          creditHours: 3,
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Create a course with the given code
          await CourseModel.create(course);

          // Make the request
          response = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(response.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(response);
        });
      });

      describe("when the course code is not given", () => {
        let response: supertest.Response;

        const course: Partial<CourseType> = {
          name: {
            ar: "اسم الكورس",
            en: "Course Name",
          },
          description: {
            ar: "وصف الكورس",
            en: "Course Description",
          },
          department: "IS",
          creditHours: 3,
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          response = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(response.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(response);
        });
      });

      describe("when the course code is not a string", () => {
        let response: supertest.Response;

        const course: CourseType = {
          // @ts-ignore
          code: 1,
          name: {
            ar: "اسم الكورس",
            en: "Course Name",
          },
          description: {
            ar: "وصف الكورس",
            en: "Course Description",
          },
          department: "IS",
          creditHours: 3,
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          response = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(response.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(response);
        });
      });
    });

    describe("when the course name is invalid", () => {
      describe("when the course Arabic name is not given", () => {
        let response: supertest.Response;

        const course: Partial<CourseType> = {
          code: "IS101",
          // @ts-ignore
          name: {
            en: "Course Name",
          },
          description: {
            ar: "وصف الكورس",
            en: "Course Description",
          },
          department: "IS",
          creditHours: 3,
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          response = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(response.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(response);
        });
      });

      describe("when the course Arabic name is not a string", () => {
        let response: supertest.Response;

        const course: CourseType = {
          code: "IS101",
          name: {
            // @ts-ignore
            ar: 1,
            en: "Course Name",
          },
          description: {
            ar: "وصف الكورس",
            en: "Course Description",
          },
          department: "IS",
          creditHours: 3,
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          response = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(response.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(response);
        });
      });

      describe("when the course Arabic name is not in Arabic", () => {
        let response: supertest.Response;

        const course: CourseType = {
          code: "IS101",
          name: {
            ar: "Course Name",
            en: "Course Name",
          },
          description: {
            ar: "وصف الكورس",
            en: "Course Description",
          },
          department: "IS",
          creditHours: 3,
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          response = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(response.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(response);
        });
      });

      describe("when the course English name is not given", () => {
        let response: supertest.Response;

        const course: Partial<CourseType> = {
          code: "IS101",
          // @ts-ignore
          name: {
            ar: "اسم الكورس",
          },
          description: {
            ar: "وصف الكورس",
            en: "Course Description",
          },
          department: "IS",
          creditHours: 3,
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          response = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(response.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(response);
        });
      });

      describe("when the course English name is not a string", () => {
        let response: supertest.Response;

        const course: CourseType = {
          code: "IS101",
          name: {
            ar: "اسم الكورس",
            // @ts-ignore
            en: 1,
          },
          description: {
            ar: "وصف الكورس",
            en: "Course Description",
          },
          department: "IS",
          creditHours: 3,
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          response = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(response.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(response);
        });
      });
    });

    describe("when the course description is invalid", () => {
      describe("when the course Arabic description is not given", () => {
        let reponse: supertest.Response;

        const course: Partial<CourseType> = {
          code: "IS101",
          name: {
            ar: "اسم الكورس",
            en: "Course Name",
          },
          // @ts-ignore
          description: {
            en: "Course Description",
          },
          department: "IS",
          creditHours: 3,
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          reponse = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(reponse.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(reponse);
        });
      });

      describe("when the course Arabic description is not a string", () => {
        let reponse: supertest.Response;

        const course: CourseType = {
          code: "IS101",
          name: {
            ar: "اسم الكورس",
            en: "Course Name",
          },
          description: {
            // @ts-ignore
            ar: 1,
            en: "Course Description",
          },
          department: "IS",
          creditHours: 3,
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          reponse = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(reponse.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(reponse);
        });
      });

      describe("when the course English description is not given", () => {
        let reponse: supertest.Response;

        const course: Partial<CourseType> = {
          code: "IS101",
          name: {
            ar: "اسم الكورس",
            en: "Course Name",
          },
          // @ts-ignore
          description: {
            ar: "وصف الكورس",
          },
          department: "IS",
          creditHours: 3,
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          reponse = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(reponse.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(reponse);
        });
      });

      describe("when the course English description is not a string", () => {
        let reponse: supertest.Response;

        const course: CourseType = {
          code: "IS101",
          name: {
            ar: "اسم الكورس",
            en: "Course Name",
          },
          description: {
            ar: "وصف الكورس",
            // @ts-ignore
            en: 1,
          },
          department: "IS",
          creditHours: 3,
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          reponse = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(reponse.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(reponse);
        });
      });
    });

    describe("when the course department is invalid", () => {
      describe("when the course department is not given", () => {
        let response: supertest.Response;

        const course: Partial<CourseType> = {
          code: "IS101",
          name: {
            ar: "اسم الكورس",
            en: "Course Name",
          },
          description: {
            ar: "وصف الكورس",
            en: "Course Description",
          },
          creditHours: 3,
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          response = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(response.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(response);
        });
      });

      describe("when the course department is not a string", () => {
        let response: supertest.Response;

        const course: CourseType = {
          code: "IS101",
          name: {
            ar: "اسم الكورس",
            en: "Course Name",
          },
          description: {
            ar: "وصف الكورس",
            en: "Course Description",
          },
          // @ts-ignore
          department: 1,
          creditHours: 3,
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          response = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(response.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(response);
        });
      });
    });

    describe("when the course credit hours are invalid", () => {
      describe("when the course credit hours are not given", () => {
        let response: supertest.Response;

        const course: Partial<CourseType> = {
          code: "IS101",
          name: {
            ar: "اسم الكورس",
            en: "Course Name",
          },
          description: {
            ar: "وصف الكورس",
            en: "Course Description",
          },
          department: "IS",
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          response = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(response.status).toBe(400);
        });
      });

      describe("when the course credit hours are not an integer", () => {
        let response: supertest.Response;

        const course: Partial<CourseType> = {
          code: "IS101",
          name: {
            ar: "اسم الكورس",
            en: "Course Name",
          },
          description: {
            ar: "وصف الكورس",
            en: "Course Description",
          },
          department: "IS",
          // @ts-ignore
          creditHours: "3",
        };

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // Make the request
          response = await request.post('/create').send(course);
        });

        it("should return a 400 status code", () => {
          expect(response.status).toBe(400);
        });

        it("should return an error response", () => {
          expectResponseToBeError(response);
        });
      });
    });
  });

  describe("when the course data is valid", () => {
    let response: supertest.Response;

    const course: CourseType = {
      code: "IS101",
      name: {
        ar: "اسم الكورس",
        en: "Course Name",
      },
      description: {
        ar: "وصف الكورس",
        en: "Course Description",
      },
      department: "IS",
      creditHours: 3,
    };

    beforeAll(async () => {
      // Clear the database before all tests
      await database.clear();

      // Make the request
      response = await request.post('/create').send(course);
    });

    it("should return a 201 status code", () => {
      expect(response.status).toBe(201);
    });

    it("should return the created course", () => {
      expect(response.body).toEqual({
        course: {
          code: course.code,
          name: course.name,
          description: course.description,
          department: course.department,
          creditHours: course.creditHours,
          prerequisites: expect.any(Array),
        },
      });
    });

    it("should create the course in the database", async () => {
      const createdCourse = await CourseModel.exists({ ...course });

      expect(createdCourse).toBeTruthy();
    });
  });
});
