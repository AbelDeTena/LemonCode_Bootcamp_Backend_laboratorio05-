import { describe, it, expect } from "vitest";
import { getString, getNumber, toIso } from "./mapper-helpers";

describe("mapper-helpers", () => {
  // --- getString ---
  it("getString returns the same string when valid", () => {
    // Arrange
    const input = "hello";

    // Act
    const result = getString(input);

    // Assert
    expect(result).toBe("hello");
  });

  it("getString returns fallback when value is not a string", () => {
    // Arrange
    const input = 123;

    // Act
    const result = getString(input, "fallback");

    // Assert
    expect(result).toBe("fallback");
  });

  // --- getNumber ---
  it("getNumber returns the same number when valid", () => {
    // Arrange
    const input = 42;

    // Act
    const result = getNumber(input);

    // Assert
    expect(result).toBe(42);
  });

  it("getNumber parses a numeric string", () => {
    // Arrange
    const input = "123";

    // Act
    const result = getNumber(input);

    // Assert
    expect(result).toBe(123);
  });

  it("getNumber returns fallback when input is invalid", () => {
    // Arrange
    const input = "abc";

    // Act
    const result = getNumber(input, 99);

    // Assert
    expect(result).toBe(99);
  });

  // --- toIso ---
  it("toIso converts a Date instance to ISO string", () => {
    // Arrange
    const input = new Date("2025-01-01T00:00:00.000Z");

    // Act
    const result = toIso(input);

    // Assert
    expect(result).toBe("2025-01-01T00:00:00.000Z");
  });

  it("toIso converts a valid date string to ISO string", () => {
    // Arrange
    const input = "2025-01-01";

    // Act
    const result = toIso(input);

    // Assert
    expect(result).toContain("2025-01-01");
  });

  it("toIso returns fallback when date string is invalid", () => {
    // Arrange
    const input = "not-a-date";

    // Act
    const result = toIso(input, "fallback");

    // Assert
    expect(result).toBe("fallback");
  });
});
