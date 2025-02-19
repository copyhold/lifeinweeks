import React from 'react';
import {createEffect, onMount} from 'solid-js';
import styled from 'styled-components';
import {name, editWeek} from './services/state';
import {Weeks} from './components/Weeks';
import { EditWeek } from './components/EditWeek';
import { persist, init } from './services/urlstorage.service';

const StyledApp = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1lh;
  padding: 1lh;
  background-color: #f0f0f3;
  header {
    background-color: #fff;
    font-size: 1.5em;
    text-align: center;
    border-radius: .5rem;
    padding: 1rem;
  }
`;
function App() {
  onMount(() => {
    console.log('%c [  ]-26', 'font-size:13px; background:pink; color:#bf2c9f;', 'calling init')
    init();
  }); 
  createEffect(() => {
    console.log('%c [  ]-29', 'font-size:13px; background:pink; color:#bf2c9f;', 'persist call')
    persist();
  });
  return (
  <StyledApp>
    {editWeek()}
    <EditWeek />
    <header>{name()}</header>
    <Weeks />
  </StyledApp>
  )
}

export default App
