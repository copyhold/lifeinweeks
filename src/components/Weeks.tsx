import React from 'react';
import styled from 'styled-components';
import {Week} from './Week';
import {DecatesSeparator} from './DecatesSeparator';
import { useStore } from '../services/state.zus';

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
  const allWeeks = useStore((state) => state.allWeeks);
  const isFirstWeekOfDecade = useStore((state) => state.isFirstWeekOfDecade);
  return (
    <StyledWeeks>
      {allWeeks().map((week) => (
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