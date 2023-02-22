import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function MessageModel(props) {
    console.log(props.description)
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    props.closeModel();

  };

  return (
    <>
      <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <img src={props.imgSrc} alt='' width={'100px'} height={'100px'} style={{ margin:'auto',display:'flex',justifyItems:'center' }}></img><br>
            </br>
            <h3 style={{ textAlign:'center'}}>{props.description}</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MessageModel;
