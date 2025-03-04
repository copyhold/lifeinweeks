import React, {useMemo} from 'react'
import styled, {css} from 'styled-components';
import { useAppStore, useEditWeekStore } from '../services/state.zus';

const StyledWeek = styled.button<{$isCurrent: boolean, $isEditing: boolean}>`
  padding: 0;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #ccc;
  height: 1.2lh;
  flex-basis: 1.2lh;
  ${(props) => props.$isEditing && css`
    background-color: lightblue;  
  `
  }
  ${(props) => props.$isCurrent && css`
    background-color: yellow;  
  `
  }
  p {
  margin: 0;
  padding-inline: 0.5em;
  font-size: 0.8rem;
  white-space: nowrap;
  }
`;
const Events: React.FC<{events: TEvent[]}> = ({events}) => {
  const note = events.map(event => event.note).filter(Boolean).join(', ');
  return (
      <p>{note}</p>
    )
}
export const Week: React.FC<{week: WeekOfTheYear }> = ({week}) => {
  const {editWeek, setEditWeek} = useEditWeekStore();
  const {isCurrentWeek} = useAppStore();
  const isCurrentlyEdited = useMemo(() => {
    return editWeek?.start.getTime() === week.start.getTime();
  }, [editWeek, week]);
  const handleSelectWeek = ({target}) => {
    setEditWeek(week);
    const weekCell = target.closest('button');
    const {x,y} = weekCell.getBoundingClientRect();
    document.body.style.setProperty('--editing-week-x', `${x}px`);
    document.body.style.setProperty('--editing-week-y', `${y}px`);
  }

  return (
        <StyledWeek $isEditing={isCurrentlyEdited} onClick={handleSelectWeek} title={week.start.format('yyyy/mm/dd')} $isCurrent={isCurrentWeek(week)}>
          {
            week.events && <Events events={week.events} />
          }
        </StyledWeek>
  );
};