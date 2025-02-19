import {create} from 'zustand';
import { persist } from 'zustand/middleware'
import { urlStorageOptions } from './urlstorage.zus';
import { TWeek, TEvent } from '../types';

const life_length = 100;
export const weekInMs = 7 * 24 * 60 * 60 * 1000;

interface State {
  birthday: Date;
  name: string;
  events: TEvent[];
  setBirthday: (date: Date) => void;
  setName: (name: string) => void;
  setEvents: (events: TEvent[]) => void;
  findWeekIndex: (start: Date) => number;
  allWeeks: () => WeekOfTheYear[];
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
export const useStore = create<State>(persist((set, get) => ({
  birthday: new Date('1972-08-07'),
  name: 'Ilya',
  events: [],
  setBirthday: (date) => set({ birthday: date }),
  setName: (name) => set({ name }),
  setEvents: (events) => set({ events }),
  findWeekIndex: (start) => {
    const events = get().events;
    return events.findIndex((week) => week.start > start && week.start.getTime() + weekInMs < start.getTime());
  },
  allWeeks: () => {
    const { birthday, events, findWeekIndex } = get();
    const start = new Date(birthday);
    console.log('%c [ start ]-45', 'font-size:13px; background:pink; color:#bf2c9f;', start)
    const endOfLife = new Date(start);
    endOfLife.setFullYear(start.getFullYear() + life_length);
    const weeksOfTheYear: WeekOfTheYear[] = [];
    while (start < endOfLife) {
      const end = new Date(start);
      end.setDate(start.getDate() + 7);
      const weekIndex = findWeekIndex(start);
      weeksOfTheYear.push({
        start: new Date(start),
        end,
        events: weekIndex > -1 && events[weekIndex],
      });
      start.setDate(start.getDate() + 7);
    }
    return weeksOfTheYear;
  },
  yearsSinceBirth: (date) => {
    const birthday = get().birthday;
    const years = Math.floor((date.getTime() - birthday.getTime()) / 1000 / 60 / 60 / 24 / 365.25);
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
      // Update existing week
      const newEvents = [...currentEvents];
      newEvents[weekIndex] = updatedWeek;
      setEvents(newEvents);
    } else {
      // Add new week
      setEvents([...currentEvents, updatedWeek]);
    }
  },
}), urlStorageOptions));