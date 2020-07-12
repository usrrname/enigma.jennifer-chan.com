import React from 'react';
import { Container, Row } from 'react-bootstrap';

export const Loading = () => {
  const keyImage = require('../assets/keys.png');

  return (
    <Container>
      <Row>
        <h3>Loading… </h3>
        <p>Toggle back and forth</p>
        <img src={keyImage} alt="Toggle back and forth with left and right keys" />
      </Row>
    </Container>)
}