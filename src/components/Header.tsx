import React from 'react';
import styled, {css} from 'styled-components';
import {useAppStore} from '../services/state.zus';

const StyledHeader = styled.header`
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
  const [editing, setEditing] = React.useState(false);
  const [newName, setNewName] = React.useState(name);
  return <>{
  editing 
  ? <input value={newName} onChange={e => setNewName(e.target.value)} onBlur={() => {setName(newName); setEditing(false)}} /> 
  : <span onClick={() => setEditing(true)}>{name}</span>
  }
  </>
}

export const Header: React.FC = () => {
  return (
    <StyledHeader>
    <Name />
    <Birthday />
    </StyledHeader>
  );
}