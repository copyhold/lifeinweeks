import {createEffect} from 'solid-js';
import { birthday, name, weeks, setBirthday, setName, setWeeks } from './state';

createEffect(() => {
  const url = new URL(location.href);
  url.searchParams.set('birthday', birthday().toISOString());
  url.searchParams.set('name', name());
  url.searchParams.set('weeks', JSON.stringify(weeks()));
  window.history.replaceState({}, `${name()} life in weeks`, url.toString());
}, [birthday, name, weeks]);

const params = new URLSearchParams(location.search);
setBirthday(new Date(params.get('birthday')));
setName(params.get('name'));
setWeeks(JSON.parse(params.get('weeks') || '[]'));