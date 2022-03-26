import React from 'react';
import { useTransition } from 'react-spring';

import { StyledContent, StyledOverlay } from './styles';

const baseTransition = {
  from: { opacity: 0, y: -10 },
  enter: { opacity: 1, y: 0 },
  leave: { opacity: 0, y: 10 },
};

const BaseModal = ({ on, close, allowEscape = true, children, maxWidth }) => {
  const transitions = useTransition(on, baseTransition);

  return transitions(
    (styles, item) =>
      item && (
        <StyledOverlay
          style={{ opacity: styles.opacity }}
          onDismiss={allowEscape ? close : undefined}
        >
          <StyledContent
            style={{ transform: styles.y.to((value) => `translate3d(0px, ${value}px, 0px)`) }}
            aria-labelledby="alert"
            $maxWidth={maxWidth}
          >
            {children}
          </StyledContent>
        </StyledOverlay>
      ),
  );
};

export default BaseModal;
