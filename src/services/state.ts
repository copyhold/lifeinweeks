import {createSignal, createMemo} from 'solid-js';
import {TWeek} from '../types';

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
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
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

export const yearsSinceBirth = (date: Date) => {
  const years = Math.floor((date.getTime() - birthday().getTime()) / 1000 / 60 / 60 / 24 / 365.25);
  return years;
}

export const isFirstWeekOfDecade = (week: TWeek) => {
  const prevWeek = new Date(week.start);
  prevWeek.setDate(week.start.getDate() - 7);
  return yearsSinceBirth(week.start) % 10 === 0 && yearsSinceBirth(prevWeek) % 10 !== 0;
}


export const isCurrentWeek = (week: TWeek) => {
  const now = new Date();
  return week.start < now && week.end > now;
}