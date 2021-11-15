import React from 'react';
import styled, { css } from 'styled-components';

import { COLORS } from '../../constants';

import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

const sizeToProps = {
  small: {
    icon: {
      box: 14,
    },

    input: {
      paddingLeft: 21,
      fontSize: 14,
      verticalPadding: 4,
    }
  },

  large: {
    icon: {
      box: 18,
    },
    input: {
      paddingLeft: 34,
      fontSize: 18,
      verticalPadding: 8,
    }
  }
}

const IconInput = ({
  label,
  icon,
  width = 250,
  size,
  placeholder,
}) => {
  return (
    <Container htmlFor={label}>
      <VisuallyHidden>{label}</VisuallyHidden>

      <IconContainer $size={sizeToProps[size].icon.box}>
        <Icon id={icon} size={sizeToProps[size].icon.box} />
      </IconContainer>

      <TextInput placeholder={placeholder} $width={width} $size={size} />
    </Container>
  );
};

const Container = styled.label`
  width: 100%;
  height: 100%;
  position: relative;
  border-bottom: 1px solid ${COLORS.black};
  width: fit-content;
  display: block;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  pointer-events: none;

  ${({ $size }) => css`
    height: ${$size}px;
    width: ${$size}px;
  `};
`;

const TextInput = styled.input`
  color: ${COLORS.gray700};
  font-weight: 700;
  font-family: Roboto;
  line-height: 1.2;

  border: none;

  ${({ $size, $width }) => css`
    font-size: ${sizeToProps[$size].input.fontSize}px;
    padding: ${sizeToProps[$size].input.padding}px 0;
    padding-left: ${sizeToProps[$size].input.paddingLeft}px;
    width: ${$width}px;
  `};

  ${Container}:hover & {
    color: ${COLORS.black};
  }

  &::placeholder {
    color: ${COLORS.gray500};
    font-weight: 400;
  }

  &:focus {
    outline: 2px dotted #212121;
    outline: 3px auto -webkit-focus-ring-color;
  }
`;

export default IconInput;
