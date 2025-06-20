/**
 * Remove undefined props from object
 */
function clean(obj: Record<string, string | undefined>) {
  return Object.entries(obj).reduce<Record<string, string>>(
    (acc, [key, val]) => {
      return val ? { ...acc, [key]: val } : acc;
    },
    {},
  );
}

const datePattern = /^\d{8}(T\d{6}Z?)?$/;

export type GoogleCalendarEventUrlOptions =
  | {
      /**
       * Start of event, acceptable formats are:
       *
       * 20200316T010000Z - UTC
       * 2020-03-16T01:00:00Z - UTC
       *
       * 20200316T010000 - Time local to the user
       * 2020-03-16T01:00:00 - Time local to the user
       *
       * 20200316 - All day event
       * 2020-03-16 - All day event
       */
      start: string;

      /**
       * End of event, acceptable formats are:
       *
       * 20200316T010000Z - UTC
       * 2020-03-16T01:00:00Z - UTC
       *
       * 20200316T010000 - Time local to the user
       * 2020-03-16T01:00:00 - Time local to the user
       *
       * 20200316 - All day event
       * 2020-03-16 - All day event
       */
      end: string;

      /** Event title */
      title?: string;

      /** Event location */
      location?: string;

      /** Event details */
      details?: string;
    }
  | {
      /**
       * Start of event, acceptable formats are:
       *
       * 20200316T010000Z - UTC
       * 2020-03-16T01:00:00Z - UTC
       *
       * 20200316T010000 - Time local to the user
       * 2020-03-16T01:00:00 - Time local to the user
       *
       * 20200316 - All day event
       * 2020-03-16 - All day event
       */
      start?: never;

      /**
       * End of event, acceptable formats are:
       *
       * 20200316T010000Z - UTC
       * 2020-03-16T01:00:00Z - UTC
       *
       * 20200316T010000 - Time local to the user
       * 2020-03-16T01:00:00 - Time local to the user
       *
       * 20200316 - All day event
       * 2020-03-16 - All day event
       */
      end?: never;

      /** Event title */
      title?: string;

      /** Event location */
      location?: string;

      /** Event details */
      details?: string;
    };

/**
 * Generate a Google Calendar event URL
 */
export function googleCalendarEventUrl(options: GoogleCalendarEventUrlOptions) {
  let start = "start" in options ? options.start : undefined;
  start = start?.replace(/\:/g, "").replace(/\-/g, "");

  let end = "end" in options ? options.end : undefined;
  end = end?.replace(/\:/g, "").replace(/\-/g, "");

  if (start && !end) {
    throw new Error("`end` is required when `start` is provided");
  }

  if (!start && end) {
    throw new Error("`start` is required when `end` is provided");
  }

  if (start && !datePattern.test(start)) {
    throw new Error("`start` is malformed");
  }

  if (end && !datePattern.test(end)) {
    throw new Error("`end` is malformed");
  }

  if (start && end && start.length !== end.length) {
    throw new Error("`start` and `end` must be in the same format");
  }

  const searchParams = {
    action: "TEMPLATE",
    dates: start && end ? `${start}/${end}` : undefined,
    text: options.title,
    location: options.location,
    details: options.details,
  };

  const urlSearchParams = new URLSearchParams(clean(searchParams));

  return (
    "https://calendar.google.com/calendar/event?" + urlSearchParams.toString()
  );
}

export type DateSource = "local" | "utc";
export type DateStyle = "floating" | "instant" | "allDay";

export interface ToGoogleCalendarDateOptions {
  /** Where to read the clock */
  source: DateSource;
  /** How Google Calendar should treat it */
  style: DateStyle;
}

/** Convert a JS Date to a Google Calendar ready string */
export function toGoogleCalendarDate(
  date: Date,
  options: ToGoogleCalendarDateOptions,
): string {
  const { source, style } = options;
  const pad = (n: number) => n.toString().padStart(2, "0");

  const y = source === "utc" ? date.getUTCFullYear() : date.getFullYear();
  const m = pad((source === "utc" ? date.getUTCMonth() : date.getMonth()) + 1);
  const d = pad(source === "utc" ? date.getUTCDate() : date.getDate());

  if (style === "allDay") {
    return `${y}${m}${d}`;
  }

  const hh = pad(source === "utc" ? date.getUTCHours() : date.getHours());
  const mm = pad(source === "utc" ? date.getUTCMinutes() : date.getMinutes());
  const ss = pad(source === "utc" ? date.getUTCSeconds() : date.getSeconds());
  const z = style === "instant" ? "Z" : "";

  return `${y}${m}${d}T${hh}${mm}${ss}${z}`;
}
