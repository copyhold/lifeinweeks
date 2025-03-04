import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useAppStore, useEditWeekStore } from '../services/state.zus';

const StyledEditWeek = styled.dialog`
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
    setEvent({start, end, note});
    setEditWeek(null);
  }
  useEffect(() => {
    if (editWeek) {
      setNote(editWeek.notes?.[0]?.note || '');
    }
  }, [editWeek])
  return (
    <StyledEditWeek open={!!editWeek}>
      <textarea value={note} onChange={e => setNote(e.target.value)} onBlur={handleUpdate} />
    </StyledEditWeek>
  );
}