import React, {useMemo} from 'react';
import { useStore } from 'zustand';
import styled from 'styled-components';
import {Week} from './Week';
import {DecatesSeparator} from './DecatesSeparator';
import { appStore, life_length } from '../services/state.zus';

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
  const { birthday, events, findWeekIndex, isFirstWeekOfDecade } = appStore();
  const allWeeks = useMemo(() => {
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