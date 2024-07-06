
import { useEffect, useState } from "react"
import {  PRO, Pro} from "../../../Api/Api";
// import Cookie from 'cookie-universal' ;
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Component/Dashboard/Table";


export default function Products(){
    const[Products,setProducts]=useState([]);
        const[page,setPage]=useState(1)
    const[limit,setLimit]=useState(3)
    const[loading,setLoading]=useState(false) 
    const[total,setTotal]=useState(0)
    
    


    
          // get all categories
    useEffect(()=>{
        setLoading(true)
            Axios.get(`/${PRO}? limit=${limit}&page=${page}`)            
            .then((data)=>{setProducts(data.data.data);setTotal(data.data.total)})             
            .catch((err)=>console.log(err)).finally(()=>setLoading(false));
        },[limit,page]);

        const header=[
            
            {   
                key:'title',
                name:'Title'
            },
            {   
                key:'images',
                name:'Images'
            },
            {  
                key:'created_at',
                name:'Created' 
            }
            ,
            {   
                key:'updated_at',
                name:'Updated'
            } ,
            {   
                key:'price',
                name:'Price'
            }
            ,
            {   
                key:'discount',
                name:'Discount'
            } 
            ,
            {   
                key:'About',
                name:'About'
            }           
         ]

         async function handleDelet(id){
            try{
                await Axios.delete(`${Pro}/${id}`); 
               setProducts((prev)=>prev.filter((item)=>item.id !==id)) 
                               
             }
            catch(err){
                        console.log(err)
                   }         
           }

 
    return (
      <div className="bg-white w-100 p-2">
        <div className="d-flex align-items-center justify-content-between">
             <h1>Products page</h1>
             <Link className="btn btn-primary" to='/dashboard/product/add'>Add Products</Link>
        </div>
          <TableShow 
          header={header}
          data={Products}
          delete={handleDelet}
          page={page}
          limit={limit}
          setLimit={setLimit}
          setPage={setPage}
          loading={loading}
          total={total}
          search='title'
          Linksearch={Pro}
          />
         

      </div>
    
     )
}