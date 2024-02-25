import React from 'react'
import image from '../assets/userLogo.png'
import '../styles/MyProfile.css'
function MyProfile() {
  return (
    <div className='text-center'>
        <h3 >My Profile</h3>
        <label htmlFor="user">
        <input style={{display:'none'}} type="file" name="" id="user" />

        <img height={'100px'} src={image} alt="" />


        </label>
        <div className='d-flex flex-column align-items-center'>
            <input style={{maxWidth:'300px',outline:'none',caretColor:'transparent'}} type="text" name="" className=' text-center form-control m-2' placeholder='username' id="" />
            <input style={{maxWidth:'300px',outline:'none',caretColor:'transparent'}} type="text" name="" className='text-center form-control m-2' placeholder='GitHub' id="" />
            <input style={{maxWidth:'300px',outline:'none',caretColor:'transparent'}} type="text" name="" className='text-center form-control m-2' placeholder='Linkedin' id="" />
            
        </div>
      
    </div>
  )
}

export default MyProfile
