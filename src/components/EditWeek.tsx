import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useAppStore, useEditWeekStore } from '../services/state.zus';

const StyledEditWeek = styled.dialog`
top: 0;
left: 0;
margin: 0;
translate: var(--editing-week-x) var(--editing-week-y);
border-radius: 4px;
border: none;
box-shadow: 3px 3px 5px -2px rgba(0,0,0,.9), 0 0 150px 0px rgba(0,0,0,.2);
textarea {
  resize: none;
  height: 4lh;
  width: 10em;
  padding: 0.5em;
}
`;
export const EditWeek: React.FC = ()=> {
  const {setEvent} = useAppStore();
  const {editWeek, setEditWeek} = useEditWeekStore();
  const [note, setNote] = React.useState('');
  const handleUpdate = () => {
    const {start, end} = editWeek;
    setEditWeek(null);
    if (!note) return;
    setEvent({start, end, note});
  }
  useEffect(() => {
    const handleEscButton = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEditWeek(null);
      }
    }
    document.body.addEventListener( 'keydown', handleEscButton );
    return () => document.body.removeEventListener( 'keydown', handleEscButton )
  }, []);
  useEffect(() => {
    if (editWeek) {
      setNote(editWeek.events[0]?.note || '');
    }
  }, [editWeek])
  return (Boolean(editWeek) &&
    <StyledEditWeek open>
      <textarea autoFocus value={note} onChange={e => setNote(e.target.value)} onBlur={handleUpdate} />
    </StyledEditWeek>
  );
}