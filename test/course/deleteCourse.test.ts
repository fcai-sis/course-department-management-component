import supertest from "supertest";

import { database, request, expectResponseToBeError } from "../index";
import CourseModel, { CourseType } from "../../src/features/course/data/models/course.model";

describe("DELETE /course", () => {
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
      response = await request.delete("/course/");
    });

    it("should return status code 404", () => {
      expect(response.status).toBe(404);
    });

    it("should return an error response", () => {
      expectResponseToBeError(response);
    });
  });

  describe("when course code is given", () => {
    describe("when course code is invalid", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();
        response = await request.delete("/course/abc");
      });

      it("should return status code 400", () => {
        expect(response.status).toBe(400);
      });

      it("should return an error response", () => {
        expectResponseToBeError(response);
      });
    });

    describe("when course does not exist", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();
        response = await request.delete("/course/abc");
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
            ar: "اسم المساق",
            en: "Course Name",
          },
          description: {
            ar: "وصف المساق",
            en: "Course Description",
          },
          department: "CS",
          creditHours: 3,
        });
        response = await request.delete(`/course/${course.code}`);
      });

      it("should return status code 200", () => {
        expect(response.status).toBe(200);
      });

      it("should return the deleted course", () => {
        expect(response.body).toEqual({
          course: {
            code: course.code,
            name: course.name,
            description: course.description,
            department: course.department,
            creditHours: course.creditHours,
          },
        });
      });

      it("should delete the course from the database", async () => {
        const courseInDatabase = await CourseModel.exists({
          code: course.code,
        });
        expect(courseInDatabase).toBeFalsy();
      });
    });
  });
});
