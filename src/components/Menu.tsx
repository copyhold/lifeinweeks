import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useAppStore } from '../services/state.zus';
import { useFirebaseStore } from '../services/firebase.storage.service.ts';
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

const MenuDropdown = styled.div<{ isOpen: boolean }>`
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
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const MenuItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
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

export const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { birthday, setBirthday, name } = useAppStore();
  const { authWithGoogle, user, saveLife } = useFirebaseStore();
  const { life } = useAppStore();

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
    
    if (window.confirm('Are you sure you want to change your birthday?')) {
      setBirthday(new Date(newDate));
    }
  };

  const handleSaveLife = async () => {
    let slug = window.location.pathname.slice(1);
    slug = window.prompt('Enter a name for your life:', slug) || '';
    
    if (!slug) return;
    
    await saveLife(life(), slug);
    setIsOpen(false);
  };

  const handleAuth = () => {
    authWithGoogle();
    setIsOpen(false);
  };

  return (
    <MenuContainer ref={menuRef}>
      <MenuButton onClick={toggleMenu} title="Menu" />
      <MenuDropdown isOpen={isOpen}>
        <MenuItem onClick={handleUpdateBirthday}>
          <BirthdayButton />
          Change Birthday
        </MenuItem>
        
        <MenuDivider />
        
        <MenuItem onClick={handleSaveLife}>
          <SaveButton />
          Save Life
        </MenuItem>
        
        {!user && (
          <>
            <MenuDivider />
            <MenuItem onClick={handleAuth}>
              <AuthButton />
              Sign In
            </MenuItem>
          </>
        )}
        
        {user && (
          <>
            <MenuDivider />
            <MenuItem>
              Signed in as {user.displayName}
            </MenuItem>
          </>
        )}
      </MenuDropdown>
    </MenuContainer>
  );
}; 