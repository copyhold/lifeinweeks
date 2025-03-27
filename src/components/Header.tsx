import React, {useEffect} from 'react';
import styled, {css} from 'styled-components';
import {useAppStore} from '../services/state.zus';
import {colors} from '../theme';
import { useFirebaseStore } from '../services/firebase.storage.service.ts';

const StyledHeader = styled.header`
  background-color: ${colors.background};
  font-size: 1.5em;
  text-align: center;
  border-radius: .5rem;
  padding: 1rem;
  display: flex;
  gap: 1em;
  justify-content: space-between;
  align-items: center;
  time {
  font-size: 1rem;
  }
`

const Birthday = () => {
  const {birthday, setBirthday} = useAppStore();
  const [editing, setEditing] = React.useState(false);
  const formattedDate = new Intl.DateTimeFormat().format(new Date(birthday));
  const inputValue = new Intl.DateTimeFormat('en-CA').format(new Date(birthday));
  const handleUpdateBirthday = (e: React.BlurEvent<HTMLInputElement>) => {
    if (!confirm('Are you sure you want to change your birthday?')) {
      setEditing(false);
    }
    setBirthday(new Date(e.target.value));
    setEditing(false);
  }
  return <>{
  editing 
  ? <input onBlur={handleUpdateBirthday} defaultValue={inputValue} type={'date'} /> 
  : <time onClick={() => setEditing(true)}>{formattedDate}</time>
  }
  </>
}
const Name = () => {
  const {name, setName} = useAppStore();
  const {authWithGoogle, user} = useFirebaseStore();
  const [editing, setEditing] = React.useState(false);
  const [newName, setNewName] = React.useState(name);
  useEffect(() => {
    if (!user || name) return;
    setName(user.displayName);
  }, [user]);
  return <>{
  editing 
  ? <input value={newName} onChange={e => setNewName(e.target.value)} onBlur={() => {setName(newName); setEditing(false)}} /> 
  : <span onClick={() => setEditing(true)}>{name}</span>
  }
  </>
}

const SaveLife = () => {
  const {saveLife} = useFirebaseStore();
  const {life} = useAppStore();
  const handleSaveLife = async () => {
    let slug = window.location.pathname.slice(1);
    slug = prompt('Are you sure you want to save your life?', slug);
    if (!slug) return;
    await saveLife(life(), slug);
  }
  return <button onClick={handleSaveLife}>Save</button>
}

export const Header: React.FC = () => {
  const {authWithGoogle, user} = useFirebaseStore();
  return (
    <StyledHeader>
    <Name />
    {!user && <button onClick={authWithGoogle}>auth</button>}
    <Birthday />
    <SaveLife />
    </StyledHeader>
  );
}