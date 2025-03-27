import { StateStorage, createJSONStorage } from 'zustand/middleware'
import {hydrateUrlToState} from '../utils/hydrateState';

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

const parseDate = (dateStr: string): Date => {
  const year = parseInt(dateStr.substring(0, 4));
  const month = parseInt(dateStr.substring(4, 6)) - 1;
  const day = parseInt(dateStr.substring(6, 8));
  return new Date(year, month, day);
};

export const persistentStorage: StateStorage = {
  getItem: (key): string | null => {
    const searchParams = new URLSearchParams(window.location.search)
    const storedValue = searchParams.get(key);
    if (!storedValue) return null;
    try {
      const newValue = hydrateUrlToState(storedValue);
      return JSON.stringify(newValue);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    const newValue = JSON.parse(value);
    newValue.state.birthday = formatDate(new Date(newValue.state.birthday));
    newValue.state.events = newValue.state.events.map((event: any) => ({
      ...event,
      start: formatDate(new Date(event.start)),
      end: formatDate(new Date(event.end))
    }));
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, JSON.stringify(newValue))
    window.history.replaceState(null, '', `?${searchParams.toString()}`)
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.delete(key)
    window.location.search = searchParams.toString()
  },
}

export const urlStorageOptions = {
  name: 'life',
  storage: createJSONStorage(() => persistentStorage),
}