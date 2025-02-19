import React from 'react'
import styled, {css} from 'styled-components';
import { useStore, useEditWeekStore } from '../services/state.zus';

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
export const Week: React.FC<{week: WeekOfTheYear }> = ({week}) => {
  const setEditWeek = useEditWeekStore((state) => state.setEditWeek);
  const isCurrentWeek = useStore((state) => state.isCurrentWeek);
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