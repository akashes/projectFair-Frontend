import React from 'react'
import { Modal,Button, Row,Col } from 'react-bootstrap';
import { useState } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple
  } from 'mdb-react-ui-kit';
  import image from '../assets/projectTitle1.png'
  import { baseUrl } from '../services/baseUrl';
import EditProject from './EditProject';


function ProjectCard({projectCard}) {
  console.log(projectCard);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
 <>
 {
   <> <MDBCard  onClick={handleShow} style={{maxHeight:"300px",width:'100%'}}>
  <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
    <MDBCardImage src={projectCard?`${baseUrl}/uploads/${projectCard?.projectImage}`:"null"} fluid alt='...' />
    <a>
      <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
    </a>
  </MDBRipple>
  <MDBCardBody>
    <MDBCardTitle className='text-center'>{projectCard?.title.toUpperCase()}</MDBCardTitle>
  
  </MDBCardBody>
</MDBCard>
  <Modal
  show={show}
  onHide={handleClose}
>
  <Modal.Header closeButton>
    <Modal.Title>{projectCard?.title}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Row>
      <h3 className='text-center fw-bold'>Project Details</h3>
      <Col sm={12} md={6} lg={4} xl={5}><img className='w-100' src={projectCard?`${baseUrl}/uploads/${projectCard?.projectImage}`:"null"} alt="" /></Col>
      <Col sm={12} md={6} lg={4} xl={7}>
      <h3>{projectCard?.title.toUpperCase()}</h3>
      <p><span  className='fw-bold '>Project Overview :  </span> {projectCard?.overview} </p>
      <p>Language Used : <b>{projectCard?.language}</b></p>


      </Col>
      <div className="d-flex justify-content-evenly align-items-center ">
      <a href={projectCard?.github} target='_blank'><i  class="fa-brands fa-github text-warning fs-3"></i></a>
      <a href={projectCard?.link} target='_blank' ><i  class="fa-solid fa-link text-warning fs-3 "></i></a>
      </div>
    </Row>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
</> 

 }
   
 </>

)
}

export default ProjectCard
