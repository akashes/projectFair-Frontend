import React, { useContext } from 'react'
import { useState } from 'react';
import { Modal,Col,Button,Row } from 'react-bootstrap';
import EditProject from './EditProject';
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
import { deleteUserProject } from '../services/allAPI';
import { DeleteUserProjectResponseContext } from '../ContextAPI/ContextShare';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProfileProjectCard({projectCard}) {
  console.log('projectcard is ',projectCard)
  const{setDeleteUserProjectRes}=useContext(DeleteUserProjectResponseContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  const handleDeleteProject=async(github)=>{
    console.log('git is ',github);
    const reqBody={
      github
    }
    try{
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token} `
  
        }
        const result = await deleteUserProject(reqBody,reqHeader)
        console.log('result for delete data is ',result);
        toast.success('Project deleted successfully')
        setDeleteUserProjectRes(result.data)

      }else{
        console.log('token expired');
      }
    }catch(err){
      console.log(err);
    }
  


  }
 
  
  return (
    <div>
         <> <MDBCard  style={{maxHeight:"300px",width:'100%'}}>
    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
      <MDBCardImage  src={projectCard?`${baseUrl}/uploads/${projectCard?.projectImage}`:"null"} fluid alt='...' />
      <a>
        <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
      </a>
    </MDBRipple>
    <MDBCardBody>
      <MDBCardTitle className='text-center'>{projectCard?.title.toUpperCase()}</MDBCardTitle>
      <div style={{maxHeight:'200px',maxWidth:'250px'}} className="d-flex justify-content-evenly">
            <button className='btn '>
              <EditProject editData={projectCard} />
            </button>
            <button  className='btn '>
              <a href={projectCard.github} target='_blank'>                <i  className="fa-brands fa-github text-dark  "></i>
</a>
            </button>
            <button className='btn '>
                <i onClick={()=>handleDeleteProject(projectCard.github)}  className="fa-solid fa-trash  "></i>
            </button>
            </div>
    
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
  </Modal></>
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
<ToastContainer

position='top-center'
autoClose={5000}

/>

      
    </div>
  )
}

export default ProfileProjectCard
