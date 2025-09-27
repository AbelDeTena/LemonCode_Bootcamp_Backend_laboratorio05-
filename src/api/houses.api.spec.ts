import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import { app } from "./app";
import { __setHousesForTest } from "../pods/houses/houses.rest-api";
import { HOUSES_MOCK } from "../dals/houses/houses.mock";

describe("HOUSES API", () => {
  beforeEach(() => {
    // Arrange: reset data before each test
    __setHousesForTest(HOUSES_MOCK);
  });

  it("GET /api/houses returns a list", async () => {
    // Act
    const response = await request(app).get("/api/houses");

    // Assert
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.items ?? response.body)).toBe(true);
  });

  it("GET /api/houses/:id returns detail for existing house", async () => {
    // Act
    const response = await request(app).get("/api/houses/1");

    // Assert
    expect(response.status).toBe(200);
  });

  it("GET /api/houses/:id returns 404 for non-existing house", async () => {
    // Act
    const response = await request(app).get("/api/houses/9999");

    // Assert
    expect(response.status).toBe(404);
  });

  it("POST /api/houses/:id/reviews creates a review with 201", async () => {
    // Arrange
    const newReview = { author: "Abel", comment: "Very nice!" };

    // Act
    const response = await request(app)
      .post("/api/houses/1/reviews")
      .send(newReview)
      .set("Content-Type", "application/json");

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("author", "Abel");
  });

  it("POST /api/houses/:id/reviews returns 400 if author is missing", async () => {
    // Act
    const response = await request(app)
      .post("/api/houses/1/reviews")
      .send({ comment: "no author" })
      .set("Content-Type", "application/json");

    // Assert
    expect(response.status).toBe(400);
  });

  it("POST /api/houses/:id/reviews returns 400 if comment is missing", async () => {
    // Act
    const response = await request(app)
      .post("/api/houses/1/reviews")
      .send({ author: "Abel" })
      .set("Content-Type", "application/json");

    // Assert
    expect(response.status).toBe(400);
  });
});
