import React from 'react';
import { Container } from 'react-bootstrap';

export const Loading = () => {
  const keyImage = require('../assets/keys.png');

  return (
    <Container>
      <h3>Loading videos </h3>
      <p>Toggle back and forth</p>
      <img src={keyImage} alt="Toggle back and forth with left and right keys" />
    </Container>
  )
}