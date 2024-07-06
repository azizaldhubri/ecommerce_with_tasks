import { Axios } from "../../../Api/axios.js"
import { useEffect, useState } from "react"
 import {CAT} from './../../../Api/Api.js'
import ShowSkeleton from "../../../Component/Website/Skeleton/Skeleton.js";



export default function Category(){
    const[categories,setCategories]=useState([]);
    const[laoding,setLoading]=useState(true);

    useEffect(()=>{
        
        Axios.get(`${CAT}`)
        .then(res=>setCategories(res.data))
        .finally(()=>setLoading(false))
    },[])

    const showCategrie=categories.map((item)=>(
        <div className="col-lg-2 col-md-6 col-12 bg-transparent border-0 ">
            <div   className="m-1 bg-white border 
                d-flex align-items-center  justify-content-start gap-3 rounded py-2 h-100 ">
                <img width='50px' src={item.image} alt="f"></img>
                <p className="m-0">{item.title.length >14 ?item.title.slice(1,10)+'...':item.title}</p>


        </div>
        </div>
    ))
    return (
    <div className="col-12  ">
        
        <div
         className=" col-12 d-flex align-items-center justify-content-center flex-wrap ">

        {laoding ?(
        <ShowSkeleton
        width='120px'
        length='100'
        height='60px'
        
        />): showCategrie}
        </div>
    </div>)
}