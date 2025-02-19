import { birthday, name, weeks, setBirthday, setName, setWeeks } from './state';

export const persist = () => {
  const url = new URL(location.href);
  url.searchParams.set('birthday', birthday().format('yyyymmdd'));
  url.searchParams.set('name', name());
  url.searchParams.set('weeks', JSON.stringify(weeks()));
  window.history.replaceState({}, `${name()} life in weeks`, url.toString());
};
export const init = () => {
  const params = new URLSearchParams(location.search);
  const bdate = new Date(params.get('birthday').parseDate('yyyymmdd'));
  setBirthday(bdate);
  setName(params.get('name'));
  setWeeks(JSON.parse(params.get('weeks') || '[]'));
}