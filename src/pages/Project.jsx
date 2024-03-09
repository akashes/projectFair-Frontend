import React, { useEffect,useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { Row,Col,Container } from 'react-bootstrap'
import { getAllProject } from '../services/allAPI'

function Project() {
  const[allProject,setAllProject]=useState([]) // to hold allProject
  const[token,setToken]=useState("")
  const[searchKey,setSearchKey]=useState("")
  console.log(searchKey)

  //api call
  const allProjects=async()=>{

    // if( await sessionStorage.getItem('token')){
    //  await setToken(sessionStorage.getItem('token'))
    //  const reqHeader={
    //   "Content-Type":"multipart/form-data",
    //   "Authorization":`Bearer ${token}`

    // }
    const token= sessionStorage.getItem('token')
    if(token){
       const reqHeader={
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`

    }

    try{
      const result =  await getAllProject(searchKey,reqHeader)
      if(result.status=== 200){
       setAllProject(result.data)
      }else{
       alert("Failed to retrieve your project")
      }

    }catch(err){

      console.log(err);
    }
  

    }

  }
  console.log(allProject);

  useEffect(()=>{
    allProjects()

  },[searchKey])
  return (
    <div style={{minHeight:'90vh'}} className='pt-5'>
      <div className="container my-5">
        <h1 className="text-center">All Projects</h1>
        <div className="d-flex justify-content-center">
          <div style={{position:'relative'}}>
            <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} style={{width:'350px',outline:'none',border:'1px solid gray'}} className='rounded-pill  py-2 px-4' placeholder='search by Technology' type="search" name="" id="" />
            <i style={{position:'absolute',right:'9px',top:'12px'}} class="fa-solid fa-magnifying-glass"></i>

          </div>
        </div>
      </div>
      <Container>
        <Row>
          {
            allProject.length>0 ? allProject?.map((project,index)=>(
              <Col key={index} sm={12} md={6} lg={4} xl={3} >
          <ProjectCard projectCard={project}  />
          </Col>

            )) : <p>empty</p>
          }
          
        </Row>
      </Container>
    </div>
  )
}

export default Project
