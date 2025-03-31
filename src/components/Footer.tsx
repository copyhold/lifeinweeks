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

const Minimap = styled.div<{percent: number}>`
width: 100%;
height: 100%;
--past-color: color(from var(--background-color) xyz calc(x - 0.1) calc(y - 0.1) calc(z - 0.1));
--future-color: color(from var(--background-color) xyz calc(x + 0.1) calc(y + 0.1) calc(z + 0.1));
${({ percent }) => `
background: linear-gradient(to right, var(--past-color) ${percent}%, var(--future-color) ${percent}%);
`};
}`;
export const Footer: React.FC = () => {
  const {birthday, yearsSinceBirth} = useAppStore();

  const percent = useMemo(() => {
    return Math.round(100 * yearsSinceBirth(new Date()) / life_length);
  }, [birthday]);
  return (
    <FooterContainer>
    <Minimap percent={percent} />
    </FooterContainer>
  );
}