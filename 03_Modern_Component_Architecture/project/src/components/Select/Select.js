import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import Icon from '../Icon';
import { getDisplayedValue } from './Select.helpers';

const Select = ({ label, value, onChange, options, children }) => {
  const displayedValue = getDisplayedValue(value, options);

  return (
    <SelectLabel htmlFor={label}>
      <NativeHiddenSelect id={label} value={value} onChange={onChange}>
        {options.map(({ value, displayName }) => (
          <option value={value}>{displayName}</option>
        ))}
      </NativeHiddenSelect>

      <LabelTextContainer>
        <span>{displayedValue}</span>
        <Icon id="chevron-down" size={18} />
      </LabelTextContainer>
    </SelectLabel>
  );
};

const SelectLabel = styled.label`
  display: block;
  width: fit-content;
  background: ${COLORS.transparentGray15};
  color: ${COLORS.gray700};
  border-radius: 8px;
  cursor: pointer;
  position: relative;
`;

const NativeHiddenSelect = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -webkit-appearance: none; // to have it be 100% on safari
`;


const LabelTextContainer = styled.div`
  padding: 12px 16px;
  background: ${COLORS.transparentGray15};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  position: relative;
  pointer-events: none;
  transition: color 0.2s ease;


  ${NativeHiddenSelect}:focus + & {
    outline: 1px dotted #212121;
    outline: 5px auto -webkit-focus-ring-color;
  }

  ${SelectLabel}:hover & {
    color: ${COLORS.black};
  }

  span {
    font-size: 1rem;
    line-height: 1.2;
    margin-right: 24px;
  }
`;

export default Select;
