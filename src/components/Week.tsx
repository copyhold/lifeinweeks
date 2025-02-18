import React from 'react'
import styled, {css} from 'styled-components';
import { isCurrentWeek, yearsSinceBirth } from '../services/state';

const StyledWeek = styled.div<{isCurrent: boolean}>`
  border-radius: 2px;
  border: 1px solid #ccc;
  height: 1.2lh;
  flex-basis: 1.2lh;
  ${(props) => props.isCurrent && css`
    background-color: yellow;  
  `
  }
`;
export const Week: React.FC<{week: TWeekOfTheYear }> = ({week}) => {
  return (
        <StyledWeek title={week.start} isCurrent={isCurrentWeek(week)}>
          {
            week.notes && <p>{week.notes[0].note}</p>
          }
        </StyledWeek>
  );
};