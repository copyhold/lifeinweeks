import {createStore, create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { urlStorageOptions, persistentStorage } from './urlstorage.zus';
import { TWeek, TEvent } from '../types';

export const life_length = 1;
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

export const editWeekStore = create<{
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
    return events.findIndex((event: TEvent) => event.start >= start && event.end <= end);
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
  setWeek: (updatedWeek) => {
    const { findWeekIndex, events, setEvents } = get();
    const weekIndex = findWeekIndex(updatedWeek.start);
    const currentEvents = events;
    
    if (weekIndex > -1) {
      const newEvents = [...currentEvents];
      newEvents[weekIndex] = updatedWeek;
      setEvents(newEvents);
    } else {
      setEvents([...currentEvents, updatedWeek]);
    }
  },
});

const getUrlSearch = () => {
  return window.location.search.slice(1)
}

export const appStore = create<State>(persist<State>(stateCreatorFn, urlStorageOptions));