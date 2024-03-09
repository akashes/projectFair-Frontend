import React, { useEffect,useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import bulb from "../assets/bulb.png";
import project from "../assets/project.png";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import { getHomeProject } from "../services/allAPI";
import './home.css'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';

function Home() {
  const[homeProject,setHomeProject]=useState([])
  const navigate = useNavigate();
  const HandleHover = (isHovering) => {
    const marquee = document.getElementById("marquee");
    if (isHovering) {
      marquee.stop();
    } else if (!isHovering) {
      marquee.start();
    }
  };
  const getHomeCards=async()=>{
   const result= await getHomeProject()
   if(result.status==200){
    console.log(result);
    setHomeProject(result.data)
   }else{
    console.log(result.response.message);
   }
  }
  console.log(homeProject);

  useEffect(()=>{
    getHomeCards()

  },[])
  return (
    <div style={{ minHeight: "80vh" }}>
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
      {/* landing Section */}
      <Container>
       
        <Row>
          <Col
            className="d-flex flex-column justify-content-center"
            sm={12}
            md={5}
            lg={5}
            xl={5}
          >
            <h1 className="text-center m-4">Project Hub</h1>
            <p style={{ textAlign: "justify", lineHeight: "1.8" }}>
              Project Management is the application of specific knowledge,
              skills, methodologies, and techniques aimed at achieving specific
              and measurable project goals, including, ultimately, successful
              project completion. It differs from general “management” because
              project management relates directly to the goals and time-bound
              objectives achieved within the scope of a project itself, on a
              limited timeline, rather than an ongoing one.
            </p>
            <div>
              <button
                onClick={() => navigate("/login")}
                className="p-1 px-2 btn btn-outline-warning btn-lg rounded-pill shadow-sm m-3"
              >
                Get Started
              </button>
            </div>
          </Col>
          <Col sm={12} md={7} lg={7} xl={7}>
            <img className="w-100" src={project} alt="" />
          </Col>
        </Row>
      </Container>
      <div>
        {/* projects Section */}

        <div className="my-5" style={{overflowX:'hidden'}}>
          <h2 className="text-center m-5">Explore Our Projects</h2>
          <marquee
            id="marquee"
            behavior="scroll"
            scrollAmount="20"
            scrollDelay='0'
          
                  >
           
            <Row>
              {
               homeProject.length>0? homeProject?.map((projectCard,key)=>(
                  <Col key={key}
                  onMouseEnter={() => HandleHover(true)}
                onMouseLeave={() => HandleHover(false)}
                sm={12}
                md={6}
                lg={4}
                xl={4}
                  >
                  <ProjectCard projectCard={projectCard}/>
                  </Col>

                )) : <p className="text-center text-danger">empty</p>
              }
             
            </Row>
          </marquee>
       

        </div>
     
      </div>
    </div>
  );
}

export default Home;
