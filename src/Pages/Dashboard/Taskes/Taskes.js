import { useEffect,  useState } from "react"
import { Axios } from "../../../Api/axios"
import { Link } from "react-router-dom"
import { USER, USERS } from "../../../Api/Api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faPlus, faStar, faTrash } from "@fortawesome/free-solid-svg-icons"
import TransformTime from "../../../Helpers/TransformTime"
import LoadingSubmit from "../../../Component/Loading/Loading"


export default function Temptask1(){     
        const[refresh,setrefresh]=useState(0)   
        const[userId,setUserId]=useState('');     
        const[tasks,setTasks]=useState([]);       
        const[incomingTasks,setIncomingTasks]=useState(true)
        const[chiled_task,setchiled_task]=useState([]);
        const[loading,setLoading]=useState(true);
        let iswrritten=true ;
        let countCommit=0 ;
   
        useEffect(()=>{
            Axios.get(`${USER}`)
            .then(res=>{
                setUserId(res.data.id);  })
        },[])
        useEffect(()=>{
            Axios.get('chiled_task')
            .then((e)=>{setchiled_task(e.data);
              setLoading(false);                
            })
         },[refresh])
        
           
        useEffect(()=>{
            async function gettask(){
            try{  await  Axios.get('tasks')
                .then(e=>{setTasks(e.data.post);
               setLoading(false);
                  })                             
            }
            catch(err){console.log(err)}
        }
        gettask();

        },[])

          
        return(
            <>
           
           {loading && <LoadingSubmit/>} 
                <div className=" w-100 px-3 py-3 ">
                    <div className=" w-100  d-flex align-items-center justify-content-between  ">
                                  
                        <div  className="d-flex   justify-content-center justify-content-between mt-1 gap-3  w-100 ">
                        <button className="btn btn-primary mb-3 w-25" disabled={!incomingTasks} onClick={()=>setIncomingTasks(perv=>!perv)}>task sending</button>
                        <button className="btn btn-primary mb-3 w-25"disabled={incomingTasks} onClick={()=>setIncomingTasks(perv=>!perv)}>task incoming</button>
                        <Link className="btn btn-primary mb-3" to='/dashboard/addTask'>New task</Link>
                        </div> 
                    </div>    
                <div  className="d-flex  flex-column  mt-2 "  >           
                       
                        <div className="mt-3">
                            {tasks.map((task,index)=>(
                                <div key={index}>
                                   {/* {(incomingTasks && task.receiver_id==userId) &&  */}
                                        <>
                                 {countCommit===0}
                               {iswrritten=true}
                                {(userId==(incomingTasks?task.receiver_id:task.user_id)) &&                            
                            <div className="p-2 d-flex gap-5 text-danger 
                             align-items-center border rounded  mt-2 "style={{boxShadow:'0 5px 5px rgba(0,0,0,0.3)'}}>
                                
                                <h5 className="m-0">{task.id}</h5>
                                <h5 className="m-0">{task.sender_name}</h5>
                               
                                
                                {/* <p className="m-0">{task.title} </p> */}
                                <Link to={`${task.id}`}
                                className="text-danger   w-100  d-flex  align-items-center justify-content-between m-0 ">
                                    <div className="d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faStar} className="text-dark"></FontAwesomeIcon>
                                <p className="m-0">{task.title}</p>
                                    </div>
                                <h6 className="m-0  ">{TransformTime(task.created_at)}</h6>

                                </Link>
                                {iswrritten=false}
                            </div>}
                             {incomingTasks &&
                            
                              chiled_task.map((item ,nm)=>(
                            
                                (item.task_id==task.id && item.receiver_id==userId && iswrritten)&&
                                <div key={nm} className="p-2 d-flex gap-5 text-danger
                                 align-items-center border rounded  mt-2 "style={{boxShadow:'0 5px  5px rgba(0,0,0,0.3)'}}>
                                    
                                    <h5 className="m-0">{task.id}</h5>
                                    <h5 className="m-0">{item.sender_name}</h5>
                                    
                                    
                                    <Link to={`${task.id}`}className="text-danger d-flex w-100  m-0 gap-3
                                    align-items-center justify-content-between ">
                                    <div className="d-flex align-items-center gap-2">
                                    <FontAwesomeIcon icon={faStar} className="text-dark"></FontAwesomeIcon>
                                    <p className="m-0">{task.title} </p>                                    
                                    </div>
                                    <h6 className="m-0  ">{TransformTime(task.created_at)}</h6>
                                    </Link>
                                    
                                    {iswrritten=false}
                                </div>
                                  ))                                 
                                                                   
                                  }
                             
                            </>
                                </div>
                            
                            )
            )                      
                            }

                        </div>
                        
                         
                    </div> 
                </div>
            </>
            )
    }