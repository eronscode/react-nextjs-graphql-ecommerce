import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const ScrollButton = ({ theme, onClick }) => (
  <Wrapper>
    <Toggler type="button" style={{ padding: '14px 15px' }} onClick={onClick}>
      {theme === 'light' ? '🌙' : '🌘'}
      <p>Toggle Theme ✨</p>
    </Toggler>
  </Wrapper>
);

const Wrapper = styled.div`
  position: fixed;

  width: 100%;

  left: 2%;

  bottom: 24%;

  height: 20px;

  font-size: 3rem;

  z-index: 1;

  cursor: pointer;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const Toggler = styled.button`
  font-size: 38px;
  background: none;
  border: none;
  outline: 0;
  cursor: pointer;
  padding: 0;
  transition: all 0.25s linear;
  p {
    font-size: 10px;
    color: ${(props) => props.theme.secondary};
  }
`;

export default ScrollButton;
