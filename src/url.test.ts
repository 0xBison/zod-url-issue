import { z } from "zod";

describe("Zod URL validation", () => {
  const urlSchema = z.url();

  describe("localhost URLs", () => {
    test("should validate basic localhost", () => {
      const result = urlSchema.safeParse("http://localhost");
      expect(result.success).toBe(true);
    });

    test("should validate localhost with port", () => {
      const result = urlSchema.safeParse("http://localhost:3000");
      expect(result.success).toBe(true);
    });

    test("should validate localhost with path", () => {
      const result = urlSchema.safeParse("http://localhost/api");
      expect(result.success).toBe(true);
    });

    test("should validate localhost with https", () => {
      const result = urlSchema.safeParse("https://localhost");
      expect(result.success).toBe(true);
    });
  });

  describe("domain URLs", () => {
    test("should validate domain without path", () => {
      const result = urlSchema.safeParse("https://example.com");
      expect(result.success).toBe(true);
    });

    test("should validate domain with www", () => {
      const result = urlSchema.safeParse("https://www.example.com");
      expect(result.success).toBe(true);
    });

    test("should validate domain with path", () => {
      const result = urlSchema.safeParse("https://example.com/path");
      expect(result.success).toBe(true);
    });

    test("should validate domain with query params", () => {
      const result = urlSchema.safeParse("https://example.com?foo=bar");
      expect(result.success).toBe(true);
    });

    test("should validate domain with hash", () => {
      const result = urlSchema.safeParse("https://example.com#section");
      expect(result.success).toBe(true);
    });
  });

  describe("invalid URLs", () => {
    test("should reject strings without protocol", () => {
      const result = urlSchema.safeParse("localhost");
      expect(result.success).toBe(false);
    });

    test("should reject invalid protocols", () => {
      const result = urlSchema.safeParse("ftp://example.com");
      expect(result.success).toBe(false);
    });

    test("should reject malformed URLs", () => {
      const result = urlSchema.safeParse("not-a-url");
      expect(result.success).toBe(false);
    });

    test("should reject URLs with spaces", () => {
      const result = urlSchema.safeParse(
        "https://example.com/path with spaces"
      );
      expect(result.success).toBe(false);
    });
  });

  describe("edge cases", () => {
    test("should validate IP addresses", () => {
      const result = urlSchema.safeParse("http://127.0.0.1");
      expect(result.success).toBe(true);
    });

    test("should validate URLs with basic auth", () => {
      const result = urlSchema.safeParse("https://user:pass@example.com");
      expect(result.success).toBe(true);
    });

    test("should validate URLs with multiple subdomains", () => {
      const result = urlSchema.safeParse("https://api.staging.example.com");
      expect(result.success).toBe(true);
    });
  });
});
