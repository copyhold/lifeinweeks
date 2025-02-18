import React from 'react';
import styled from 'styled-components';
import {Week} from './Week';
import {DecatesSeparator} from './DecatesSeparator';
import { allWeeks, isFirstWeekOfDecade } from '../services/state';

const StyledWeeks = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-start;
`;
export const Weeks: React.FC = () => {
  return (
    <StyledWeeks>
      {allWeeks().map((week) => (
        <>
        {
          isFirstWeekOfDecade(week) && <DecatesSeparator week={week} />
        }
        <Week week={week} key={week.start.getTime()} />
        </>
      ))}
    </StyledWeeks>
  )
}