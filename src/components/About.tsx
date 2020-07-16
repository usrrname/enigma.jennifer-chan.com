import React from 'react';
import { Modal } from 'react-bootstrap';

type Props = {
  show: boolean;
  handleClose: (event: any) => void;
  handleShow: (event: any) => void;
}

export const About = (props: Props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Body>
          <p> I made this for fun because I didn't think you would watch a 5 minute video. Watch the <a href="https://vimeo.com/422402920" rel="noreferrer noopener" target="_blank">original video here.</a>
          </p>
          <p>Code reviews welcomed at <a href="https://github.com/usrrname/enigma.jennifer-chan.com" rel="noreferrer noopener">my repo</a> here!</p>
          <p>A last-minute kludge for <a href="https://2020.vectorfestival.org/" rel="noreferrer noopener" target="_blank" >Vector Festival, 2020.</a></p>
        </Modal.Body>
      </Modal>
    </>
  );
}