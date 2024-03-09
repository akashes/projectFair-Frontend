import React, { useContext, useEffect,useState } from 'react'
import AddProject from './AddProject'
import '../styles/MyProjects.css'
import { getUserProject } from '../services/allAPI'
import { Row ,Col} from 'react-bootstrap'
import ProjectCard from './ProjectCard'
import { DeleteUserProjectResponseContext, EditUserProjectResponseContext, addProjectResponseContext } from '../ContextAPI/ContextShare'
import ProfileProjectCard from './ProfileProjectCard'

function MyProjects() {
 const{addProjectRes,setAddProjectRes}= useContext(addProjectResponseContext)
 const{editUserProjectRes} = useContext(EditUserProjectResponseContext)
 const{deleteUserProjectRes}=useContext(DeleteUserProjectResponseContext)
 

 console.log(addProjectRes);
  const[userProjects,setUserProjects]=useState([])


  const handleUserProjects=async()=>{
    console.log('inside handleUser project to add project');
    try{
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token} `
  
        }
    
        const result = await getUserProject(reqHeader)
  
        console.log(result);
        setUserProjects(result.data)
  
      }else{
        console.log('cant get user Projects');
      }

    }catch(err){
      console.log(err);
    }


  
  }
    
    
  useEffect(()=>{
    handleUserProjects()
  
  
   },[addProjectRes,editUserProjectRes,deleteUserProjectRes])
  return (
    <div >
      <div className='d-felx  '>
          <h3 style={{display:'inline-block',borderBottom:'1px solid green',paddingBottom:'20px'}} id='typing-text' className='text-with-underline'></h3>
            <div className="d-flex justify-content-end"><AddProject/></div>
      </div>
    
      <div 
      // className='d-flex gap-5 justify-content-between border p-4 rounded'
      className='border p-4 rounded'
      >
        <Row>
        {
          userProjects.length>0? userProjects.map((project,key)=>(
            <Col className='py-5'  key={key} sm={12} md={6} lg={6} xl={6} >
              
             {/* <h5>{project.title}</h5> */}
             <div style={{maxHeight:'200px',maxWidth:'250px'}}>
              <ProfileProjectCard projectCard={project} profile />         
               
             </div>
     
            </Col>
          )) : <p>empty</p>
        }
        </Row>
       
      </div>
    </div>
  )
}

export default MyProjects
