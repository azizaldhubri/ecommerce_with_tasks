import { useEffect, useState } from "react"
import { Axios } from "../../../../Api/axios";
import { TopRatedApi } from "../../../../Api/Api";
import TopRated from "./TopRated";
import ShowSkeleton from "../../Skeleton/Skeleton";
export default function ShowTopRated(){
    const [products,setroducts]=useState([]);
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        Axios.get(`${TopRatedApi}`)
        .then(res=>{setroducts(res.data);
            
        })
        .finally(()=>setLoading(false))
    },[])

    const showTopRated=products.map((product,item)=>(
        <TopRated 
        key={item}
        title={product.title}
        description={product.description}
        price={product.price}
        discount={product.discount}
        img={product.images[0].image} 
        rating={product.rating}
        col='3'/>
       
    ))
    return (
        <div className="col-md-6 col-12  "style={{border:'2px solid #0D6EFD'}}>
        <h1 className="text-center p-3 bg-primary text-white">Top Rated</h1>
        <div className='p-5'>
            {loading ?(
                <ShowSkeleton
                length='3'
                height='200px'
                />
            ):(showTopRated)}
        

        </div>
       
        
       

    </div>
    )
}