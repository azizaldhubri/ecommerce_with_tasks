
import { Container, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './nave.css'
import { Axios } from "../../../Api/axios.js"
import { useEffect, useState } from "react"
 import {CAT} from './../../../Api/Api.js'
import StringSlice from "../../../Helpers/StringSlice.js";
import ShowSkeleton from "../Skeleton/Skeleton.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";



export default function NaveBare(){
    const[categories,setCategories]=useState([]);
    const[loading,setLoading]=useState(true);
    useEffect(()=>{
        
        Axios.get(`${CAT}`)
        .then(res=>setCategories(res.data.slice(-8)))
        .finally(()=>setLoading(false))
    },[])

    const showCategrie=categories.map((item,index)=>(
        <Link  to='/' className="ms-2 text-UpperCase " style={{color:'black'}} key={index}>
            {StringSlice(item.title,7)}</Link>
    ))
    return(
        
         <Container className='py-3 border-0'>
            <div className="w-100  d-flex align-items-center justify-content-between flex-wrap ">
           
                    <Link className='col-3  ' to='/' >
                    <img width='200px' src={require('../../../Assets/images/logo.png')} alt=""></img>
                    </Link>
                
                <div className= ' col-12 col-md-6 order-md-2 order-3  mt-md-0 mt-3  position-relative '>
                    <Form.Control  className=' custum-search py-3 rounded-0'
                    type='search'
                    placeholder='Search Product'/>
                    
                                        
                    <h3 className='btn btn-primary position-absolute top-0 end-0 line-height m-0
                     h-100 rounded-0 d-flex align-items-center justify-content-between '>search</h3>
                    

                </div>
                <div className='col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1'>
                    <Link>
                    <img width='60px' src={require('../../../Assets/images/cart.png')}alt=""></img>
                    </Link>
                    {/* <Link className="bg-primary text-danger" to='/login'>
                    <img width='40px' src={require('../../../Assets/images/profile.jpg')}
                     alt=""
                    //  style={{filter:'grayscale(1)'}}>
                      style={{filter: 'hue-rotate(180deg)'}}>
                        
                    </img>
                  </Link> */}
                  
                    
                        <Link to='/login'>
                        <FontAwesomeIcon className="w-100 fs-3 text-primary " icon={faUser}/>
                        </Link>
                    
                </div>

            </div>
            <div className="mt-3 d-flex gap-4">
                <div className="d-flex align-items-center justify-content-start gap-4">

                    {loading? (
                        <ShowSkeleton
                        length='8'
                        width='80px'
                        height='30px'
                        // baseColor='gray'
                        
                        />
                    ): (<>
                        {showCategrie} 
                        <Link to='/Category' className="text-primary ">Show All</Link>
                    </>
                    ) }
                </div>
            
            </div>
         </Container>
        


        
    )
}