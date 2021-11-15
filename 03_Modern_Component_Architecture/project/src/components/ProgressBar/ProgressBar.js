/* eslint-disable no-unused-vars */
import React from 'react';
import styled, { css } from 'styled-components';

import { COLORS } from '../../constants';
import VisuallyHidden from '../VisuallyHidden';

const ProgressBar = ({ value, size }) => {
  return (
    <ProgressBarContainer
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      $size={size}
    >
      <BarWrapper>
        <Bar $size={size} $value={value} />
      </BarWrapper>
      <VisuallyHidden>{value}%</VisuallyHidden>
    </ProgressBarContainer>
  );
};

const BASE_BAR_HEIGHT = 4;

const sizeToHeighMultiplier = {
  small: 2,
  medium: 3,
  large: 4,
}

const ProgressBarContainer = styled.div`
  width: 186px;
  background-color: ${COLORS.transparentGray15};
  border: none;
  border-radius: 4px;
  box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};

  ${({ $size }) => $size === 'large' && css`
    padding: 4px;
  `};
`;

// This makes sure we round the right corner of our bar once it approaches the end
const BarWrapper = styled.div`
  border-radius: 4px;
  overflow: hidden;
`

const Bar = styled.div`
  background-color: ${COLORS.primary};
  height: ${({ $size }) => BASE_BAR_HEIGHT * sizeToHeighMultiplier[$size]}px;
  width: ${({ $value }) => `${$value}%`};

  border-radius: 4px 0 0 4px;
`;


export default ProgressBar;
