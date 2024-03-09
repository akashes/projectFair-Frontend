import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import MyProjects from '../components/MyProjects'
import MyProfile from '../components/MyProfile'
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header'

function Dashboard() {
  const navigate = useNavigate()

  const[username,setUsername]=useState('')

  
 
 useEffect(()=>{
  let item=JSON.parse( sessionStorage.getItem('existingUser'))
 if(item !== null){
  console.log(item.username)
  setUsername(item.username)

}else{
  console.log('user not available');
 }

 },[])
 

 
  return (
   <>
   <Header/>
    <div style={{minHeight:'80vh'}} className='container '>

<Row className>
  <h1 className='m-5 text-center'> Welcome <span className='fw-bold text-warning'>{username}</span></h1>
  <Col sm={12} md={6} lg={6} xl={6}>
  <MyProjects/>


  </Col>
  <Col sm={12} md={6} lg={6} xl={6}>
  <MyProfile/>
  </Col>
</Row>
<Row>
  <Col>
  <div className="text-center">
    <button
      onClick= {()=>navigate('/projects')}
      className="p-2 px-3 btn text-dark btn-info btn-lg rounded-pill shadow-sm m-5"
    >
      View Projects
    </button>
  </div>
  </Col>
</Row>
</div>
   </>
  )
}

export default Dashboard
