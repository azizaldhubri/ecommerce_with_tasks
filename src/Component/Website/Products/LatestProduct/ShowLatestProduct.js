import { useEffect, useState } from "react"
import { Axios } from "../../../../Api/axios"
import { Latest } from "../../../../Api/Api"
import ShowSkeleton from "../../Skeleton/Skeleton"
import Saleproduct from "../SaleProducts/SaleProduct"


export default function ShowLatestProduct(){
    const [products,setProductes]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        Axios.get(`${Latest}`)
        .then(res=>setProductes(res.data))
        .finally(()=>setLoading(false))
    },[])

    const ShowProduct=products.map((product ,index)=>(
     < Saleproduct key={index}
     title={product.title}
     description={product.description}
     price={product.price}
     discount={product.discount}
     img={product.images[0].image}
     rating={product.rating}
     col='6'
     
     />
    ))
     

    
    return(
        <div className="col-md-6 col-12 ">
        <div className="ms-md-3 " >
            <h1>Latest Product</h1>
            <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2 mp-5">
                {loading ?(
                    <ShowSkeleton 
                    height='300px'
                  
                    length='3'
                    classess='col-md-6 col-12'
                    />
                  
                ):ShowProduct}

             
            </div>

        </div>

        </div>
      
    )
}