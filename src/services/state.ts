import {createSignal, createMemo} from 'solid-js';
import {TWeek, IStorage} from '../types';

const life_length = 100;
export const weekInMs = 7 * 24 * 60 * 60 * 1000;
export const [birthday, setBirthday] = createSignal<Date>(new Date('1990-01-01'));
export const [name, setName] = createSignal<string>('Ilya');
export const [weeks, setWeeks] = createSignal<TWeek[]>([]);
export const findWeekIndex = (start: Date) => weeks().findIndex((week) => week.start > start && week.start.getTime() + weekInMs < start.getTime());
export const allWeeks = createMemo(() => {
  const start = new Date(birthday());
  const endOfLife = new Date(start).setFullYear(start.getFullYear() + life_length);
  const weeksOfTheYear = [];
  while (start < endOfLife) {
    const end = new Date(start).setDate(start.getDate() + 7);
    const weekIndex = findWeekIndex(start);
    weeksOfTheYear.push({
      start: new Date(start),
      end,
      notes: weekIndex > -1 && weeks()[weekIndex],
    })
    start.setDate(start.getDate() + 7);
  }
  return weeksOfTheYear;
});