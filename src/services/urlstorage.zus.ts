import { StateStorage, createJSONStorage } from 'zustand/middleware'

const dateFormat = 'yyyymmdd';
const persistentStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(window.location.search)
    const storedValue = searchParams.get(key) ?? '';
    const newValue = JSON.parse(storedValue)
    newValue.state.birthday = newValue.state.birthday.parseDate(dateFormat);
    newValue.state.events = newValue.state.events.map(event => {
      event.start = event.start.parseDate(dateFormat)
      event.end = event.end.parseDate(dateFormat)
      return event;
    })
    return newValue;
  },
  setItem: (key, newValue): void => {
    const searchParams = new URLSearchParams(window.location.search);
    const parsedValue = JSON.parse(newValue);
    parsedValue.state.birthday = new Date(parsedValue.state.birthday).format(dateFormat);
    parsedValue.state.events = parsedValue.state.events.map((event) => {
      event.start = new Date(event.start).format(dateFormat);
      event.end = new Date(event.end).format(dateFormat);
      return event;
    });
    searchParams.set(key, JSON.stringify(parsedValue))
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