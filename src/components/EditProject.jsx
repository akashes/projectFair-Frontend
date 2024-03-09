import React,{useContext, useEffect, useState} from 'react'
import { Modal,Button,Form } from 'react-bootstrap';
import image from '../assets/projectTitle2.png'
import { ToastContainer, toast } from 'react-toastify';

import { baseUrl } from '../services/baseUrl';
import { editUserProject } from '../services/allAPI';
import { EditUserProjectResponseContext } from '../ContextAPI/ContextShare';

function EditProject({editData}) {
  const {setEditUserProjectRes} = useContext(EditUserProjectResponseContext)
    
  const[projectDetails,setProjectDetails]=useState({
    id:editData._id,
    title:editData.title,
    language:editData.language,
    github:editData.github,
    link:editData.link,
    overview:editData.overview,
    projectImage:editData.projectImage
  })
  const [preview,setPreview]=useState("")
  console.log(preview);

  // useEffect(()=>{
  //   //convert it to a url
  //   setPreview(URL.createObjectURL(projectDetails.projectImage))
  // },[projectDetails.projectImage])

  //updating project
  const handleUpdateProject=async()=>{

    const{id,title,language,github,link,overview,projectImage} =  projectDetails
    if(!title || !language || !github || !link || !overview || !projectImage){
      toast.warning('Please enter all details')
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("link",link)
      reqBody.append("overview",overview)
      preview?reqBody.append("projectImage",projectImage) :reqBody.append("projectImage",editData.projectImage)

      const token = sessionStorage.getItem('token')
      console.log(token);

      if(preview){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        //api call
        const result = await editUserProject(id,reqBody,reqHeader)
        console.log(result);  
       try{
        if(result.status===200){
          setProjectDetails(result.data)
          handleClose()
          setEditUserProjectRes(result.data)
        }else{
          toast.warning(result.response.data)
        }
       }catch(err){
        console.log(err);
       }
      }else{
        const reqHeader={
          "Content-Type":"multipart/json",
          "Authorization":`Bearer ${token}`
        }
        //api call
        const result = await editUserProject(id,reqBody,reqHeader)
        console.log(result);  
       try{
        if(result.status===200){
          setProjectDetails(result.data)
          handleClose()
          setEditUserProjectRes(result.data)

        }else{
          toast.warning(result.response.data)
        }
       }catch(err){
        console.log(err);
       }

      }
    }

  }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true);
    }

  return (
  


    <>
    <div>

    <i onClick={(e)=>handleShow()}   className="fa-solid fa-pen  "></i>

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

        <img   style={{width:'100%'}} src={preview?preview:`${baseUrl}/uploads/${editData.projectImage}`} alt="" />




        </label>
        </div>
        <div className="col">
        <Form>
      <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Control value={projectDetails.title } onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} type="email" placeholder="Project Title" />
      </Form.Group>
      <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Control value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} type="email" placeholder="Language Used" />
      </Form.Group>
      <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Control value={projectDetails.github } onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} type="email" placeholder="Github Link" />
      </Form.Group>
      <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Control value={projectDetails.link } onChange={(e)=>setProjectDetails({...projectDetails,link:e.target.value})} type="email" placeholder="Website Link" />
      </Form.Group>
      <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Control value={projectDetails.overview } onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} type="email" placeholder="Project Overview" />
      </Form.Group>

   
  
    </Form>
        </div>
    </div>

</Modal.Body>
<Modal.Footer>

<Button onClick={handleUpdateProject}  variant="primary">Update</Button>
</Modal.Footer>
</Modal>
<ToastContainer
    position='top-center'
    theme='light'
    autoClose={1500}
    />
    </>
  )
}

export default EditProject
