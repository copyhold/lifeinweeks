import React, { useCallback, useMemo } from 'react';
import { useStore } from 'zustand';
import styled from 'styled-components';
import { Week } from './Week';
import { DecatesSeparator } from './DecatesSeparator';
import { useAppStore, life_length } from '../services/state.zus';
import { colors } from '../theme';
import { Minimap } from './Minimap';

const StyledWeeks = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-start;
  padding: 1rem;
  background: ${colors.background};
  border-radius: .5rem;
`;
export const Weeks: React.FC = () => {
  const { allWeeks, getEventsForWeek, birthday, isFirstWeekOfDecade } = useAppStore();
  return (
    <>
      <Minimap />
      <StyledWeeks>
        {allWeeks().map(week => (
          <React.Fragment key={week.start.getTime()}>
            {isFirstWeekOfDecade(week) && <DecatesSeparator week={week} />}
            <Week week={week} />
          </React.Fragment>
        ))}
      </StyledWeeks>
    </>
  );
};
