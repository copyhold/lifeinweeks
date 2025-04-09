import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useAppStore } from '../services/state.zus';
import { useFirebaseStore } from '../services/firebase.storage.service';
import { useThemeSwitcher, ThemeMode } from '../hooks/useThemeSwitcher'; // Import the hook and type
import { colors } from '../theme';

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  &::before {
    content: '☰';
  }
`;

const MenuDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${colors.background};
  border: 1px solid ${colors.border || '#ccc'};
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: calc(100vw - 60px);
  max-width: 500px;
  z-index: 100;
  display: ${props => (props.$isOpen ? 'block' : 'none')};
`;

const MenuItem = styled.div<{ $active?: boolean }>`
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  width: 100%;
  box-sizing: border-box;

  ${({ $active }) =>
    $active &&
    css`
      font-weight: bold; /* Highlight active item */
    `}

  &:hover {
    background-color: ${colors.border || '#eee'};
    border-radius: 0.25rem;
  }
`;

const MenuDivider = styled.hr`
  border: none;
  border-top: 1px solid ${colors.border || '#ccc'};
  margin: 0.5rem 0;
`;

const SaveButton = styled.span`
  &::before {
    content: '💾';
    margin-right: 0.5rem;
  }
`;

const AuthButton = styled.span`
  &::before {
    content: '🔑';
    margin-right: 0.5rem;
  }
`;

const BirthdayButton = styled.span`
  &::before {
    content: '🎂';
    margin-right: 0.5rem;
  }
`;

const ThemeButton = styled.span<{ type: ThemeMode }>`
  &::before {
    content: '${({ type }) => (type === 'light' ? '☀️' : type === 'dark' ? '🌙' : '💻')}';
    margin-right: 0.5rem;
  }
`;

const ShareButton = styled.span`
  &::before {
    content: '🔗';
    margin-right: 0.5rem;
  }
`;

export const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { themeMode, setThemeMode } = useThemeSwitcher(); // Use the theme hook
  const {
    birthday,
    setBirthday,
    // themeMode and setThemeMode are no longer needed from here
  } = useAppStore();

  const { authWithGoogle, user, saveLife } = useFirebaseStore();
  const { life } = useAppStore(); // Get the life data generation function

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdateBirthday = () => {
    const formattedDate = new Intl.DateTimeFormat('en-CA').format(new Date(birthday));
    const newDate = window.prompt('Enter your birthday:', formattedDate);

    if (!newDate) return;

    try {
      // Attempt to parse the date to ensure it's valid before confirming
      const parsedDate = new Date(newDate);
      if (isNaN(parsedDate.getTime())) {
        alert('Invalid date format. Please use YYYY-MM-DD.');
        return;
      }
      if (window.confirm('Are you sure you want to change your birthday?')) {
        setBirthday(parsedDate);
        setIsOpen(false); // Close menu after action
      }
    } catch (e) {
       alert('Invalid date format. Please use YYYY-MM-DD.');
    }
  };

  const handleSaveLife = async () => {
    let slug = window.location.pathname.slice(1);
    // Provide a default if the current slug is empty
    slug = window.prompt('Enter a name (slug) for your life:', slug || 'my-life') || '';

    if (!slug) return; // User cancelled or entered empty string

    // Basic slug validation (optional, adjust as needed)
    if (!/^[a-z0-9-]+$/.test(slug)) {
       alert('Invalid name. Please use only lowercase letters, numbers, and hyphens.');
       return;
    }

    try {
      await saveLife(life(), slug); // Pass the current life state object
      alert(`Life saved successfully with name: ${slug}`);
      // Optionally update the URL to reflect the saved slug if it's new
      if (window.location.pathname !== `/${slug}`) {
        window.history.pushState({}, '', `/${slug}`);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving life:", error);
      alert("Failed to save life. Please check the console for details.");
    }
  };

  const handleAuth = () => {
    authWithGoogle().catch(error => {
        console.error("Google Sign-In failed:", error);
        alert("Sign-in failed. Please try again or check the console.");
    });
    setIsOpen(false);
  };

  const handleSetTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
    // Keep menu open to see the change immediately
    // setIsOpen(false);
  };

  return (
    <MenuContainer ref={menuRef}>
      <MenuButton onClick={toggleMenu} title="Menu" />
      <MenuDropdown $isOpen={isOpen}>
        <MenuItem onClick={handleUpdateBirthday}>
          <BirthdayButton />
          Change Birthday
        </MenuItem>

        <MenuDivider />

        {/* Share Link Option */}
        <MenuItem as={Link} to="/share" onClick={() => setIsOpen(false)}>
          <ShareButton />
          Share
        </MenuItem>

        <MenuDivider />

        {/* Theme Switcher Options */}
        <MenuItem onClick={() => handleSetTheme('light')} $active={themeMode === 'light'}>
          <ThemeButton type="light" /> Light Theme
        </MenuItem>
        <MenuItem onClick={() => handleSetTheme('dark')} $active={themeMode === 'dark'}>
          <ThemeButton type="dark" /> Dark Theme
        </MenuItem>
        <MenuItem onClick={() => handleSetTheme('system')} $active={themeMode === 'system'}>
          <ThemeButton type="system" /> System Default
        </MenuItem>

        <MenuDivider />

        {/* Save Life Option */}
        <MenuItem onClick={handleSaveLife} title={user ? "Save your current life data under a unique name" : "Sign in to save your life data"}>
          <SaveButton />
          { user ? 'Save Life' : 'Save Life (Sign in required)'}
        </MenuItem>

        {/* Authentication Options */}
        {!user && (
          <>
            <MenuDivider />
            <MenuItem onClick={handleAuth}>
              <AuthButton />
              Sign In with Google
            </MenuItem>
          </>
        )}

        {user && (
          <>
            <MenuDivider />
            <MenuItem style={{ cursor: 'default' }}>
              Signed in as {user.displayName || user.email}
            </MenuItem>
          </>
        )}
      </MenuDropdown>
    </MenuContainer>
  );
};