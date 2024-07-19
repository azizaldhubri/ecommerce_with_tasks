import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../../Pages/Websit/HomePage/Home.css'
import { Axios } from "../../../Api/axios";
import { LOGOUT } from "../../../Api/Api";

import Cookie from 'cookie-universal' ;



export default function Landing(){
      const cookie=Cookie();
    async function handleLogout(){
    try{
       await Axios.get(`/${LOGOUT}`);         
     window.location.pathname='/login'
     cookie.remove('e-commerce');
    }
    catch(err){
        console.log(err)
    }

    }
    return(
            
       
       
        <div className="d-flex align-items-center flex-wrap home position-relative">
       
          <Container  >
            
            <div className="col-lg-5 col-md-8 col-12 text-md-start text-center ">
                <h1 className="display-2 fw-bold">Shampoo Nice</h1>
                <h5 style={{color:'white'}} className="fw-normal">
                    Anuther nice thing whitch is used be someone  i don,t know 
                </h5>
                <Link to="/shop"
                className="btn btn-primary mt-3 py-3 px-4 fw-bold text-light">
                    Shop now
                </Link>
                
            </div>
          </Container> 
          <div className="position-absolute top-0 start-0    mt-2 ms-2 d-flex flex-column">          
       
                <button className=" btn btn-primary mt-2 " onClick={handleLogout}>Logout</button>
         
          </div>
       
    </div>
    )
}