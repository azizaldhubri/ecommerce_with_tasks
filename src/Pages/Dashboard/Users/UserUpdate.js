import { useEffect, useState } from "react";
// import { Form } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/Api";
import LoadingSubmit from "../../../Component/Loading/Loading";

import { useNavigate, useParams } from "react-router-dom";

export default function UserUpdate(){
    const [name,setName]=useState('')
    const [role,setRole]=useState('');
    const [email,setEmail]=useState('');
    const[disable,setDisable]=useState(true);
    const[Loading,setLoading]=useState(false);
    
    const nav=useNavigate();
    
    // const id=Number(window.location.pathname.replace('/dashboard/users/','')) ;
    const {id}=useParams();
     

    useEffect(()=>{
        setLoading(true);
        Axios.get(`${USER}/${id}`)
        .then(data =>{setName(data.data.name);
            setEmail(data.data.email);
            setRole(data.data.role);
            setLoading(false);
            console.log(data.data)
        })
            .then(()=>setDisable(false))
            .catch(()=>nav('/dashboard/users/page/404'))

    },[])

    async function HandleSubmit(e){
        setLoading(true);
        e.preventDefault();
        try{
            await Axios.post(`${USER}/edit/${id}`,{
                name:name,
                email:email,
                role:role
            });
            window.location.pathname='/dashboard/users'
        }catch(err){
            setLoading(false);
            console.log(err)
        }
    }
    return(
      <>
            {Loading  && <LoadingSubmit />}
        <Form  className="bg-white w-100" onSubmit={HandleSubmit} >
       
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>User Name:</Form.Label>
                <Form.Control 
                required               
                value={name}
                onChange={(e)=>setName(e.target.value)}                  
                 type="text" 
                 placeholder="Name ..." />
           </Form.Group>
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Email:</Form.Label>
                <Form.Control                
                value={email}
                onChange={(e)=>setEmail(e.target.value)}                
                 type="email" placeholder="Email ..." />
           </Form.Group>

           <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Role:</Form.Label>
                <Form.Select                
                value={role}
                onChange={(e)=>setRole(e.target.value)}                
              >
                <option disabled value=''>Select Role</option>
                <option value='1995'>Admin</option>
                <option value='2001'>User</option>
                <option value='1996'>Writer</option>
                </Form.Select>
           </Form.Group>
            
        
            <button disabled={disable} className="btn btn-primary">Save</button>
          
              
    
    </Form>
      </>
    )
}