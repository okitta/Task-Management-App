const request = require("supertest");
const { app } = require("../app"); // Import the app instance
const { prisma } = require("../utils/prisma.js");

jest.mock("../middlewares/authMiddleware", () => (req, res, next) => {
  req.user = {};
  return next();
});

describe("Project Controller Tests", () => {
  const validProjectData = {
    name: "Test Project 1",
    description: "Test Project Description",
  };

  it("should create a project", async () => {
    jest.spyOn(prisma.project, "create").mockResolvedValue({
      id: 1,
    });

    const response = await request(app)
      .post("/api/projects")
      .send(validProjectData);

    expect(prisma.project.create).toHaveBeenCalledWith({
      data: {
        ...validProjectData,
        user: {
          connect: {
            id: undefined,
          },
        },
      },
    });
    expect(response.statusCode).toBe(201);
  });

  it("should update a project", async () => {
    const updatedData = {
      name: "Updated Test Project 1",
      description: "Updated Test Project Description",
    };
    jest.spyOn(prisma.project, "update").mockResolvedValue({
      id: 1,
    });

    const response = await request(app)
      .put("/api/projects/1")
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(prisma.project.update).toHaveBeenCalledWith({
      where: { id: 1, user_id: jest.any },
      data: updatedData,
    });
  });

  it("should delete a project", async () => {
    jest.spyOn(prisma.project, "delete").mockResolvedValue({
      id: 1,
    });

    const response = await request(app).delete("/api/projects/1").send();

    expect(response.statusCode).toBe(204);
    expect(prisma.project.delete).toHaveBeenCalledWith({
      where: { id: 1, user_id: jest.any },
    });
  });
});
