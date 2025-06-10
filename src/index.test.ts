import { expect, test } from "vitest";
import { googleCalendarEventUrl } from ".";

const baseUrl = "https://calendar.google.com/calendar/event?";

test("with start and end", () => {
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

test("local time", () => {
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

test("all day", () => {
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
    })
  ).toThrow("`end` is required when `start` is provided");
});

test("only end date should fail", () => {
  expect(() =>
    // @ts-expect-error - Testing runtime validation for invalid input
    googleCalendarEventUrl({
      end: "20200222",
    })
  ).toThrow("`start` is required when `end` is provided");
});

test("malformed date should fail", () => {
  expect(() =>
    googleCalendarEventUrl({
      start: "2020-02-21",
      end: "20200222",
    })
  ).toThrow("`start` is malformed");
});

test("malformed date should fail", () => {
  expect(() =>
    googleCalendarEventUrl({
      start: "20200221",
      end: "2020-02-22",
    })
  ).toThrow("`end` is malformed");
});

test("malformed date should fail", () => {
  expect(() =>
    googleCalendarEventUrl({
      start: "20200221Z",
      end: "20200221",
    })
  ).toThrow("`start` is malformed");
});

test("mixed date formats should fail", () => {
  expect(() =>
    googleCalendarEventUrl({
      start: "20200321T010000Z",
      end: "20200325T010000",
    })
  ).toThrow("`start` and `end` must be in the same format");
});
