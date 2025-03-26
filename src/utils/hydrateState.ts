export const hydrateUrlToState = (url: string) => {
  let newValue = JSON.parse(url);
  if (typeof newValue === 'string') newValue = JSON.parse(newValue);
  newValue.state.birthday = newValue.state.birthday.parseDate('yyyymmdd');
  newValue.state.events = newValue.state.events.map((event: any) => ({
    ...event,
    start: event.start.parseDate('yyyymmdd'),
    end: event.end.parseDate('yyyymmdd')
  }));
  return newValue;
}
