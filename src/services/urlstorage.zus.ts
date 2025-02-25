import { StateStorage, createJSONStorage } from 'zustand/middleware'

const dateFormat = 'yyyymmdd';
export const persistentStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(window.location.search)
    const storedValue = searchParams.get(key);
    let newValue = JSON.parse(storedValue as string);
    if (typeof newValue === 'string') newValue = JSON.parse(newValue);
    try {
      newValue.state.birthday = newValue.state.birthday.parseDate(dateFormat);
      newValue.state.events.forEach(event => {
        event.start = event.start.parseDate(dateFormat)
        event.end = event.end.parseDate(dateFormat)
      })
      return JSON.stringify(newValue);
    } catch (e) {
      console.log(e, newValue);
    }
  },
  setItem: (key: string, value: string): void => {
    const newValue = JSON.parse(value);
    newValue.state.birthday = new Date(newValue.state.birthday).format(dateFormat);
    newValue.state.events = newValue.state.events.map((event) => {
      event.start = new Date(event.start).format(dateFormat);
      event.end = new Date(event.end).format(dateFormat);
      return event;
    });
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, JSON.stringify(value))
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