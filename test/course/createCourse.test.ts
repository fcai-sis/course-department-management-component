import supertest from "supertest";

import { database, request, expectResponseToBeError } from "../index";
import CourseModel, { CourseType } from "../../src/features/course/data/models/course.model";
import DepartmentModel, { DepartmentType } from "../../src/features/department/data/models/department.model";

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

        let department: DepartmentType;

        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          department = {
            name: {
              ar: "اسم القسم",
              en: "Department Name",
            },
            code: "IS",
          }

          const departmentDoc = await DepartmentModel.create(department);

          course = {
            code: "IS101",
            name: {
              ar: "اسم الكورس",
              en: "Course Name",
            },
            description: {
              ar: "وصف الكورس",
              en: "Course Description",
            },
            department: departmentDoc._id,
            creditHours: 3,
          }

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

        let department: DepartmentType;
        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();


          department = {
            name: {
              ar: "اسم القسم",
              en: "Department Name",
            },
            code: "IS",
          };

          const departmentDoc = await DepartmentModel.create(department);

          // @ts-ignore
          course = {
            name: {
              ar: "اسم الكورس",
              en: "Course Name",
            },
            description: {
              ar: "وصف الكورس",
              en: "Course Description",
            },
            department: departmentDoc._id,
            creditHours: 3,
          }

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

        let department: DepartmentType;
        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          department = {
            name: {
              ar: "اسم القسم",
              en: "Department Name",
            },
            code: "IS",
          };

          const departmentDoc = await DepartmentModel.create(department);

          course = {
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
            department: departmentDoc._id,
            creditHours: 3,
          }

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

        let department: DepartmentType;
        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          department = {
            name: {
              ar: "اسم القسم",
              en: "Department Name",
            },
            code: "IS",
          };

          const departmentDoc = await DepartmentModel.create(department);

          course = {
            code: "IS101",
            // @ts-ignore
            name: {
              en: "Course Name",
            },
            description: {
              ar: "وصف الكورس",
              en: "Course Description",
            },
            department: departmentDoc._id,
            creditHours: 3,
          }

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

        let department: DepartmentType;
        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          department = {
            name: {
              ar: "اسم القسم",
              en: "Department Name",
            },
            code: "IS",
          };

          const departmentDoc = await DepartmentModel.create(department);

          course = {
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
            department: departmentDoc._id,
            creditHours: 3,
          }

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

        let department: DepartmentType;
        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          department = {
            name: {
              ar: "اسم القسم",
              en: "Department Name",
            },
            code: "IS",
          };

          const departmentDoc = await DepartmentModel.create(department);

          course = {
            code: "IS101",
            name: {
              ar: "Course Name",
              en: "Course Name",
            },
            description: {
              ar: "وصف الكورس",
              en: "Course Description",
            },
            department: departmentDoc._id,
            creditHours: 3,
          }

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

        let department: DepartmentType;
        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          department = {
            name: {
              ar: "اسم القسم",
              en: "Department Name",
            },
            code: "IS",
          };

          const departmentDoc = await DepartmentModel.create(department);

          course = {
            code: "IS101",
            // @ts-ignore
            name: {
              ar: "اسم الكورس",
            },
            description: {
              ar: "وصف الكورس",
              en: "Course Description",
            },
            department: departmentDoc._id,
            creditHours: 3,
          }

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

        let department: DepartmentType;
        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          department = {
            name: {
              ar: "اسم القسم",
              en: "Department Name",
            },
            code: "IS",
          };

          const departmentDoc = await DepartmentModel.create(department);

          course = {
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
            department: departmentDoc._id,
            creditHours: 3,
          }

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
        let response: supertest.Response;

        let department: DepartmentType;
        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          department = {
            name: {
              ar: "اسم القسم",
              en: "Department Name",
            },
            code: "IS",
          };

          const departmentDoc = await DepartmentModel.create(department);

          course = {
            code: "IS101",
            name: {
              ar: "اسم الكورس",
              en: "Course Name",
            },
            // @ts-ignore
            description: {
              en: "Course Description",
            },
            department: departmentDoc._id,
            creditHours: 3,
          }

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

      describe("when the course Arabic description is not a string", () => {
        let response: supertest.Response;

        let department: DepartmentType;
        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          department = {
            name: {
              ar: "اسم القسم",
              en: "Department Name",
            },
            code: "IS",
          };

          const departmentDoc = await DepartmentModel.create(department);

          course = {
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
            department: departmentDoc._id,
            creditHours: 3,
          }

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

      describe("when the course English description is not given", () => {
        let response: supertest.Response;

        let department: DepartmentType;
        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          department = {
            name: {
              ar: "اسم القسم",
              en: "Department Name",
            },
            code: "IS",
          };

          const departmentDoc = await DepartmentModel.create(department);

          course = {
            code: "IS101",
            name: {
              ar: "اسم الكورس",
              en: "Course Name",
            },
            // @ts-ignore
            description: {
              ar: "وصف الكورس",
            },
            department: departmentDoc._id,
            creditHours: 3,
          }

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

      describe("when the course English description is not a string", () => {
        let response: supertest.Response;

        let department: DepartmentType;
        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          department = {
            name: {
              ar: "اسم القسم",
              en: "Department Name",
            },
            code: "IS",
          };

          const departmentDoc = await DepartmentModel.create(department);

          course = {
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
            department: departmentDoc._id,
            creditHours: 3,
          }

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

    describe("when the course department is invalid", () => {
      describe("when the course department is not given", () => {
        let response: supertest.Response;

        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // @ts-ignore
          course = {
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
          }

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

        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          // @ts-ignore
          course = {
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
          }

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

        let department: DepartmentType;
        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          department = {
            name: {
              ar: "اسم القسم",
              en: "Department Name",
            },
            code: "IS",
          };

          const departmentDoc = await DepartmentModel.create(department);

          // @ts-ignore
          course = {
            code: "IS101",
            name: {
              ar: "اسم الكورس",
              en: "Course Name",
            },
            description: {
              ar: "وصف الكورس",
              en: "Course Description",
            },
            department: departmentDoc._id,
          }

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

      describe("when the course credit hours are not an integer", () => {
        let response: supertest.Response;

        let department: DepartmentType;
        let course: CourseType;

        beforeAll(async () => {
          // Clear the database before all tests
          await database.clear();

          department = {
            name: {
              ar: "اسم القسم",
              en: "Department Name",
            },
            code: "IS",
          };

          const departmentDoc = await DepartmentModel.create(department);

          // @ts-ignore
          course = {
            code: "IS101",
            name: {
              ar: "اسم الكورس",
              en: "Course Name",
            },
            description: {
              ar: "وصف الكورس",
              en: "Course Description",
            },
            department: departmentDoc._id,
            // @ts-ignore
            creditHours: 3.5,
          }

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

    let department: DepartmentType;
    let course: CourseType;

    beforeAll(async () => {
      // Clear the database before all tests
      await database.clear();

      department = {
        name: {
          ar: "اسم القسم",
          en: "Department Name",
        },
        code: "IS",
      };

      const departmentDoc = await DepartmentModel.create(department);

      course = {
        code: "IS101",
        name: {
          ar: "اسم الكورس",
          en: "Course Name",
        },
        description: {
          ar: "وصف الكورس",
          en: "Course Description",
        },
        department: departmentDoc._id,
        creditHours: 3,
      }

      // Make the request
      response = await request.post('/create').send(course);
    });

    it("should return a 201 status code", () => {
      expect(response.status).toBe(201);
    });

    it("should return the created course", () => {
      expect(response.body).toMatchObject(course);
    });

    it("should save the course to the database", async () => {
      const courseDoc = await CourseModel.findOne({ code: course.code });

      expect(courseDoc).toMatchObject(course);
    });
  });
});
