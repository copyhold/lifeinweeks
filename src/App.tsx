import React from 'react';
import {createEffect} from 'solid-js';
import styled from 'styled-components';
import {name, birthday, weeks} from './services/state';
import {Weeks} from './components/Weeks';
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
  createEffect(() => {
    init();
  }, []); 
  createEffect(() => {
    persist();
  }, [name, birthday, weeks]);
  return (
  <StyledApp>
    <header>{name()}</header>
    <Weeks />
  </StyledApp>
  )
}

export default App
