import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "./app";

describe("APP API (global endpoints)", () => {
  it("GET / should return API running message", async () => {
    // Act
    const response = await request(app).get("/");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "API is running 🚀" });
  });

  it("Unknown routes should return 404 with JSON response", async () => {
    // Act
    const response = await request(app).post("/api/foo");

    // Assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Not Found" });
  });
});
