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
  setEvent: (updatedWeek: TEvent) => void;
  allWeeks: () => TWeek[];
  cleanWeek: (week: TWeek) => void;
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
  life: () => {
    const {name, birthday, events} = get();
    return {
      name,
      birthday,
      events,
    }
  },
  setBirthday: (birthday: Date) => set({ birthday }),
  setName: (name: string) => set({ name }),
  setEvents: (events: TEvent[]) => set({ events }),
  findWeekIndex: (start: Date) => {
    const {events} = get();
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return events.findIndex((event: TEvent) => start <= new Date(event.start) && end > new Date(event.start));
  },
  getEventsForWeek: (start: Date) => {
    const {events} = get();
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return events.filter((event: TEvent) => start <= new Date(event.start) && end > new Date(event.start));
  },
  getEventsOffWeek: (start: Date) => {
    const {events} = get();
    const end = new Date(start);
    end.setDate(start.getimport {createStore, create} from 'zustand';
    import { persist, createJSONStorage } from 'zustand/middleware'
    import { urlStorageOptions, persistentStorage } from './urlstorage.zus';
    import { TWeek, TEvent } from '../types';
    
    export const life_length = 100;
    export const weekInMs = 7 * 24 * 60 * 60 * 1000;
    
    export type TSharedLifeRange = {
      managerUid: string;
      startWeek: Date;
      endWeek: Date;
      accepted: boolean;
      linkId: string;
      ownerUid: string;
      slug: string;
    };
    
    interface State {
      birthday: Date;
      name: string;
      events: TEvent[];
      sharedLifeRanges: TSharedLifeRange[]; // New
      setBirthday: (date: Date) => void;
      setName: (name: string) => void;
      setEvents: (events: TEvent[]) => void;
      findWeekIndex: (start: Date) => number;
      yearsSinceBirth: (date: Date) => number;
      isFirstWeekOfDecade: (week: TWeek) => boolean;
      isCurrentWeek: (week: TWeek) => boolean;
      setEvent: (updatedWeek: TEvent) => void;
      allWeeks: () => TWeek[];
      cleanWeek: (week: TWeek) => void;
      addSharedLifeRange: (range: TSharedLifeRange) => void; // New
      removeSharedLifeRange: (linkId: string) => void; // New
      getSharedLifeRanges: () => TSharedLifeRange[]; // New
      isWeekInSharedRange: (week: TWeek) => boolean; // New
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
      sharedLifeRanges: [], // New
      life: () => {
        const {name, birthday, events} = get();
        return {
          name,
          birthday,
          events,
        }
      },
      setBirthday: (birthday: Date) => set({ birthday }),
      setName: (name: string) => set({ name }),
      setEvents: (events: TEvent[]) => set({ events }),
      findWeekIndex: (start: Date) => {
        const {events} = get();
        const end = new Date(start);
        end.setDate(start.getDate() + 7);
        return events.findIndex((event: TEvent) => start <= new Date(event.start) && end > new Date(event.start));
      },
      getEventsForWeek: (start: Date) => {
        const {events, sharedLifeRanges} = get();
        const end = new Date(start);
        end.setDate(start.getDate() + 7);
        const weekEvents = events.filter((event: TEvent) => start <= new Date(event.start) && end > new Date(event.start));
        const sharedEvents = sharedLifeRanges.flatMap(range => {
          if (start >= range.startWeek && start < range.endWeek) {
            return events.filter((event: TEvent) => start <= new Date(event.start) && end > new Date(event.start));
          }
          return [];
        });
        return [...weekEvents, ...sharedEvents];
      },
      getEventsOffWeek: (start: Date) => {
        const {events} = get();
        const end = new Date(start);
        end.setDate(start.getDate() + 7);
        return events.filter((event: TEvent) => !(start <= new Date(event.start) && end > new Date(event.start)));
      },
      yearsSinceBirth: (date) => {
        const birthday = new Date(get().birthday);
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
      setEvent: (event) => {
        const { events, setEvents, sharedLifeRanges } = get();
        const isShared = sharedLifeRanges.some(range => event.start >= range.startWeek && event.start <= range.endWeek);
        if (isShared) {
          // Handle shared event logic (e.g., save to a different collection)
          setEvents([...events, event]);
        } else {
          setEvents([...events, event]);
        }
      },
      allWeeks: () => {
        const { birthday, getEventsForWeek, sharedLifeRanges } = get();
        const weeksOfTheYear: WeekOfTheYear[] = [];
        const start = new Date(birthday);
        const endOfLife = new Date(start);
        endOfLife.setFullYear(start.getFullYear() + life_length);
        while (start < endOfLife) {
          const end = new Date(start);
          end.setDate(start.getDate() + 7);
          const events = getEventsForWeek(start);
          weeksOfTheYear.push({
            start: new Date(start),
            end,
            events,
          });
          start.setDate(start.getDate() + 7);
        }
        return weeksOfTheYear;
      },
      cleanWeek: week => {
        const {setEvents, getEventsOffWeek, sharedLifeRanges} = get();
        const isShared = sharedLifeRanges.some(range => week.start >= range.startWeek && week.start <= range.endWeek);
        if (isShared) {
          // Handle shared event logic (e.g., remove from a different collection)
          setEvents(getEventsOffWeek(week.start));
        } else {
          setEvents(getEventsOffWeek(week.start));
        }
      },
      addSharedLifeRange: (range) => {
        set((state) => ({ sharedLifeRanges: [...state.sharedLifeRanges, range] }));
      },
      removeSharedLifeRange: (linkId) => {
        set((state) => ({
          sharedLifeRanges: state.sharedLifeRanges.filter((range) => range.linkId !== linkId),
        }));
      },
      getSharedLifeRanges: () => {
        return get().sharedLifeRanges;
      },
      isWeekInSharedRange: (week) => {
        const { sharedLifeRanges } = get();
        return sharedLifeRanges.some(
          (range) => week.start >= range.startWeek && week.start <= range.endWeek
        );
      },
    });
    
    export const useAppStore = create<State>(persist<State>(stateCreatorFn, urlStorageOptions));
    Date() + 7);
    return events.filter((event: TEvent) => !(start <= new Date(event.start) && end > new Date(event.start)));
  },
  yearsSinceBirth: (date) => {
    const birthday = new Date(get().birthday);
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
  setEvent: (event) => {
    const { events, setEvents } = get();
    setEvents([...events, event]);
  },
  allWeeks: () => {
    const { birthday, getEventsForWeek } = get();
    const weeksOfTheYear: WeekOfTheYear[] = [];
    const start = new Date(birthday);
    const endOfLife = new Date(start);
    endOfLife.setFullYear(start.getFullYear() + life_length);
    while (start < endOfLife) {
      const end = new Date(start);
      end.setDate(start.getDate() + 7);
      const events = getEventsForWeek(start);
      weeksOfTheYear.push({
        start: new Date(start),
        end,
        events,
      });
      start.setDate(start.getDate() + 7);
    }
    return weeksOfTheYear;
  },
  cleanWeek: week => {
    const {setEvents, getEventsOffWeek} = get();
    setEvents(getEventsOffWeek(week.start)); 
  }
});

export const useAppStore = create<State>(persist<State>(stateCreatorFn, urlStorageOptions));