import {createStore, create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { urlStorageOptions, persistentStorage } from './urlstorage.zus';
import { TWeek, TEvent } from '../types';

export const life_length = 100;
export const weekInMs = 7 * 24 * 60 * 60 * 1000;

interface State {
  birthday: Date;
  name: string;
  events: TEvent[];
  setBirthday: (date: Date) => void;
  setName: (name: string) => void;
  setEvents: (events: TEvent[]) => void;
  findWeekIndex: (start: Date) => number;
  yearsSinceBirth: (date: Date) => number;
  isFirstWeekOfDecade: (week: TWeek) => boolean;
  isCurrentWeek: (week: TWeek) => boolean;
  setWeek: (updatedWeek: TWeek) => void;
}

export const useEditWeekStore = create<{
  editWeek: TWeek | null;
  setEditWeek: (week: TWeek | null) => void;
}>((set, get) => ({
  editWeek: null,
  setEditWeek: (week) => set({ editWeek: week }),
}));

const stateCreatorFn = (set, get) => ({
  birthday: new Date('1972-08-07'),
  name: 'Ilya',
  events: [],
  setBirthday: (birthday) => set({ birthday }),
  setName: (name) => set({ name }),
  setEvents: (events) => set({ events }),
  findWeekIndex: (start: Date) => {
    const {events} = get();
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return events.findIndex((event: TEvent) => start <= new Date(event.start) && end > new Date(event.start));
  },
  yearsSinceBirth: (date) => {
    const birthday = get().birthday;
    const years = Math.floor((date.getTime() - new Date(birthday).getTime()) / 1000 / 60 / 60 / 24 / 365.25);
    return years;
  },
  isFirstWeekOfDecade: (week) => {
    const yearsSinceBirth = get().yearsSinceBirth;
    const prevWeek = new Date(week.start);
    prevWeek.setDate(week.start.getDate() - 7);
    return yearsSinceBirth(week.start) % 10 === 0 && yearsSinceBirth(prevWeek) % 10 !== 0;
  },
  isCurrentWeek: (week) => {
    const now = new Date();
    return week.start < now && week.end > now;
  },
  setEvent: (event) => {
    const { events, setEvents } = get();
    setEvents([...events, event]);
  },
});

const getUrlSearch = () => {
  return window.location.search.slice(1)
}

export const useAppStore = create<State>(persist<State>(stateCreatorFn, urlStorageOptions));