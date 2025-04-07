import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Weeks } from './components/Weeks';
import { EditWeek } from './components/EditWeek';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { colors } from './theme';
import { useFirebaseStore } from './services/firebase.storage.service';
import { useRedirectFromSlug } from './services/redirect-from-slug.hook';
import { useThemeSwitcher } from './hooks/useThemeSwitcher';

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
  useThemeSwitcher();
  const { tryToAuth } = useFirebaseStore();
  useRedirectFromSlug();

  useEffect(() => {
    tryToAuth();
  }, [tryToAuth]);

  return (
    <StyledApp>
      <EditWeek />
      <Header />
      <Weeks />
      <Footer />
    </StyledApp>
  );
}

export default App;
