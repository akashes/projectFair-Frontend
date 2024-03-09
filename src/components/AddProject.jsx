import React, { useContext, useDebugValue, useEffect } from 'react'
import '../styles/AddProjects.css'
import { Button,Modal } from 'react-bootstrap';
import { useState } from 'react';
import image from '../assets/projectTitle2.png'
import {Form} from 'react-bootstrap'
import { addProjectAPI } from '../services/allAPI';
// import { ToastContainer, toast } from 'react-toastify';
import { addProjectResponseContext } from '../ContextAPI/ContextShare';
import { showSuccessAlert } from '../utils/toastify';


function AddProject() {
//for refreshing the parent componet using context
  const{addProjectRes,setAddProjectRes}=useContext(addProjectResponseContext)



  const[projectDetails,setProjectDetails]=useState({
    title:"",
    language:"",
    github:"",
    link:"",
    overview:"",
    projectImage:""
  })
  //to hold image url
  const [preview,setPreview]=useState("")
  const [token,setToken]=useState("")

  console.log(preview);

  console.log(projectDetails);

 
  const projectAdd=async()=>{
    const{title,language,github,link,overview,projectImage}=projectDetails
    if(!title || !language || !github || !link || !overview || !projectImage){
      console.log(title,language,github,link,overview,projectImage);
    // toast.warning('please enter all details')
    }else{

      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("link",link)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
  
     const result = await addProjectAPI(reqBody,reqHeader) 
     console.log(result);
     try{
      if(result.status === 200){
        console.log(result.data);
        // showSuccessAlert('Project Added Successfully')
        // toast.success("Project added successfully")
        alert('Project Added Successfully')
        handleClose()
        // for context to acess data
        setAddProjectRes(result.data)

        //reseting modal
        setProjectDetails({
          title:"",
          language:"",
          github:"",
          link:"",
          overview:"",
          projectImage:""
        })
        setPreview("")
       }else{
        console.log(result.response.data);
        // toast.warning('Project already exists')
       }
      }catch(err){
        // toast.warning('couldnt add project')
       
      

        
       }
        

     
    
     
      
    }

   

  }
 

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
      if(sessionStorage.getItem('token')){
        setToken(sessionStorage.getItem('token'))
      }

    },[])
    useEffect(()=>{
      console.log('inside useEffect');
      if(projectDetails.projectImage){
        setPreview(URL.createObjectURL(projectDetails.projectImage))

      }

    },[projectDetails.projectImage])

  return (
    <>
    <div>

<button onClick={handleShow} className='add-btn' >Add Project</button>

</div>
<Modal
show={show}
onHide={handleClose}
keyboard={false}
size='lg'
>
<Modal.Header closeButton>
<Modal.Title>Project Details</Modal.Title>
</Modal.Header>
<Modal.Body>
    <div className="row">
        <div className="col">
           
            <label>
        <input  type="file"
        onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} 
        style={{display:'hidden',opacity:'0'}}
          / >

        <img   style={{width:'100%'}} src={preview?preview:image} alt="" />




        </label>
        </div>
        <div className="col">
        <Form>
      <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Control value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} type="email" placeholder="Project Title" />
      </Form.Group>
      <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Control value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} type="email" placeholder="Language Used" />
      </Form.Group>
      <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Control value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} type="email" placeholder="Github Link" />
      </Form.Group>
      <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Control value={projectDetails.link} onChange={(e)=>setProjectDetails({...projectDetails,link:e.target.value})} type="email" placeholder="Website Link" />
      </Form.Group>
      <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Control value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} type="email" placeholder="Project Overview" />
      </Form.Group>

   
  
    </Form>
        </div>
    </div>

</Modal.Body>
<Modal.Footer>

<Button onClick={projectAdd}  variant="primary">Add</Button>
</Modal.Footer>
</Modal>

    </>
  )
}

export default AddProject
