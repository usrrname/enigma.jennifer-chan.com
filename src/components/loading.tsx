import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';

export const Loading = () => {
  return (
    <Container>
      <Row>
        <Spinner animation="border" variant="danger" />
        <Spinner animation="border" variant="warning" />
        <Spinner animation="border" variant="info" />
      </Row>
    </Container>)
}