const request = require("supertest");
const { app } = require("../app");

describe("App Tests", () => {
  it('should respond with the file containing "Real-time Updates Test" text', async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("<h1>Real-time Updates Test</h1>");
  });

  it("should respond with 404 for an unknown endpoint", async () => {
    const response = await request(app).get("/nonexistent");

    expect(response.statusCode).toBe(404);
  });
});
