import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { Axios } from "../../../Api/axios"

import {  USER, USERS } from "../../../Api/Api"


export default function AddTaskes(){
   
    const[id,setId]=useState('');
    const[sender_name,setSender_name]=useState('');
     const[receivertask_id,setReceivertask_id]=useState('');
    const[title,setTitle]=useState('');
    const[users,setUsers]=useState([]);
   

    
    useEffect(()=>{
        try{
            Axios.get(`${USERS}`)
            .then(e=>{
                setUsers(e.data.data);                
                                    })
        }
        catch(err){console.log(err)}
    },[])

    useEffect(()=>{
        try{
            Axios.get(`${USER}`)
            .then(e=>{
                setId(e.data.id);                
                setSender_name(e.data.name);                
                                    })
        }
        catch(err){console.log(err)}
    },[])

    

    
    
   
    
    // --------------handleSubmite---------------
    
    async function handlesubmit(e){
        e.preventDefault();
        
        const data=new FormData()
        data.append('title',title);
        data.append('user_id',id)
        data.append('sender_name',sender_name)
        data.append('receiver_id',receivertask_id)
        data.append('receiver_name',receiver_name)
        
        
        
        try{
               await Axios.post('tasks/add',data)
              window.location.pathname='dashboard/taskes'
        }
        catch(err){console.log(err)}
        
    }

    const selectUser=users.map((item,index)=>(           
             item.id !==id &&
         <option value={item.id}  >{item.name}</option>
        
        ))
        let receiver_name='' ;
    {receivertask_id &&(
         users.map((item,index)=>(           
            item.id ==receivertask_id &&
            (receiver_name=item.name)
       
       
       ))
    ) }
             
    return(
        <div className=" w-100  ">
            <h5 className="mt-2 d-flex">
                Add  New Taskes 
                </h5>
            
            <div className=" w-100  d-flex align-items-center justify-content-start mt-2">
                <Form onSubmit={handlesubmit}className=" d-flex  w-100 flex-column">
                    <Form.Group >
                        <Form.Control
                            type="text"
                            name="title"
                            // value={form.title}
                            // onChange={handelChange}
                            onChange={(e)=>setTitle(e.target.value)}
                            placeholder="Add new task ... " >
                        </Form.Control>            
                                                
                    </Form.Group>

                   
                    <Form.Group  className="d-flex form-control border-0 gap-2">
                            <Form.Select style={{width:'30%'}}
                            value={receivertask_id}
                            
                            // name={receivertask_id}
                            // onChange={handelChange}
                            onChange={(e)=>{setReceivertask_id(e.target.value);
                              

                            }}
                            >
                                <option  disabled value={''}>Select User</option>
                                {selectUser}
                            </Form.Select>
                         <button className="btn btn-primary " disabled ={receiver_name ? false:true }>Add</button>
                        </Form.Group>
        

                </Form>

            </div>           
    
        </div>
    )
}