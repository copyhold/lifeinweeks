import React, {useEffect} from 'react';
import styled from 'styled-components';
import { Weeks } from './components/Weeks';
import { EditWeek } from './components/EditWeek';
import { Header } from './components/Header';

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
  @media (max-width: 599px) {
    padding: 5px;
  }
`;
function App() {
  return (
  <StyledApp>
    <EditWeek />
    <Header />
    <Weeks />
  </StyledApp>
  )
}

export default App
