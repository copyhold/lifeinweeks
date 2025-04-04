import React from 'react';
import styled from 'styled-components';
import { useAppStore } from '../services/state.zus';

const StyledSection = styled.section`
  flex-basis: 100%;
  margin-bottom: 1lh;
  h3 {
    font-size: 1.3em;
  }
`;

export const DecatesSeparator: React.FC<{ week: WeekOfTheYear }> = ({ week }) => {
  const { yearsSinceBirth } = useAppStore();
  const years = yearsSinceBirth(week.start);
  const title = years > 0 ? `${years} years passed` : 'Your first year';
  return (
    <StyledSection>
      <h3>{title}</h3>
    </StyledSection>
  );
};
