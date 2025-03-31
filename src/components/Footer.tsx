import React, { useMemo } from 'react';
import styled from 'styled-components';
import {useAppStore, life_length} from '../services/state.zus';

const FooterContainer = styled.footer`
  height: 20px;
  position: sticky;
  bottom: 10px;
  border-radius: 5px;
  overflow: clip;
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
${({ percent }) => `
background: linear-gradient(to right, #ff7e5f ${percent}%, #feb47b ${percent}%);
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