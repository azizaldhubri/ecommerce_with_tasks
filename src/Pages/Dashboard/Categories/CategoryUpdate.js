import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Axios } from "../../../Api/axios";
import { Cat } from "../../../Api/Api";
import LoadingSubmit from "../../../Component/Loading/Loading";

import { useNavigate, useParams } from "react-router-dom";

export default function CategoryUpdate(){
    const[title,setTitle]=useState('');
    const[image,setImage]=useState('');  
    
   const[disable,setDisable]=useState(true);
    const[Loading,setLoading]=useState(false);
    
    const nav=useNavigate();
    
    // step 1 to get id
    // const id=Number(window.location.pathname.replace('/dashboard/categories/','')) ;

    // step 2 to get id
    const {id}=useParams();

    useEffect(()=>{
        setLoading(true);
        Axios.get(`${Cat}/${id}`)
        .then(data =>{setTitle(data.data.title);
            setLoading(false)
        })
            .then(()=>setDisable(false))
            .catch(()=>nav('/dashboard/categories/page/404'))

    },[])

    async function HandleSubmit(e){
        setLoading(true);
        e.preventDefault();
        const form=new FormData();
        form.append('title',title);
        form.append('image',image);

        try{
           await Axios.post(`${Cat}/edit/${id}`,form);
            window.location.pathname='/dashboard/categories'
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
                <Form.Label>Title:</Form.Label>
                <Form.Control 
                required               
                value={title}
                onChange={(e)=>setTitle(e.target.value)}                  
                 type="text" 
                 placeholder="Title ..." />
           </Form.Group>
           <Form.Group className="mb-3" controlId="Image">
             <Form.Label>Image:</Form.Label>
                <Form.Control 
                type="file"
                onChange={(e)=>setImage(e.target.files.item(0))}
                />
           </Form.Group>
           
        
            
        
            <button disabled={disable} className="btn btn-primary">Save</button>
          
              
    
    </Form>
      </>
    )
}