import React from 'react';
import { Container, Row, Spinner, Col } from 'react-bootstrap';


export const Loading = () => {

  return (
    <Container fluid>
      <Row>
        <Col lg={12}>
          <Spinner animation="grow" variant="danger" />
        </Col>
      </Row>
    </Container>)
}