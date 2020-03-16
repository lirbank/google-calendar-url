import { googleCalendarEventUrl } from '.';

const baseUrl = 'https://calendar.google.com/calendar/event?';

test('with start and end', () => {
  const eventUrl = googleCalendarEventUrl({
    start: '20200321T010000Z',
    end: '20200325T010000Z',
    text: 'An event',
    location: 'San Francisco',
    details: 'Details and details',
  });

  const expected =
    baseUrl +
    [
      'action=TEMPLATE',
      'dates=20200321T010000Z%2F20200325T010000Z',
      'text=An+event',
      'location=San+Francisco',
      'details=Details+and+details',
    ].join('&');

  expect(eventUrl).toBe(expected);
});

test('local time', () => {
  const eventUrl = googleCalendarEventUrl({
    start: '20200321T010000',
    end: '20200325T010000',
    text: 'An event',
    location: 'San Francisco',
    details: 'Details and details',
  });

  const expected =
    baseUrl +
    [
      'action=TEMPLATE',
      'dates=20200321T010000%2F20200325T010000',
      'text=An+event',
      'location=San+Francisco',
      'details=Details+and+details',
    ].join('&');

  expect(eventUrl).toBe(expected);
});

test('all day', () => {
  const eventUrl = googleCalendarEventUrl({
    start: '20200221',
    end: '20200222',
    text: 'An event',
    location: 'San Francisco',
    details: 'Details and details',
  });

  const expected =
    baseUrl +
    [
      'action=TEMPLATE',
      'dates=20200221%2F20200222',
      'text=An+event',
      'location=San+Francisco',
      'details=Details+and+details',
    ].join('&');

  expect(eventUrl).toBe(expected);
});
