import React from 'react'
import styled, {css} from 'styled-components';
import { isCurrentWeek, setEditWeek } from '../services/state';

const StyledWeek = styled.button<{$isCurrent: boolean}>`
  padding: 0;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #ccc;
  height: 1.2lh;
  flex-basis: 1.2lh;
  ${(props) => props.$isCurrent && css`
    background-color: yellow;  
  `
  }
`;
export const Week: React.FC<{week: TWeekOfTheYear }> = ({week}) => {
  const handleSelectWeek = () => {
    setEditWeek(week);
  }
  return (
        <StyledWeek onClick={handleSelectWeek} title={week.start.format('yyyy/mm/dd')} $isCurrent={isCurrentWeek(week)}>
          {
            week.notes && <p>{week.notes[0].note}</p>
          }
        </StyledWeek>
  );
};