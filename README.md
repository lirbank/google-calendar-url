# google-calendar-url

Generate shareable URLs for adding Google Calendar events.

## Features

Written in TypeScript and includes type definitions.

- No dependencies
- Works with vanilla JavaScript and
  [TypeScript](https://www.typescriptlang.org/)
- Adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

Try it in a [CodeSandbox](https://codesandbox.io/s/google-calendar-url-fbvyr).

## Installation

```sh
bun add google-calendar-url
pnpm add google-calendar-url
yarn add google-calendar-url
npm install google-calendar-url --save
```

## Usage

```ts
import { googleCalendarEventUrl } from 'google-calendar-url';

const url = googleCalendarEventUrl({
  start: '20201212T100000Z',
  end: '20201212T110000Z',
  title: 'Event title',
  details: 'Event details',
  location: 'San Francisco',
});

console.log(url);

// https://calendar.google.com/calendar/event?action=TEMPLATE&dates=20201212T100000Z%2F20201212T110000Z&text=Event+title&details=Event+details&location=San+Francisco
```

[Try the URL ](https://calendar.google.com/calendar/event?action=TEMPLATE&dates=20201212T100000Z%2F20201212T110000Z&text=Event+title&details=Event+details&location=San+Francisco)

## API

The `googleCalendarEventUrl` function takes a single `GoogleCalendarEventArgs`
argument.

```ts
interface GoogleCalendarEventArgs {
  /**
   * Start of event, acceptable formats are:
   *
   * 20200316T010000Z - UTC
   *
   * 20200316T010000 - Time local to the user
   *
   * 20200316 - All day event
   */
  start?: string;

  /**
   * End of event, acceptable formats are:
   *
   * 20200316T010000Z - UTC
   *
   * 20200316T010000 - Time local to the user
   *
   * 20200316 - All day event
   */
  end?: string;

  /** Event title */
  title?: string;

  /** Event location */
  location?: string;

  /** Event details */
  details?: string;
}
```

## References

- [Inofficial spec](https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/master/services/google.md)

## Maintainers

- [@lirbank](https://github.com/lirbank)

## Contributing

Contributions are welcome! Please open issues or pull requests on
[GitHub](https://github.com/starmode-base/neon-testing/pulls).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## Need expert help?

I take on a few consulting projects each year where I can build, unblock, and
ship.

**[STΛR MODΞ](https://www.starmode.dev/)** — The AI development studio I run
with AI/ML expert and data scientist Spencer Smith. We help companies build
accurate AI solutions: AI-first apps, advanced workflows, and agentic systems.

**[Mikael Lirbank](https://www.lirbank.com/)** — My solo practice, focused on
web app development, test automation, code quality, and technical architecture.
I'm around, friendly, and happy to help with the hard stuff.
