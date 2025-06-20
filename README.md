# Google Calendar URL

Generate shareable URLs for adding Google Calendar events.

## Features

- 📦 **No dependencies** - Lightweight and self-contained
- 🛡️ **TypeScript native** - Written in TypeScript with strict type definitions
- 🌐 **Universal compatibility** - Works with JavaScript and TypeScript

## Installation

```sh
bun add google-calendar-url
pnpm add google-calendar-url
yarn add google-calendar-url
npm install google-calendar-url
```

## Usage

```ts
import { googleCalendarEventUrl } from "google-calendar-url";

// Compact ISO 8601 format
googleCalendarEventUrl({
  start: "20201212T100000Z",
  end: "20201212T110000Z",
  title: "Event title",
  details: "Event details",
  location: "San Francisco",
});

// Extended ISO 8601 format
googleCalendarEventUrl({
  start: "2020-12-12T10:00:00Z",
  end: "2020-12-12T11:00:00Z",
  title: "Event title",
  details: "Event details",
  location: "San Francisco",
});

// Output (same for both):
// https://calendar.google.com/calendar/event?action=TEMPLATE&dates=20201212T100000Z%2F20201212T110000Z&text=Event+title&details=Event+details&location=San+Francisco
```

[Try the URL ](https://calendar.google.com/calendar/event?action=TEMPLATE&dates=20201212T100000Z%2F20201212T110000Z&text=Event+title&details=Event+details&location=San+Francisco)

## Helper function

The `toGoogleCalendarDate()` helper converts JavaScript `Date` objects to Google Calendar date strings.

```ts
import { toGoogleCalendarDate } from "google-calendar-url";

const date = new Date("2024-03-21T14:30:45Z");

// All-day event
toGoogleCalendarDate(date, { source: "utc", style: "allDay" });
// "20240321"

// Time in user's local timezone (floating)
toGoogleCalendarDate(date, { source: "local", style: "floating" });
// "20240321T143045" (varies by timezone)

// UTC time (instant)
toGoogleCalendarDate(date, { source: "utc", style: "instant" });
// "20240321T143045Z"

googleCalendarEventUrl({
  start: toGoogleCalendarDate(date, { source: "utc", style: "allDay" }),
  end: toGoogleCalendarDate(date, { source: "utc", style: "allDay" }),
  title: "Event title",
  details: "Event details",
  location: "San Francisco",
});
```

**Options:**

- `source`: `"utc"` | `"local"` - Whether to read the date in UTC or local time
- `style`: `"allDay"` | `"floating"` | `"instant"` - How Google Calendar should interpret the date

## References

- [Unofficial spec](https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/master/services/google.md)

## Contributing

Contributions are welcome! Please open issues or pull requests on [GitHub](https://github.com/lirbank/google-calendar-url/pulls).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Need expert help?

Hi, I'm [@lirbank](https://github.com/lirbank). I take on a few consulting projects each year where I help companies build, unblock, and ship. Here's what I do:

**[STΛR MODΞ](https://www.starmode.dev/)** — A boutique AI development studio I run with AI/ML expert and data scientist [@spencer-g-smith](https://github.com/spencer-g-smith). We help companies build accurate AI solutions: AI-first apps, advanced workflows, and agentic systems.

**[Mikael Lirbank](https://www.lirbank.com/)** — My solo practice, focused on web app development, test automation, code quality, and technical architecture. I'm friendly and happy to help with the hard stuff.
