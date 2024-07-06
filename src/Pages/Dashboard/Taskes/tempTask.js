import { useEffect,  useState } from "react"
import { Axios } from "../../../Api/axios"
import { Link } from "react-router-dom"
import { USER, USERS } from "../../../Api/Api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import TransformTime from "../../../Helpers/TransformTime"


export default function Temptask(){     
        const[refresh,setrefresh]=useState(0)
        const[title,setTitle]=useState('');      
        const[user_id,setUserId]=useState('');     
        const[tasks,setTasks]=useState([]);
        const[tasks_ids,setTasks_ids]=useState('');
        const[click,setClick]=useState(false);
        const[open,setopen]=useState('');
        const[openchiledtask,setOpenchiledtask]=useState('');
        const[taskeUpdate,setTaskeUpdate]=useState('');    
        const[users,setUsers]=useState([]);
        const[incomingTasks,setIncomingTasks]=useState(true)
        const[chiled_task,setchiled_task]=useState([]);
        
       
     
        useEffect(()=>{
            Axios.get(`${USER}`)
            .then(res=>{
                setUserId(res.data.id);  })
        },[])
        
          useEffect(()=>{
            Axios.get(`${USERS}`)
            .then(res=>setUsers(res.data.data));            
        },[])
        
        useEffect(()=>{
            try{
                Axios.get('tasks')
                .then(e=>setTasks(e.data.post))
            }
            catch(err){console.log(err)}
        },[refresh])
    
        useEffect(()=>{
            try{
                Axios.get(`chiled_task`)
                .then(e=>setchiled_task(e.data.post))
            }
            catch(err){console.log(err)}
        },[refresh])
    
           //---------------handledelet task---------
    
         async function handelDelete(id){            
            try{
            await Axios.delete(`tasks/${id}`)
            setTasks((perv)=>perv.filter((item)=>item.id!==id))
                              
            }
            catch(err){console.log(err)}
         }
        // handle update task
         async function handleUpdateTask(id){               
            const formdata=new FormData();
            formdata.append('title',title)
            formdata.append('id',id)
            await Axios.post(`tasks/edit/${id}`,formdata)
            .then(res=>{console.log(res.data);
                setrefresh(perv=>perv+1);
                setTitle('');
                setopen(false)                              
            })
         }
         
         //------------handle Update ChiledTask
         async function handleUpdateChiledTask(){
        
            const formdata=new FormData();
                 formdata.append('title',title)
                formdata.append('id',tasks_ids);
            await Axios.post(`chiled_task/edit/${tasks_ids}`,formdata)
            .then(res=>{console.log(res.data);
                setrefresh(perv=>perv+1);
                setTitle('');
                setopen(false)      
                
            })
         }    
         // ---------handelDeleteChiledTask
         async function handelDeleteChiledTask(id){
            try{
                await Axios.delete(`chiled_task/${id}`)
                setchiled_task((perv)=>perv.filter((item)=>item.id!==id))                                          
                }
                catch(err){console.log(err)}    
         }
         //--------------handle add comment---
    
         async function handleAddcomment(task_id){
            const formdata=new FormData();
            formdata.append('title',title)
            formdata.append('task_id',task_id)
            formdata.append('user_id',user_id)
            try{
                await Axios.post('chiled_task/add',formdata)
                .then(res=>{setrefresh(perv=>perv+1);
                                  setopen(false)                   
                })
            }
            catch(err){console.log(err)}
         }
               
        return(
            <div className=" w-100 px-3 py-3 ">
                <div className=" w-100  d-flex align-items-center justify-content-between  ">
                    <h5 className="mt-2 d-flex"> All Taskes </h5>           
                     <Link className="btn btn-primary" to='/dashboard/addTask'>New task</Link>
                </div>    
              <div  className="d-flex  flex-column justify-content-center align-items-center mt-2 "  >           
                    <div  className="d-flex   justify-content-center mt-2 gap-3  ">
                       <button className="btn btn-primary mb-3" disabled={!incomingTasks} onClick={()=>setIncomingTasks(perv=>!perv)}>task sending</button>
                       <button className="btn btn-primary mb-3"disabled={incomingTasks} onClick={()=>setIncomingTasks(perv=>!perv)}>task incoming</button>
                    </div>
                       {/* {incomingTasks && */}
                 <div className=" w-75  d-flex  flex-column justify-content-center  " >               
                 {tasks.map((task,index)=>(   
                     // لاسترجاع الرسائل الواردة                         
                    //  task.receivertask_id==user_id&&                                
                     user_id==(incomingTasks? task.receivertask_id:task.user_id )&&                                
                 <div key={index} className="d-flex form-control align-items-center mt-2 gap-2 "> 
                   <div  className=" border-0  form-control  " >
                     <div className="m-0 d-flex flex-column align-itmes-center " > 
                        
                         {users.map((user)=>
                    //  user.id===task.user_id &&
                     user.id===(incomingTasks ? task.user_id:task.receivertask_id )&&
                    //  { user.id===task.receivertask_id && user.name}
                    
                     <>
                     <div className="d-flex justify-content-between">
                         <div className="d-flex" >
                             <h6  className="m-0">{incomingTasks ? 'from:':'Task Sented to:'}</h6>
                             <h6 className="text-danger m-0 ms-2 fw-bold text-uppercase">
                                 {/* { user.id===task.user_id && user.name} </h6>  */}
                                 {/* { user.id===task.receivertask_id && user.name} </h6>  */}
                                 {  user.id===(incomingTasks ?task.user_id:task.receivertask_id )&& user.name }
                                 </h6>
                         </div>
                         <div>
                            
                         <FontAwesomeIcon  fontSize={'19px'} icon={faPlus}                          
                         onClick={()=>{  
                             setTaskeUpdate('addcomment')                                                         
                             setopen(index) ;
                             setClick(!click)
                             setTitle('')
                             setOpenchiledtask(index)                      
                              }}
                         cursor={'pointer'}
                         />

                    { user.id===task.receivertask_id &&                          
                          <FontAwesomeIcon className="ms-3 text-primary" 
                          fontSize={'19px'} icon={faPenToSquare} 
                         onClick={()=>{                                                                                     
                             setTaskeUpdate('taskUpdate')                                                         
                             setTitle(task.title)
                             setopen(index) 
                             setClick(!click)
                             setOpenchiledtask(index)}}
                          cursor={'pointer'}
                         />                                      
                            } 

                        <FontAwesomeIcon  
                        className="ms-3 text-danger"
                           onClick={()=>handelDelete(task.id)}
                             fontSize={'19px'}                                           
                             icon={faTrash}
                             cursor={'pointer'} />            
                            
                         </div>
                     </div>
                     <p  className="fs-6 m-0 d-felx flex-column "
                     cursor={'pointer'} 
                     onClick={()=>{                                                       
                         setOpenchiledtask(index)                 
                         setClick(!click)
                         }}>
 
                     <h5>{task.title}</h5>
                   <h6 className="fs-6 m-0 "style={{color:'gray'}}>{TransformTime(task.created_at)}</h6>           
 
                     </p>
                    
                     
                     {(click && openchiledtask===index)&&
 
             <div className="d-felx flex-column  justify-content-end w-100 align-items-center">                        
                         <div className="   ">
                             {chiled_task.map((child,item2)=>
                             <div key={item2}>
                         {task.id===child.task_id &&
                         <div className="form-control d-flex flex-column mt-1">
                             <div className="d-flex justify-content-between">
                                 {users.map((user2)=>
                            //    user_id===child.user_id &&
                                 
                                 (user2.id===child.user_id) && <h6 className="text-danger">{user2.name}</h6> )}
                             <div>
                                {user_id=== child.user_id &&
                                 <>
                         <FontAwesomeIcon  
                         className="text-primary"
                         fontSize={'19px'} icon={faPenToSquare} 
                         onClick={()=>{
                             setOpenchiledtask(index)                                                                                                                     
                             setTaskeUpdate('taskChiledUpdate')                                                                                                 
                             setTitle(child.title)
                              setopen(index)
                             setTasks_ids(child.id) ;
                             setClick(!click)                     
                     }}
                         cursor={'pointer'}
                         />
                     
                         <FontAwesomeIcon  className="ms-3 text-danger " 
                         onClick={()=>handelDeleteChiledTask(child.id)}
                             fontSize={'19px'}                                         
                             icon={faTrash}
                             cursor={'pointer'} />
                            
                             </> }                       
                         </div>                         
                        
 
                             </div> 
                             
                             {child.title}            
                             <p className="fs-6 m-0">{TransformTime(child.created_at)}</p> 
                         </div>}
                         </div>
                         )}
                         </div>
                         
                         
                         {/* {(sent && open===index) && */}
                         {(click && open===index) &&
                         <div className="d-flex " >
                         <input className="border-0 outlin-0 w-100 form-control " type="text" 
                         value={title} name="title" onChange={(e)=>setTitle(e.target.value)}
                         style={{background:'#C8BBBE'}}
                         >
                             
                         </input>
 
                         <button className="btn btn-primary m-2" onClick={()=>
                             taskeUpdate ==='addcomment'? handleAddcomment(task.id) 
                             :taskeUpdate ==='taskUpdate'? handleUpdateTask(task.id)
                         :handleUpdateChiledTask()
                         }>save</button>
 
                         </div>
 
                         }
                     </div>
 } 
  
                     </>
                     )}
                     </div>
                 </div>                 
                                                 
                 </div>          
                 
                 ))}                 
                 
                 </div>
                            
                 </div> 
            </div>
        )
    }