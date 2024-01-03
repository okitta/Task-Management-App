const bcrypt = require("bcrypt");
const request = require("supertest");
const { app } = require("../app");
const { prisma } = require("../utils/prisma.js");

describe("Registration Controller Tests", () => {
  const validRegistrationData = {
    username: "uniqueUserName123",
    email: "uniqueEmail123@example.com",
    password: "strongAndSecurePassword",
    role: "user",
  };

  it("should successfully register a new user", async () => {
    jest.spyOn(bcrypt, "hash").mockImplementation(() => "hashedPassword");
    jest.spyOn(prisma.user, "create").mockResolvedValue({
      id: 1,
    });

    const response = await request(app)
      .post("/api/auth/register")
      .send(validRegistrationData);

    expect(response.statusCode).toBe(201);
    expect(bcrypt.hash).toHaveBeenCalledWith(
      validRegistrationData.password,
      10
    );
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: "uniqueEmail123@example.com",
        password: "hashedPassword",
        role: "user",
        username: "uniqueUserName123",
      },
    });
  });

  it("should return 400 if required fields are missing", async () => {
    const incompleteData = {
      username: "user123",
      // Missing email and password
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(incompleteData);

    expect(response.statusCode).toBe(400);
  });
});
