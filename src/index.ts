/**
 * Remove undefined props from object
 */
function clean(obj: Record<string, string | undefined>) {
  return Object.entries(obj).reduce<Record<string, string>>(
    (acc, [key, val]) => {
      return val ? { ...acc, [key]: val } : acc;
    },
    {}
  );
}

const datePattern = /^\d{8}(T\d{6}Z?)?$/;

export type GoogleCalendarEventArgs =
  | {
      /**
       * Start of event, acceptable formats are:
       *
       * 20200316T010000Z - UTC
       *
       * 20200316T010000 - Time local to the user
       *
       * 20200316 - All day event
       */
      start: string;

      /**
       * End of event, acceptable formats are:
       *
       * 20200316T010000Z - UTC
       *
       * 20200316T010000 - Time local to the user
       *
       * 20200316 - All day event
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
       *
       * 20200316T010000 - Time local to the user
       *
       * 20200316 - All day event
       */
      start?: never;

      /**
       * End of event, acceptable formats are:
       *
       * 20200316T010000Z - UTC
       *
       * 20200316T010000 - Time local to the user
       *
       * 20200316 - All day event
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
export function googleCalendarEventUrl(args: GoogleCalendarEventArgs) {
  const start = "start" in args ? args.start : undefined;
  const end = "end" in args ? args.end : undefined;

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
    text: args.title,
    location: args.location,
    details: args.details,
  };

  const urlSearchParams = new URLSearchParams(clean(searchParams));

  return (
    "https://calendar.google.com/calendar/event?" + urlSearchParams.toString()
  );
}
