import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppStore } from '../services/state.zus';
import { colors } from '../theme';
import { EventsList } from './EventsList';
import { Menu } from './Menu';

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
`;

const Space = styled.div`
  flex-grow: 1;
`;

const ListViewButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  padding: 0;
  cursor: pointer;
  &::before {
    content: '📋';
  }
`;

const Name = () => {
  const { name, setName } = useAppStore();
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  return (
    <>
      {editing ? (
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          onBlur={() => {
            setName(newName);
            setEditing(false);
          }}
          autoFocus
        />
      ) : (
        <span onClick={() => setEditing(true)}>{name}</span>
      )}
    </>
  );
};

export const Header: React.FC = () => {
  const [showEventsList, setShowEventsList] = useState(false);

  const toggleEventsList = () => {
    setShowEventsList(!showEventsList);
  };

  return (
    <>
      <StyledHeader>
        <Name />
        <Space />
        <ListViewButton onClick={toggleEventsList} title="View Events List" />
        <Menu />
      </StyledHeader>
      {showEventsList && <EventsList />}
    </>
  );
};
