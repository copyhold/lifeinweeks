import React from 'react'
import styled, {css} from 'styled-components';
import { appStore, editWeekStore } from '../services/state.zus';

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
  p {
  margin: 0;
  padding-inline: 0.5em;
  font-size: 0.8rem;
  }
`;
const Events: React.FC<{events: TEvent[]}> = ({events}) => {
  return (
    events.map((event) => (
      <p key={event.start.getTime()}>{event.note}</p>
    ))
  )
}
export const Week: React.FC<{week: WeekOfTheYear }> = ({week}) => {
  const setEditWeek = editWeekStore((state) => state.setEditWeek);
  const isCurrentWeek = appStore((state) => state.isCurrentWeek);
  const handleSelectWeek = () => {
    setEditWeek(week);
  }

  return (
        <StyledWeek onClick={handleSelectWeek} title={week.start.format('yyyy/mm/dd')} $isCurrent={isCurrentWeek(week)}>
          {
            week.events && <Events events={week.events} />
          }
        </StyledWeek>
  );
};