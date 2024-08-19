import { useEffect, useState } from "react"
import { CAT, Cat, USER} from "../../../Api/Api";

// import Cookie from 'cookie-universal' ;
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Component/Dashboard/Table";



export default function Categories(){
    const[categories,setCategories]=useState([]);
        const[page,setPage]=useState(1)
    const[limit,setLimit]=useState(3)
    const[loading,setLoading]=useState(false)
    const[total,setTotal]=useState(0)
    const[role,setRole]=useState('')
    useEffect(()=>{        
     Axios.get(`/${USER}`)            
     .then((res)=>{setRole(res.data.role)
     });         
 },[]);

    

    // const cookie=Cookie();

          // get all categories

        //   useEffect(()=>{
        
        //     Axios.get(`/${CAT}`)            
        //     .then((data)=>setCategories(data.data))             
        //     .catch((err)=>console.log(err));
        // },[deleteCat]);
    useEffect(()=>{
            setLoading(true)       
            Axios.get(`/${CAT}? limit=${limit}&page=${page}`)            
            .then((data)=>{setCategories(data.data.data) ;setTotal(data.data.total)} )           
            .catch((err)=>console.log(err)).finally(()=>setLoading(false));
        },[limit,page]);

   
 


        const header=[
            {   
                key:'title',
                name:'Title'
            },
            {  
                key:'created_at',
                name:'Created' 
            }
            ,
            {   
                key:'updated_at',
                name:'Updated_at'
            } ,
            {   
                key:'image',
                name:'Image'
            }           
         ]

         async function handleDelet(id){
            try{
                
               await Axios.delete(`${Cat}/${id}`); 
                // setDeletCat((prev)=>prev+1)                                 
                setCategories((prev)=>prev.filter((item)=>item.id !==id))  
                             
             }
            catch(err){
                        console.log(err)
                   }         
           }

 
    return (
      <div className="bg-white w-100 p-2">
        <div className="d-flex align-items-center justify-content-between">
             <h1>Categories page</h1>
             <Link className="btn btn-primary" to='/dashboard/category/add'>Add Category</Link>
        </div>
      
          <TableShow 
          limit={limit}
          setLimit={setLimit}
          page={page}
          header={header}
          data={categories}
          delete={handleDelet} 
          setPage={setPage}
          loading={loading}
          total={total}
          search='title'
          Linksearch={Cat}
          role={role}
          />

          {/* <PaginatedItems itemsPerPage={5}/> */}
          {/* <PaginatedItems setPage={setPage} itemsPerPage={5} data={categories}/> */}
         

      </div>
    
     )
}