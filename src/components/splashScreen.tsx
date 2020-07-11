import React from 'react';
import { Spinner, Modal } from 'react-bootstrap';

type Props = {
  show: boolean,
  isLoading: boolean,
  handleClose: () => void,
}

export const SplashScreen = (props: Props) => {

  return (
    <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false} xl={12}>
      <Modal.Header closeButton>
        <Modal.Title>Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Lorem Ipsum Dotem</p>
        {props.isLoading &&
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
      </Modal.Body>
    </Modal >
  );
}