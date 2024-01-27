import supertest from "supertest";

import { database, request, expectResponseToBeError } from "../index";
import CourseModel, { CourseType } from "../../src/features/course/data/models/course.model";

describe("PATCH /course", () => {
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
      response = await request.patch("/course/");
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
        response = await request.patch("/course/abc");
      });

      it("should return status code 404", () => {
        expect(response.status).toBe(404);
      });

      it("should return an error response", () => {
        expectResponseToBeError(response);
      });
    });

    describe("when course exists", () => {
      describe("when update data is invalid", () => {
        describe("when trying to update code", () => {
          let repsonse: supertest.Response;

          const updates: Partial<CourseType> = {
            code: "CS102",
          };

          beforeAll(async () => {
            await database.clear();
            const course = await CourseModel.create({
              code: "CS101",
              name: {
                ar: "مقدمة في الحاسب",
                en: "Introduction to Computer",
              },
              description: {
                ar: "مقدمة في الحاسب",
                en: "Introduction to Computer",
              },
              department: "CS",
              creditHours: 3,
            });
            repsonse = await request.patch(`/course/${course.code}`).send(updates);
          });

          it("should return status code 400", () => {
            expect(repsonse.status).toBe(400);
          });

          it("should return an error response", () => {
            expectResponseToBeError(repsonse);
          });
        });

        describe("when trying to update name", () => {
          describe("when trying to update Arabic name", () => {
            describe("when Arabic name is not a string", () => {
              let response: supertest.Response;
              let course: CourseType;
              let updates: Partial<CourseType>;

              beforeAll(async () => {
                await database.clear();
                course = await CourseModel.create({
                  code: "CS101",
                  name: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  description: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  department: "CS",
                  creditHours: 3,
                });
                updates = {
                  name: {
                    // @ts-ignore
                    ar: 123,
                  },
                };
                response = await request.patch(`/course/${course.code}`).send(updates);
              });

              it("should return status code 400", () => {
                expect(response.status).toBe(400);
              });

              it("should return an error response", () => {
                expectResponseToBeError(response);
              });
            });

            describe("when Arabic name is an empty string", () => {
              let response: supertest.Response;
              let course: CourseType;
              let updates: Partial<CourseType>;

              beforeAll(async () => {
                await database.clear();
                course = await CourseModel.create({
                  code: "CS101",
                  name: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  description: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  department: "CS",
                  creditHours: 3,
                });
                updates = {
                  // @ts-ignore
                  name: {
                    ar: "",
                  },
                };
                response = await request.patch(`/course/${course.code}`).send(updates);
              });

              it("should return status code 400", () => {
                expect(response.status).toBe(400);
              });

              it("should return an error response", () => {
                expectResponseToBeError(response);
              });
            });

            describe("when Arabic name is not in Arabic", () => {
              let response: supertest.Response;
              let course: CourseType;
              let updates: Partial<CourseType>;

              beforeAll(async () => {
                await database.clear();
                course = await CourseModel.create({
                  code: "CS101",
                  name: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  description: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  department: "CS",
                  creditHours: 3,
                });
                updates = {
                  // @ts-ignore
                  name: {
                    ar: "Introduction to Computer",
                  },
                };
                response = await request.patch(`/course/${course.code}`).send(updates);
              });

              it("should return status code 400", () => {
                expect(response.status).toBe(400);
              });

              it("should return an error response", () => {
                expectResponseToBeError(response);
              });
            });
          });

          describe("when trying to update English name", () => {
            describe("when English name is not a string", () => {
              let response: supertest.Response;
              let course: CourseType;
              let updates: Partial<CourseType>;

              beforeAll(async () => {
                await database.clear();
                course = await CourseModel.create({
                  code: "CS101",
                  name: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  description: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  department: "CS",
                  creditHours: 3,
                });
                updates = {
                  name: {
                    // @ts-ignore
                    en: 123,
                  },
                };
                response = await request.patch(`/course/${course.code}`).send(updates);
              });

              it("should return status code 400", () => {
                expect(response.status).toBe(400);
              });

              it("should return an error response", () => {
                expectResponseToBeError(response);
              });
            });

            describe("when English name is an empty string", () => {
              let response: supertest.Response;
              let course: CourseType;
              let updates: Partial<CourseType>;

              beforeAll(async () => {
                await database.clear();
                course = await CourseModel.create({
                  code: "CS101",
                  name: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  description: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  department: "CS",
                  creditHours: 3,
                });
                updates = {
                  // @ts-ignore
                  name: {
                    en: "",
                  },
                };
                response = await request.patch(`/course/${course.code}`).send(updates);
              });

              it("should return status code 400", () => {
                expect(response.status).toBe(400);
              });

              it("should return an error response", () => {
                expectResponseToBeError(response);
              });
            });

            describe("when English name is not in English", () => {
              let response: supertest.Response;
              let course: CourseType;
              let updates: Partial<CourseType>;

              beforeAll(async () => {
                await database.clear();
                course = await CourseModel.create({
                  code: "CS101",
                  name: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  description: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  department: "CS",
                  creditHours: 3,
                });
                updates = {
                  // @ts-ignore
                  name: {
                    en: "مقدمة في الحاسب",
                  },
                };
                response = await request.patch(`/course/${course.code}`).send(updates);
              });

              it("should return status code 400", () => {
                expect(response.status).toBe(400);
              });

              it("should return an error response", () => {
                expectResponseToBeError(response);
              });
            });
          });
        });

        describe("when trying to update description", () => {
          describe("when trying to update Arabic description", () => {
            describe("when Arabic description is not a string", () => {
              let response: supertest.Response;
              let course: CourseType;
              let updates: Partial<CourseType>;

              beforeAll(async () => {
                await database.clear();
                course = await CourseModel.create({
                  code: "CS101",
                  name: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  description: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  department: "CS",
                  creditHours: 3,
                });
                updates = {
                  description: {
                    // @ts-ignore
                    ar: 123,
                  },
                };
                response = await request.patch(`/course/${course.code}`).send(updates);
              });

              it("should return status code 400", () => {
                expect(response.status).toBe(400);
              });

              it("should return an error response", () => {
                expectResponseToBeError(response);
              });
            });

            describe("when Arabic description is an empty string", () => {
              let response: supertest.Response;
              let course: CourseType;
              let updates: Partial<CourseType>;

              beforeAll(async () => {
                await database.clear();
                course = await CourseModel.create({
                  code: "CS101",
                  name: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  description: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  department: "CS",
                  creditHours: 3,
                });
                updates = {
                  // @ts-ignore
                  description: {
                    ar: "",
                  },
                };
                response = await request.patch(`/course/${course.code}`).send(updates);
              });

              it("should return status code 400", () => {
                expect(response.status).toBe(400);
              });

              it("should return an error response", () => {
                expectResponseToBeError(response);
              });
            });

            describe("when Arabic description is not in Arabic", () => {
              let response: supertest.Response;
              let course: CourseType;
              let updates: Partial<CourseType>;

              beforeAll(async () => {
                await database.clear();
                course = await CourseModel.create({
                  code: "CS101",
                  name: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  description: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  department: "CS",
                  creditHours: 3,
                });
                updates = {
                  // @ts-ignore
                  description: {
                    ar: "Introduction to Computer",
                  },
                };
                response = await request.patch(`/course/${course.code}`).send(updates);
              });

              it("should return status code 400", () => {
                expect(response.status).toBe(400);
              });

              it("should return an error response", () => {
                expectResponseToBeError(response);
              });
            });
          });

          describe("when trying to update English description", () => {
            describe("when English description is not a string", () => {
              let response: supertest.Response;
              let course: CourseType;
              let updates: Partial<CourseType>;

              beforeAll(async () => {
                await database.clear();
                course = await CourseModel.create({
                  code: "CS101",
                  name: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  description: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  department: "CS",
                  creditHours: 3,
                });
                updates = {
                  description: {
                    // @ts-ignore
                    en: 123,
                  },
                };
                response = await request.patch(`/course/${course.code}`).send(updates);
              });

              it("should return status code 400", () => {
                expect(response.status).toBe(400);
              });

              it("should return an error response", () => {
                expectResponseToBeError(response);
              });
            });

            describe("when English description is an empty string", () => {
              let response: supertest.Response;
              let course: CourseType;
              let updates: Partial<CourseType>;

              beforeAll(async () => {
                await database.clear();
                course = await CourseModel.create({
                  code: "CS101",
                  name: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  description: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  department: "CS",
                  creditHours: 3,
                });
                updates = {
                  // @ts-ignore
                  description: {
                    en: "",
                  },
                };
                response = await request.patch(`/course/${course.code}`).send(updates);
              });

              it("should return status code 400", () => {
                expect(response.status).toBe(400);
              });

              it("should return an error response", () => {
                expectResponseToBeError(response);
              });
            });

            describe("when English description is not in English", () => {
              let response: supertest.Response;
              let course: CourseType;
              let updates: Partial<CourseType>;

              beforeAll(async () => {
                await database.clear();
                course = await CourseModel.create({
                  code: "CS101",
                  name: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  description: {
                    ar: "مقدمة في الحاسب",
                    en: "Introduction to Computer",
                  },
                  department: "CS",
                  creditHours: 3,
                });
                updates = {
                  // @ts-ignore
                  description: {
                    en: "مقدمة في الحاسب",
                  },
                };
                response = await request.patch(`/course/${course.code}`).send(updates);
              });

              it("should return status code 400", () => {
                expect(response.status).toBe(400);
              });

              it("should return an error response", () => {
                expectResponseToBeError(response);
              });
            });
          });
        });

        describe("when trying to update department", () => {
          describe("when department is not a string", () => {
            let response: supertest.Response;
            let course: CourseType;
            let updates: Partial<CourseType>;

            beforeAll(async () => {
              await database.clear();
              course = await CourseModel.create({
                code: "CS101",
                name: {
                  ar: "مقدمة في الحاسب",
                  en: "Introduction to Computer",
                },
                description: {
                  ar: "مقدمة في الحاسب",
                  en: "Introduction to Computer",
                },
                department: "CS",
                creditHours: 3,
              });
              updates = {
                // @ts-ignore
                department: 123,
              };
              response = await request.patch(`/course/${course.code}`).send(updates);
            });

            it("should return status code 400", () => {
              expect(response.status).toBe(400);
            });

            it("should return an error response", () => {
              expectResponseToBeError(response);
            });
          });

          describe("when department is an empty string", () => {
            let response: supertest.Response;
            let course: CourseType;
            let updates: Partial<CourseType>;

            beforeAll(async () => {
              await database.clear();
              course = await CourseModel.create({
                code: "CS101",
                name: {
                  ar: "مقدمة في الحاسب",
                  en: "Introduction to Computer",
                },
                description: {
                  ar: "مقدمة في الحاسب",
                  en: "Introduction to Computer",
                },
                department: "CS",
                creditHours: 3,
              });
              updates = {
                department: "",
              };
              response = await request.patch(`/course/${course.code}`).send(updates);
            });

            it("should return status code 400", () => {
              expect(response.status).toBe(400);
            });

            it("should return an error response", () => {
              expectResponseToBeError(response);
            });
          });

          describe("when department is not a valid department", () => {
            let response: supertest.Response;
            let course: CourseType;
            let updates: Partial<CourseType>;

            beforeAll(async () => {
              await database.clear();
              course = await CourseModel.create({
                code: "CS101",
                name: {
                  ar: "مقدمة في الحاسب",
                  en: "Introduction to Computer",
                },
                description: {
                  ar: "مقدمة في الحاسب",
                  en: "Introduction to Computer",
                },
                department: "CS",
                creditHours: 3,
              });
              updates = {
                department: "ABC",
              };
              response = await request.patch(`/course/${course.code}`).send(updates);
            });

            it("should return status code 400", () => {
              expect(response.status).toBe(400);
            });

            it("should return an error response", () => {
              expectResponseToBeError(response);
            });
          });
        });

        describe("when trying to update credit hours", () => {
          describe("when credit hours is not a number", () => {
            let response: supertest.Response;
            let course: CourseType;
            let updates: Partial<CourseType>;

            beforeAll(async () => {
              await database.clear();
              course = await CourseModel.create({
                code: "CS101",
                name: {
                  ar: "مقدمة في الحاسب",
                  en: "Introduction to Computer",
                },
                description: {
                  ar: "مقدمة في الحاسب",
                  en: "Introduction to Computer",
                },
                department: "CS",
                creditHours: 3,
              });
              updates = {
                // @ts-ignore
                creditHours: "3",
              };
              response = await request.patch(`/course/${course.code}`).send(updates);
            });

            it("should return status code 400", () => {
              expect(response.status).toBe(400);
            });

            it("should return an error response", () => {
              expectResponseToBeError(response);
            });
          });

          describe("when credit hours is negative", () => {
            let response: supertest.Response;
            let course: CourseType;
            let updates: Partial<CourseType>;

            beforeAll(async () => {
              await database.clear();
              course = await CourseModel.create({
                code: "CS101",
                name: {
                  ar: "مقدمة في الحاسب",
                  en: "Introduction to Computer",
                },
                description: {
                  ar: "مقدمة في الحاسب",
                  en: "Introduction to Computer",
                },
                department: "CS",
                creditHours: 3,
              });
              updates = {
                creditHours: -3,
              };
              response = await request.patch(`/course/${course.code}`).send(updates);
            });

            it("should return status code 400", () => {
              expect(response.status).toBe(400);
            });

            it("should return an error response", () => {
              expectResponseToBeError(response);
            });
          });
        });
      });

      describe("when update data is valid", () => {
        let response: supertest.Response;
        let course: CourseType;
        let updates: Partial<CourseType>;

        beforeAll(async () => {
          await database.clear();
          course = await CourseModel.create({
            code: "CS101",
            name: {
              ar: "مقدمة في الحاسب",
              en: "Introduction to Computer",
            },
            description: {
              ar: "مقدمة في الحاسب",
              en: "Introduction to Computer",
            },
            department: "CS",
            creditHours: 3,
          });
          updates = {
            // @ts-ignore
            name: {
              en: "Introduction to Computer Science",
            },
            // @ts-ignore
            description: {
              en: "Introduction to Computer Science",
            },
            creditHours: 4,
          };
          response = await request.patch(`/course/${course.code}`).send(updates);
        });

        it("should return status code 200", () => {
          expect(response.status).toBe(200);
        });

        it("should return the updated course", () => {
          expect(response.body).toEqual({
            ...updates,
            code: course.code,
          });
        });

        it("should update the course in the database", async () => {
          const updatedCourse = await CourseModel.exists({
            ...updates,
            code: course.code,
          });
          expect(updatedCourse).toBeTruthy();
        });
      });
    });
  });
});
