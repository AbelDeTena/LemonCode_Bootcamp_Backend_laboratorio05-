import { describe, it, expect } from "vitest";
import {
  mapDbHouseToHouseSummaryVM,
  mapDbHouseToHouseDetailVM,
} from "./houses.mappers";
import { DbHouse } from "../../dals";
import { HouseSummaryVM, HouseDetailVM } from "./houses.api-model";

const sample: DbHouse = {
  _id: "10006546",
  name: "Cozy Loft in City Center",
  beds: 2,
  bedrooms: 1,
  bathrooms: 1,
  images: { picture_url: "https://img" },
  address: { street: "Calle Mayor 123", country: "Spain" },
  description: "Nice loft close to everything.",
  reviews: [
    { date: "2024-01-05", reviewer_name: "Luis", comments: "Ubicación perfecta." },
    { date: "2024-02-10", reviewer_name: "Ana", comments: "Muy limpio." },
  ],
};

describe("houses.mappers", () => {
  describe("mapDbHouseToHouseSummaryVM", () => {
    it("maps fields correctly from DbHouse to HouseSummaryVM", () => {
      // Arrange
      const input: DbHouse = sample;

      // Act
      const result: HouseSummaryVM = mapDbHouseToHouseSummaryVM(input);

      // Assert
      expect(result).toEqual({
        id: "10006546",
        title: "Cozy Loft in City Center",
        country: "Spain",
        pictureUrl: "https://img",
      });
    });
  });

  describe("mapDbHouseToHouseDetailVM", () => {
    it("maps basic fields correctly from DbHouse to HouseDetailVM", () => {
      // Arrange
      const input: DbHouse = sample;

      // Act
      const result: HouseDetailVM = mapDbHouseToHouseDetailVM(input);

      // Assert
      expect(result).toMatchObject({
        id: "10006546",
        title: "Cozy Loft in City Center",
        pictureUrl: "https://img",
        description: "Nice loft close to everything.",
        address: "Calle Mayor 123",
        bedrooms: 1,
        beds: 2,
        bathrooms: 1,
      });
    });

    it("maps reviews and orders them most recent first", () => {
      // Arrange
      const input: DbHouse = sample;

      // Act
      const result: HouseDetailVM = mapDbHouseToHouseDetailVM(input);

      // Assert
      expect(result.lastReviews.length).toBeLessThanOrEqual(5);
      expect(result.lastReviews[0].author).toBe("Ana"); // latest review
      expect(result.lastReviews[1].author).toBe("Luis"); // older review
    });

    it("returns empty array when no reviews exist", () => {
      // Arrange
      const input: DbHouse = { ...sample, reviews: [] };

      // Act
      const result: HouseDetailVM = mapDbHouseToHouseDetailVM(input);

      // Assert
      expect(result.lastReviews).toEqual([]);
    });
  });
});
