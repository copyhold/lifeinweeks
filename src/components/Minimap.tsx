import React, {useMemo} from 'react';
import {createPortal} from 'react-dom';
import styled from 'styled-components';
import {useAppStore, life_length} from '../services/state.zus';

const StyledMinimap = styled.div<{percent: number}>`
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
animation: marker-position linear forwards;
animation-timeline: scroll(root);
}
@keyframes marker-position {
  0% {
    transform: translateX(0cqi);
  }
  100% {
    transform: translateX(100cqi);
  }
}
}`;

export const Minimap = () => {
  const {birthday, yearsSinceBirth} = useAppStore();

  const scrollToLifePosition = (e: React.ClickEvent) => {
    const scrollPosition = (document.body.scrollHeight - window.innerHeight * 1.12) * e.clientX / e.target.scrollWidth;
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    });
  }

  const percent = useMemo(() => {
    return Math.round(100 * yearsSinceBirth(new Date()) / life_length);
  }, [birthday]);

  return createPortal(<StyledMinimap percent={percent} onClick={scrollToLifePosition} />, document.getElementById('footer'));
}