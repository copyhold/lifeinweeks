import React from 'react';
import {useStore} from '../services/state.zus';


export const Header: React.FC = () => {
  const {name, setName} = useStore();
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