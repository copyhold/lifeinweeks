import React, {useEffect} from 'react';
import styled from 'styled-components';
import { Weeks } from './components/Weeks';
import { EditWeek } from './components/EditWeek';
import { Header } from './components/Header';
import { colors } from './theme';

const StyledApp = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1lh;
  padding: 1lh;
  background-color: ${colors.body};
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
