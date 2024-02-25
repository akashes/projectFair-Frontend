import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';
  
  import {useNavigate} from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
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

      
    </>
  )
}

export default Header
