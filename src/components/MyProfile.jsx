import React, { useState,useEffect } from 'react'
import image from '../assets/userLogo.png'
import '../styles/MyProfile.css'
function MyProfile() {
  const[github,setGithub]=useState("")
  const[linkedin,setLinkedin]=useState("")
  const[username,setUsername] = useState("")
  

  // const updateUserDetails=async()=>{
  //   reqBody={
  //     github,
  //     linkedin,
  //   }
  // }

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
    <div className='text-center'>
        <h3 >My Profile</h3>
        <label htmlFor="user">
        <input style={{display:'none'}} type="file" name="" id="user" />

        <img height={'100px'} src={image} alt="" />


        </label>
        <div className='d-flex flex-column align-items-center'>
            <input value={username}  style={{maxWidth:'300px',outline:'none',caretColor:'transparent'}} type="text" name="" className=' text-center form-control m-2' placeholder='username' id="" />
            <input  onChange={(e)=>setGithub(e.target.value)} style={{maxWidth:'300px',outline:'none',caretColor:'transparent'}} type="text" name="" className='text-center form-control m-2' placeholder='GitHub' id="" />
            <input onChange={(e)=>setLinkedin(e.target.value)} style={{maxWidth:'300px',outline:'none',caretColor:'transparent'}} type="text" name="" className='text-center form-control m-2' placeholder='Linkedin' id="" />
            <button >Update user Details</button>
        </div>
      
    </div>
  )
}

export default MyProfile
