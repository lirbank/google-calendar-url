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

export interface GoogleCalendarEventUrlArgs {
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
  text?: string;

  /** Event location */
  location?: string;

  /** Event details */
  details?: string;
}

/**
 * Generate a Google Calendar event URL
 */
export function googleCalendarEventUrl(args: GoogleCalendarEventUrlArgs) {
  const { start, end, ...rest } = args;

  const searchParams = {
    action: 'TEMPLATE',
    dates: `${start}/${end}`,
    ...rest,
  };

  const urlSearchParams = new URLSearchParams(clean(searchParams));

  return (
    'https://calendar.google.com/calendar/event?' + urlSearchParams.toString()
  );
}
