import React from 'react';
import styled from 'styled-components';
import { editWeek, setEditWeek } from '../services/state';
const StyledEditWeek = styled.dialog`
textarea {
  resize: none;
  height: 4lh;
  width: 10em;
  padding: 0.5em;
}
`;
export const EditWeek: React.FC = ()=> {
  const [note, setNote] = React.useState('');
  const handleUpdate = () => {
    setWeek({...week, notes: [{note}]});
    setEditWeek(null);
  }
  // createEffect(() => {
  //   if (editWeek()) {
  //     setNote(editWeek().notes?.[0]?.note || '');
  //   }
  // });
  return (
    <StyledEditWeek open>
      <textarea value={editWeek()?.start} onChange={e => setNote(e.target.value)} onBlur={handleUpdate} />
    </StyledEditWeek>
  );
}