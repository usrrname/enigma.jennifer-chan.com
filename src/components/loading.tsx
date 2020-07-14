import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';


export const Loading = () => {
  const guillotine = require('../assets/guillotine.jpg');

  return (
    <Container>
      <Row>
        <Spinner animation="grow" variant="danger" />
        <img src={guillotine} alt="French Revolution Execution with Guillotine" />
      </Row>
    </Container>)
}