/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, QUERIES, WEIGHTS } from '../../constants';

import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';
import Spacer from '../Spacer';
import VisuallyHidden from '../VisuallyHidden';
import BaseModal from '../BaseModal';

const MobileMenu = ({ isOpen, onDismiss }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <BaseModal on={isOpen} allowEscape={true} close={onDismiss}>
      <DismissButton onClick={onDismiss}>Dismiss menu</DismissButton>

      <Spacer size={16} />

      <CategoriesNav>
        <MenuLink href="/sale">Sale</MenuLink>
        <MenuLink href="/new">New&nbsp;Releases</MenuLink>
        <MenuLink href="/men">Men</MenuLink>
        <MenuLink href="/women">Women</MenuLink>
        <MenuLink href="/kids">Kids</MenuLink>
        <MenuLink href="/collections">Collections</MenuLink>
      </CategoriesNav>

      <Spacer size={16} />

      <LegalLinks>
        <MenuLink href="/terms">Terms and Conditions</MenuLink>
        <MenuLink href="/privacy">Privacy Policy</MenuLink>
        <MenuLink href="/contact">Contact Us</MenuLink>
      </LegalLinks>
    </BaseModal>
  );
};

const DismissButton = styled.button`
  width: 100%;
  display: block;
  background-color: ${COLORS.primary};
  color: #fff;
  border: none;
`;

const MenuLink = styled.a`
  display: block;
  text-decoration: none;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  line-height: 2;
`

const CategoriesNav = styled.nav``

const LegalLinks = styled.div``

export default MobileMenu;
