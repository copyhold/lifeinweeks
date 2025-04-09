import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Weeks } from './components/Weeks';
import { EditWeek } from './components/EditWeek';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { colors } from './theme';
import { useFirebaseStore } from './services/firebase.storage.service';
import { useThemeSwitcher } from './hooks/useThemeSwitcher';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShareAccept } from './components/ShareAccept';
import { ShareLinkGenerator } from './components/ShareLinkGenerator';
import { ShareManager } from './components/ShareManager';
import RedirectFromSlug from './components/RedirectFromSlug'; // Import the new component

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

  useEffect(() => {
    tryToAuth();
  }, [tryToAuth]);

  return (
    <BrowserRouter>
      <StyledApp>
        <EditWeek />
        <Header />
        <Routes>
          <Route path="/" element={<Weeks />} />
          <Route path="/share/:linkId" element={<ShareAccept />} />
          <Route path="/share" element={<ShareLinkGenerator />} />
          <Route path="/manage" element={<ShareManager />} />
          <Route path="/:slug" element={<RedirectFromSlug />} /> {/* Add dynamic route */}
        </Routes>
        <Footer />
      </StyledApp>
    </BrowserRouter>
  );
}

export default App;