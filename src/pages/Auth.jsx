import React, { useState } from 'react'
import { Link, json } from 'react-router-dom'
import image1 from '../assets/login2.png'
import { Row,Col,Container } from 'react-bootstrap'
import {loginAPI, registerAPI} from '../services/allAPI'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';


function Auth({register}) {
  const navigate=useNavigate()
  const isRegisterForm=register?true:false

  const[userData,setUserData]=useState({
    username:"",
    email:"",
    password:""
  })


  const registerData=async()=>{
    const{username,email,password}=userData
    if(!username || !email || !password){
      toast.error('please enter valid details')
    }else{
     const result = await registerAPI(userData)
    try{
      if(result.status==200){
        toast.success('login successfull')

        navigate('/login')

       }else{
        console.log(result.response.data);
        alert('Registration error');
       }
    } catch(error){
      alert("Registration error")
      console.log(error);
    }
  


    }

  }

  const loginData=async()=>{
    const{email,password}=userData
    if(!email || !password){
      toast.warning('Please enter valid details')
    }else{

     try{
      const result = await loginAPI(userData)
      console.log(result);
      if(result.status==200){
        toast.success('Login successfull')
        console.log(result.data);
        sessionStorage.setItem('token',result.data.token)
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.user))
        setTimeout(()=>{

          navigate('/dashboard')

        },1000)
        // alert('login successfull')

      }else{
        toast.error('Please enter valid details')
      }
     }
     catch(err){
      toast.warning('Please enter valid Email and Password')
      console.log(err);
     }
     
    }  
  }
  const navigateToRegister=()=>{
    setUserData({
      username:"",
      email:"",
      password:""
    })
    navigate('/register')

  }
  return (
<>
<MDBNavbar
          //  className='position-fixed top-0 w-100'
            light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand onClick={()=>navigate('/')} >
          <i class="fa-solid fa-file-import fa-fade mx-3 fs-1 text-info"></i>
          Project Hub
        </MDBNavbarBrand>

      
        </MDBContainer>
      </MDBNavbar>
<div 

    className='d-flex justify-content-center align-items-center'
     style={{width:'100%',minHeight:'100vh'}}>
      <Container>
        <Row className='mt-5' >
          <Col className='d-flex justify-content-between align-items-center' sm={12} md={6} lg={6} xl={6} >
            <img className='w-75' src={image1} alt="" />

          </Col>
          <Col sm={12} md={6} lg={6} xl={6} style={{width:'600px'}} className='ms-5 d-flex  align-items-center '>
            <div className='card  m-5 rounded shadow-lg w-75 d-flex align-items-center justify-content-center' style={{height:'450px'}}>
            <div>
            <h3 className='text-center'>Project Fair</h3>
            <h5 className='m-3 text-center'>
              {
                isRegisterForm ? "SignUp here " : "Login here"
              }
            </h5>
            <form className='d-flex flex-column  gap-4' action="">
              {
                isRegisterForm &&
                <input className='form-control' value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} type="text" name=""  placeholder='Enter UserName' />
                
              }
              <input  className='form-control ' value={userData.email}  onChange={(e)=>setUserData({...userData,email:e.target.value})} type="email" name="" id=" " placeholder='Enter EmailId' />
              <input className='form-control' value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} type="password" name="" placeholder='Enter Password' />
            </form>
            {
              isRegisterForm ? 
              <div className='d-flex justify-content-between align-items-center'> <Link to='/login' style={{textDecoration:'none',color:'gray',fontWeight:'bold'}}>Already have an Account?</Link>
                            <button onClick={registerData} className="btn m-3 btn-info ">Register</button>


              </div>
              :
              <div className='d-flex  justify-content-between align-items-center w-100'>
                <div className='d-flex flex-column  '><span>Dont have an account</span>  <span onClick={navigateToRegister} className='fw-bold'>Register</span></div>

<button onClick={loginData} className="btn m-3 btn-success ">Login</button>

              </div>
            }
            </div>

            </div>
          </Col>
        </Row>
        <div className='text-center m-3'>
      <Link   to='/'><button className='btn btn-warning '>Back to Home</button></Link>
    </div>
      </Container>
  
 
    </div>
    <ToastContainer
    position='top-center'
    theme='light'
    autoClose={1500}
    />
</>

  )
}

export default Auth
