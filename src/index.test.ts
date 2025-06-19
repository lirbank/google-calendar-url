import { expect, test, describe } from "vitest";
import { googleCalendarEventUrl, toGoogleCalendarDate } from ".";

const baseUrl = "https://calendar.google.com/calendar/event?";

test("with start and end - compact ISO 8601 format", () => {
  const eventUrl = googleCalendarEventUrl({
    start: "20200321T010000Z",
    end: "20200325T010000Z",
    title: "An event",
    location: "San Francisco",
    details: "Details and details",
  });

  const expected =
    baseUrl +
    [
      "action=TEMPLATE",
      "dates=20200321T010000Z%2F20200325T010000Z",
      "text=An+event",
      "location=San+Francisco",
      "details=Details+and+details",
    ].join("&");

  console.log(eventUrl);
  expect(eventUrl).toBe(expected);
});

test("with start and end - extended ISO 8601 format", () => {
  const eventUrl = googleCalendarEventUrl({
    start: "2020-03-21T01:00:00Z",
    end: "2020-03-25T01:00:00Z",
    title: "An event",
    location: "San Francisco",
    details: "Details and details",
  });

  const expected =
    baseUrl +
    [
      "action=TEMPLATE",
      "dates=20200321T010000Z%2F20200325T010000Z",
      "text=An+event",
      "location=San+Francisco",
      "details=Details+and+details",
    ].join("&");

  console.log(eventUrl);
  expect(eventUrl).toBe(expected);
});

test("local time - compact ISO 8601 format", () => {
  const eventUrl = googleCalendarEventUrl({
    start: "20200321T010000",
    end: "20200325T010000",
    title: "An event",
    location: "San Francisco",
    details: "Details and details",
  });

  const expected =
    baseUrl +
    [
      "action=TEMPLATE",
      "dates=20200321T010000%2F20200325T010000",
      "text=An+event",
      "location=San+Francisco",
      "details=Details+and+details",
    ].join("&");

  console.log(eventUrl);
  expect(eventUrl).toBe(expected);
});

test("local time - extended ISO 8601 format", () => {
  const eventUrl = googleCalendarEventUrl({
    start: "2020-03-21T01:00:00",
    end: "2020-03-25T01:00:00",
    title: "An event",
    location: "San Francisco",
    details: "Details and details",
  });

  const expected =
    baseUrl +
    [
      "action=TEMPLATE",
      "dates=20200321T010000%2F20200325T010000",
      "text=An+event",
      "location=San+Francisco",
      "details=Details+and+details",
    ].join("&");

  console.log(eventUrl);
  expect(eventUrl).toBe(expected);
});

test("all day - compact ISO 8601 format", () => {
  const eventUrl = googleCalendarEventUrl({
    start: "20200221",
    end: "20200222",
    title: "An event",
    location: "San Francisco",
    details: "Details and details",
  });

  const expected =
    baseUrl +
    [
      "action=TEMPLATE",
      "dates=20200221%2F20200222",
      "text=An+event",
      "location=San+Francisco",
      "details=Details+and+details",
    ].join("&");

  console.log(eventUrl);
  expect(eventUrl).toBe(expected);
});

test("all day - extended ISO 8601 format", () => {
  const eventUrl = googleCalendarEventUrl({
    start: "2020-02-21",
    end: "2020-02-22",
    title: "An event",
    location: "San Francisco",
    details: "Details and details",
  });

  const expected =
    baseUrl +
    [
      "action=TEMPLATE",
      "dates=20200221%2F20200222",
      "text=An+event",
      "location=San+Francisco",
      "details=Details+and+details",
    ].join("&");

  console.log(eventUrl);
  expect(eventUrl).toBe(expected);
});

test("with empty values", () => {
  const eventUrl = googleCalendarEventUrl({
    start: "",
    end: "",
    title: "",
    location: "",
    details: "",
  });

  const expected = baseUrl + ["action=TEMPLATE"].join("&");

  console.log(eventUrl);
  expect(eventUrl).toBe(expected);
});

test("with undefined values", () => {
  const eventUrl = googleCalendarEventUrl({
    start: undefined,
    end: undefined,
    title: undefined,
    location: undefined,
    details: undefined,
  });

  const expected = baseUrl + ["action=TEMPLATE"].join("&");

  console.log(eventUrl);
  expect(eventUrl).toBe(expected);
});

test("without values", () => {
  const eventUrl = googleCalendarEventUrl({});

  const expected = baseUrl + ["action=TEMPLATE"].join("&");

  console.log(eventUrl);
  expect(eventUrl).toBe(expected);
});

/**
 * Errors
 */

test("only start date should fail", () => {
  expect(() =>
    // @ts-expect-error - Testing runtime validation for invalid input
    googleCalendarEventUrl({
      start: "20200221",
    }),
  ).toThrow("`end` is required when `start` is provided");
});

test("only end date should fail", () => {
  expect(() =>
    // @ts-expect-error - Testing runtime validation for invalid input
    googleCalendarEventUrl({
      end: "20200222",
    }),
  ).toThrow("`start` is required when `end` is provided");
});

test("malformed date should fail", () => {
  expect(() =>
    googleCalendarEventUrl({
      start: "2020_02_21",
      end: "20200222",
    }),
  ).toThrow("`start` is malformed");
});

test("malformed date should fail", () => {
  expect(() =>
    googleCalendarEventUrl({
      start: "20200221",
      end: "2020_02_22",
    }),
  ).toThrow("`end` is malformed");
});

test("malformed date should fail", () => {
  expect(() =>
    googleCalendarEventUrl({
      start: "20200221Z",
      end: "20200221",
    }),
  ).toThrow("`start` is malformed");
});

test("mixed date formats should fail", () => {
  expect(() =>
    googleCalendarEventUrl({
      start: "20200321T010000Z",
      end: "20200325T010000",
    }),
  ).toThrow("`start` and `end` must be in the same format");
});

describe("toGoogleCalendarDate", () => {
  // Test with a specific date to ensure consistent results
  const testDate = new Date("2024-03-21T14:30:45Z"); // March 21, 2024, 2:30:45 PM UTC

  describe("allDay style", () => {
    test("should format date as YYYYMMDD with UTC source", () => {
      const result = toGoogleCalendarDate(testDate, {
        source: "utc",
        style: "allDay",
      });
      expect(result).toBe("20240321");
    });

    test("should format date as YYYYMMDD with local source", () => {
      const result = toGoogleCalendarDate(testDate, {
        source: "local",
        style: "allDay",
      });
      expect(result).toMatch(/^\d{8}$/);
    });
  });

  describe("floating style", () => {
    test("should format date as YYYYMMDDTHHMMSS with UTC source", () => {
      const result = toGoogleCalendarDate(testDate, {
        source: "utc",
        style: "floating",
      });
      expect(result).toBe("20240321T143045");
    });

    test("should format date as YYYYMMDDTHHMMSS with local source", () => {
      const result = toGoogleCalendarDate(testDate, {
        source: "local",
        style: "floating",
      });
      expect(result).toMatch(/^\d{8}T\d{6}$/);
    });
  });

  describe("instant style", () => {
    test("should format date as YYYYMMDDTHHMMSSZ with UTC source", () => {
      const result = toGoogleCalendarDate(testDate, {
        source: "utc",
        style: "instant",
      });
      expect(result).toBe("20240321T143045Z");
    });

    test("should format date as YYYYMMDDTHHMMSSZ with local source", () => {
      const result = toGoogleCalendarDate(testDate, {
        source: "local",
        style: "instant",
      });
      expect(result).toMatch(/^\d{8}T\d{6}Z$/);
    });
  });

  describe("edge cases", () => {
    test("should handle single digit months and days correctly", () => {
      const earlyDate = new Date("2024-01-05T09:08:07Z"); // January 5, 2024
      const result = toGoogleCalendarDate(earlyDate, {
        source: "utc",
        style: "floating",
      });
      expect(result).toBe("20240105T090807");
    });

    test("should handle midnight correctly", () => {
      const midnightDate = new Date("2024-12-31T00:00:00Z");
      const result = toGoogleCalendarDate(midnightDate, {
        source: "utc",
        style: "floating",
      });
      expect(result).toBe("20241231T000000");
    });

    test("should handle end of year correctly", () => {
      const endOfYear = new Date("2024-12-31T23:59:59Z");
      const result = toGoogleCalendarDate(endOfYear, {
        source: "utc",
        style: "instant",
      });
      expect(result).toBe("20241231T235959Z");
    });

    test("should handle leap year correctly", () => {
      const leapDay = new Date("2024-02-29T12:00:00Z"); // 2024 is a leap year
      const result = toGoogleCalendarDate(leapDay, {
        source: "utc",
        style: "allDay",
      });
      expect(result).toBe("20240229");
    });
  });
});
