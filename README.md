# google-calendar-url

Generate shareable URLs for adding Google Calendar events

Try it in a [CodeSandbox](https://codesandbox.io/s/google-calendar-url-fbvyr).

## Installation

```sh
yarn add google-calendar-url
# or
npm install google-calendar-url --save
```

## Usage

```ts
import { googleCalendarEventUrl } from 'google-calendar-url';

const url = googleCalendarEventUrl({
  start: '20201212T100000Z',
  end: '20201212T100000Z',
  title: 'Event title',
  details: 'Event details',
  location: 'San Francisco',
});
```

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
