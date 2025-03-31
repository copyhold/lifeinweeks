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
cursor: pointer;
${({ percent }) => `
background: linear-gradient(to right, var(--past-color) ${percent}%, var(--future-color) ${percent}%);
`};
&::after {
content: '';
height: 100%;
width: 2px;
background-color: red;
position: absolute;
top: 0;
animation: marker-position linear both;
animation-timeline: scroll(root);
}
@keyframes marker-position {
  from {
    transform: translateX(0cqi);
  }
  to {
    transform: translateX(99cqi);
  }
}
}`;
export const Footer: React.FC = () => {
  const {birthday, yearsSinceBirth} = useAppStore();

  const scrollToLifePosition = (e: React.ClickEvent) => {
    const scrollPosition = window.scrollMaxY * e.clientX / e.target.scrollWidth;
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    });
  }

  const percent = useMemo(() => {
    return Math.round(100 * yearsSinceBirth(new Date()) / life_length);
  }, [birthday]);
  return (
    <FooterContainer>
    <Minimap percent={percent} onClick={scrollToLifePosition} />
    </FooterContainer>
  );
}