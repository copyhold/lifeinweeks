import React, {useCallback, useMemo} from 'react';
import { useStore } from 'zustand';
import styled from 'styled-components';
import {Week} from './Week';
import {DecatesSeparator} from './DecatesSeparator';
import { useAppStore, life_length } from '../services/state.zus';

const StyledWeeks = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-start;
  padding: 1rem;
  background: #fff;
  border-radius: .5rem;
`;
export const Weeks: React.FC = () => {
  const { findWeekIndex, birthday, events, isFirstWeekOfDecade } = useAppStore();

  const allWeeks = useMemo(() => {
  console.log('%c [ events ]-19', 'font-size:13px; background:pink; color:#bf2c9f;', events)
    const weeksOfTheYear: WeekOfTheYear[] = [];
    const start = new Date(birthday);
    const endOfLife = new Date(start);
    endOfLife.setFullYear(start.getFullYear() + life_length);
    while (start < endOfLife) {
      const end = new Date(start);
      end.setDate(start.getDate() + 7);
      const weekIndex = findWeekIndex(start);
      weeksOfTheYear.push({
        start: new Date(start),
        end,
        events: weekIndex > -1 && [events[weekIndex]],
      });
      start.setDate(start.getDate() + 7);
    }
    return weeksOfTheYear;
  }, [birthday, events,findWeekIndex])

  return (
    <StyledWeeks>
      {allWeeks.map((week) => (
        <React.Fragment key={week.start.getTime()}>
        {
          isFirstWeekOfDecade(week) && <DecatesSeparator week={week} />
        }
        <Week week={week} />
        </React.Fragment>
      ))}
    </StyledWeeks>
  )
}