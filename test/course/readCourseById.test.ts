import supertest from "supertest";

import { database, request, expectResponseToBeError } from "../index";
import CourseModel, { CourseType } from "../../src/features/course/data/models/course.model";

describe("GET /course/:id", () => {
  // Connect to the database before running any tests
  beforeAll(async () => {
    await database.connect();
  });

  // Disconnect from the database after running all tests
  afterAll(async () => {
    await database.disconnect();
  });

  describe("when course code is not given", () => {
    let response: supertest.Response;

    beforeAll(async () => {
      await database.clear();
      response = await request.get("/course/");
    });

    it("should return status code 404", () => {
      expect(response.status).toBe(404);
    });

    it("should return an error response", () => {
      expectResponseToBeError(response);
    });
  });

  describe("when course code is given", () => {
    describe("when course does not exist", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();
        response = await request.get("/course/abc");
      });

      it("should return status code 404", () => {
        expect(response.status).toBe(404);
      });

      it("should return an error response", () => {
        expectResponseToBeError(response);
      });
    });

    describe("when course exists", () => {
      let response: supertest.Response;
      let course: CourseType;

      beforeAll(async () => {
        await database.clear();
        course = await CourseModel.create({
          code: "CS101",
          name: {
            ar: "اسم الكورس",
            en: "Course Name",
          },
          description: {
            ar: "وصف الكورس",
            en: "Course Description",
          },
          department: "CS",
          creditHours: 3,
        });
        response = await request.get(`/course/${course.code}`);
      });

      it("should return status code 200", () => {
        expect(response.status).toBe(200);
      });

      it("should return the course", () => {
        expect(response.body).toEqual({
          course: {
            _id: expect.any(String),
            code: course.code,
            name: course.name,
            description: course.description,
            department: course.department,
            creditHours: course.creditHours,
          },
        });
      });
    });
  });
});
