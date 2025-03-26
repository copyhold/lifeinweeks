import React, {useEffect} from 'react';
import styled from 'styled-components';
import { Weeks } from './components/Weeks';
import { EditWeek } from './components/EditWeek';
import { Header } from './components/Header';
import { colors } from './theme';
import { useFirebaseStore } from './services/firebase.storage.service';
import { useRedirectFromSlug } from './services/redirect-from-slug.hook';
import { useUrlSync } from './hooks/useUrlSync';

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
  const {tryToAuth} = useFirebaseStore();
  const {live} = useRedirectFromSlug();


  useEffect(() => {
    tryToAuth();
  }, []);

  useEffect(() => {
    if (!live) {
      return;
    }
    const url = new URL(window.location.href);
    url.pathname = '/';
    url.searchParams.set('life', decodeURIComponent(live));
    window.history.replaceState({}, '', url);
  }, [live]);

  return (
    <StyledApp>
      <EditWeek />
      <Header />
      <Weeks />
    </StyledApp>
  );
}

export default App
