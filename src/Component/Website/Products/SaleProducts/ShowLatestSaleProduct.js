import { useEffect, useState } from "react"
import { LatestSale } from "../../../../Api/Api"
import Saleproduct from "./SaleProduct"
import { Axios } from "../../../../Api/axios"
import { Container } from "react-bootstrap"

import ShowSkeleton from "../../Skeleton/Skeleton"

 export default function LatestSaleProduct(){
    
    const [products,setProductes]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        Axios.get(`${LatestSale}`)
        .then(res=>setProductes(res.data))
        .finally(()=>setLoading(false))
    },[])

    const ShowProduct=products.map((product,index)=>(
     <Saleproduct 
     key={index}
     title={product.title}
     description={product.description}
     price={product.price}
     discount={product.discount}
     img={product.images[0].image}
     rating={product.rating}
     col='3'
     />
    ))
     
 
    
    
    return(
  
        <Container>
            <h1 className="mt-3">Latest Sale Product</h1>
            <div className="d-flex align-items-center justify-content-center flex-wrap mt-3 mp-5">
                
          {loading ? 
                 (<ShowSkeleton   
                    height='300px'
                    // baseColor="gray"
                    length='5'
                    classess='col-lg-3 col-md-6 col-12' />)
                    : ShowProduct}
          {/* {loading ? ShowSkeletonn: ShowSkeletonn} */}
     
    </div>
        </Container>
      
    )
 }