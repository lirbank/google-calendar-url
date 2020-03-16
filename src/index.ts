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
  start: string;
  end: string;
  text?: string;
  location?: string;
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
