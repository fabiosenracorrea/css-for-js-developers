import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, MEDIA, WEIGHTS } from '../../constants';
import Logo from '../Logo';
import SuperHeader from '../SuperHeader';
import MobileMenu from '../MobileMenu';
import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <Side>
          <Logo />
        </Side>
        <Nav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </Nav>
        <Side>
          <MobileNav>
            <UnstyledButton>
              <Icon size={22} color={COLORS.gray[900]} id="shopping-bag" />
            </UnstyledButton>

            <UnstyledButton>
              <Icon size={22} color={COLORS.gray[900]} id="search" />
            </UnstyledButton>

            <UnstyledButton onClick={() => setShowMobileMenu(true)}>
              <Icon size={22} color={COLORS.gray[900]} id="menu" />
            </UnstyledButton>
          </MobileNav>
        </Side>
      </MainHeader>

      <MobileMenu
        isOpen={showMobileMenu}
        onDismiss={() => setShowMobileMenu(false)}
      />
    </header>
  );
};

const MainHeader = styled.div`
  display: flex;
  align-items: baseline;
  padding: 18px 32px;
  height: 72px;
  border-bottom: 1px solid ${COLORS.gray[300]};
  overflow-x: auto;

  ${MEDIA.TABLET} {
    padding: 18px;
    align-items: center;
  }
`;

const Nav = styled.nav`
  display: flex;

  --spacing: clamp(1rem, 5vw - 1rem, 4rem);
  gap: var(--spacing);
  margin: 0px var(--spacing);

  ${MEDIA.PHONE} {
    display: none;
  }
`;

const Side = styled.div`
  flex: 1;
`;

const MobileNav = styled.nav`
  display: none;

  ${MEDIA.TABLET} {
    display: flex;
    justify-content: flex-end;

    ${UnstyledButton} + ${UnstyledButton} {
      margin-left: 16px;
    }
  }
`;

const NavLink = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: ${COLORS.gray[900]};
  font-weight: ${WEIGHTS.medium};

  &:first-of-type {
    color: ${COLORS.secondary};
  }
`;

export default Header;
