import React from 'react';
import {useAppStore} from '../services/state.zus';


export const Header: React.FC = () => {
  const {name, setName} = useAppStore();
  const [editing, setEditing] = React.useState(false);
  const [newName, setNewName] = React.useState(name);
  return (
    <header>
      {
      editing 
      ? <input value={newName} onChange={e => setNewName(e.target.value)} onBlur={() => {setName(newName); setEditing(false)}} /> 
      : <span onClick={() => setEditing(true)}>{name}</span>
      }
    </header>
  );
}