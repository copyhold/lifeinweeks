import {batch} from 'solid-js';
import { birthday, name, events, setBirthday, setName, setEvents } from './state';

export const persist = () => {
  const url = new URL(location.href);
  url.searchParams.set('birthday', birthday().format('yyyymmdd'));
  url.searchParams.set('name', name());
  url.searchParams.set('events', JSON.stringify(events()));
  const prevUrl = new URLSearchParams(location.search);
  if (Array.from(url.searchParams.entries()).find(([key, value]) => prevUrl.get(key) !== value)) {
    console.log('persist', birthday(), name(), events());
    window.history.replaceState({}, `${name()} life in weeks`, url.toString());
  }
};
export const init = () => {
  const params = new URLSearchParams(location.search);
  const bdate = new Date((params.get('birthday') || '19720803').parseDate('yyyymmdd'));
  batch(() => {
    setBirthday(bdate);
    setName(params.get('name'));
    setEvents(JSON.parse(params.get('events') || '[]'));
  })
}