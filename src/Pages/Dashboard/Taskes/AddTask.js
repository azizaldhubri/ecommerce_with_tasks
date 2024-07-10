import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { Axios } from "../../../Api/axios"

import {  USER, USERS } from "../../../Api/Api"


export default function AddTaskes(){
   
    const[id,setId]=useState('');
    const[form,setForm]=useState({
        receivertask_id:'Select User',
        title:'' ,
        
    });
    const[receivertask_id,setReceivertask_id]=useState('');
    const[title,setTitle]=useState('');
    const[users,setUsers]=useState([]);
    const[buttonShow,setButtonShow]=useState(true);

    
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
                                    })
        }
        catch(err){console.log(err)}
    },[])

    

   const selectUser=users.map((item,index)=>(
            item.id !==id &&
        <option value={item.id}>{item.name}</option>
       ))

   
   function handelChange(e){
    setForm({...form,[e.target.name]:e.target.value});
    
   }


// --------------handleSubmite---------------

   async function handlesubmit(e){
        e.preventDefault();

            const data=new FormData()
            data.append('title',title);
            data.append('user_id',id)
            data.append('receivertask_id',receivertask_id)

            // console.log(...data)
        try{
           await Axios.post('tasks/add',data)
          window.location.pathname='dashboard/taskes'
        }
        catch(err){console.log(err)}

    }
             
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
                            name='receivertask_id'
                            // onChange={handelChange}
                            onChange={(e)=>setReceivertask_id(e.target.value)}
                            >
                                <option  disabled={true} >Select User</option>
                                {selectUser}
                            </Form.Select>
                        {buttonShow && <button className="btn btn-primary ">Add</button>}
                        </Form.Group>
        

                </Form>

            </div>           
    
        </div>
    )
}