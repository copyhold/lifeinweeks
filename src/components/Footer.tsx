import React, { useMemo } from 'react';
import styled from 'styled-components';
import {useAppStore, life_length} from '../services/state.zus';
import { colors } from '../theme';

const FooterContainer = styled.footer`
  height: 20px;
  position: sticky;
  bottom: 10px;
  border-radius: 5px;
  overflow: clip;
  box-shadow: 0 0 10px 5px ${colors.background};
  background: #fff;
  @media (max-width: 599px) {
    width: 100vw;
    margin-left: -5px;
    bottom: 0;
    border-radius: 0;
  }
}`

export const Footer: React.FC = () => {
  return (
    <FooterContainer id="footer">
    </FooterContainer>
  );
}