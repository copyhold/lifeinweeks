import React, {useMemo} from 'react'
import styled, {css} from 'styled-components';
import { useAppStore, useEditWeekStore } from '../services/state.zus';
import { colors } from '../theme';

type WeekStatus = 'current' | 'past' | 'future' 
const StyledWeek = styled.label<{$weekStatus: WeekStatus, $isEditing: boolean}>`
  padding: 0;
  background-color: color(from ${colors.background} xyz calc(x + 0.1) calc(y + 0.1) calc(z + 0.1));
  border-radius: 2px;
  border: 1px solid ${colors.border};
  height: 1.2lh;
  line-height: 1.0;
  display: flex;
  align-items: center;
  flex-basis: 1.2lh;
  ${(props) => props.$isEditing && css`
    background-color: ${colors.current};
  `
  }
  ${(props) => props.$weekStatus === 'future' && css`
    background-color: ${colors.empathize};
    border-color: ${colors.empathize};
  `
  }
  ${(props) => props.$weekStatus === 'current' && css`
    background-color: light-dark(lightgreen, lightcoral);  
  `
  }
  p {
  margin: 0;
  padding-inline: 0.5em;
  font-size: 0.8rem;
  white-space: nowrap;
  }
  @media (max-width: 599px) {
    height: 1.5lh;
    flex-basis: 1.5lh;
  }
`;
const isBeforeCurrentWeek = (week: WeekOfTheYear) => {
  const now = new Date();
  return week.start < now;
}
const Events: React.FC<{events: TEvent[]}> = ({events}) => {
  const note = events.map(event => event.note).filter(Boolean).join(', ');
  return (
      <p>{note}</p>
    )
}
export const Week: React.FC<{week: WeekOfTheYear }> = ({week}) => {
  const {editWeek, setEditWeek} = useEditWeekStore();
  const {isCurrentWeek, cleanWeek, birthday} = useAppStore();
  const isCurrentlyEdited = useMemo(() => {
    return editWeek?.start.getTime() === week.start.getTime();
  }, [editWeek, week]);
  const handleSelectWeek = (event: React.MouseEvent<HTMLLabelElement>) => {
    if (event.metaKey) {
      cleanWeek(week);
      return;
    }
    const {target} = event;
    setEditWeek(week);
    const weekCell = target.closest('label');
    document.body.style.setProperty('--editing-week-x', `${weekCell.offsetLeft}px`);
    document.body.style.setProperty('--editing-week-y', `${weekCell.offsetTop}px`);
  }

  const weekStatus = isCurrentWeek(week) ? 'current' : isBeforeCurrentWeek(week) ? 'past' : 'future';

  return (
        <StyledWeek $weekStatus={weekStatus} $isEditing={isCurrentlyEdited} onClick={handleSelectWeek} title={week.start.format('yyyy/mm/dd')}>
          {
            week.events && <Events events={week.events} />
          }
        </StyledWeek>
  );
};