
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solid} from "@fortawesome/free-solid-svg-icons"
import { faStar as regular} from "@fortawesome/free-regular-svg-icons"
import StringSlice from "../../../../Helpers/StringSlice";

 export default function Saleproduct(props){
    const star=Math.round(props.rating)
        //   console.log(star)

const goldStar=Array.from({length:star}).map((_,item)=>(
    <FontAwesomeIcon key={item} style={{color:'gold'}} icon={solid}/>
))
const regularStar=Array.from({length:5-star}).map((_,item)=>(
    <FontAwesomeIcon key={item} icon={regular}/>
))
   
    return(
        
             <div className={`col-lg-${props.col} col-md-6 col-12 mt-2`}   >
             <div className="m-1 border rounded p-3 h-100 d-flex flex-column ">
                <div >
                    <p className="m-0 " style={{color:'gray'}}>{StringSlice(props.title,8)} </p>
                    <p className="m-0 ">{StringSlice(props.description,15)} </p>
                
                </div>
                <div className="px-5 py-4 position-relative ">
                    
                    <p  className="m-0 position-absolute top-0 start-0  bg-primary 
                    text-white  rounded-circle text-center"
                    style={{width:'50px', height:'50px' ,lineHeight:'50px'}}>SALE</p>

                    
                    <div className="w-100" alt=''
                    style={{
                        backgroundImage:`url(${props.img})`,                     
                        backgroundPosition:'center',
                        backgroundSize:'cover',
                        height:'170px',
                        width:'100%'
                    }}>
                

                    </div>
                </div>
               
                <div className="d-flex align-items-center justify-content-between pt-4 border-top ">
                                       
                    <div>
                        {goldStar}
                        {regularStar}                       
                    
                        <div className="d-flex align-items-center  gap-3">
                                <p className=" text-primary">{props.price}$</p>
                                <p className="text-decoration-line-through" style={{color:'gray'}}>{props.discount}$</p>
                        </div>

                    </div>   

                    <div className="border rounded b-2 ">
                        <img src={require('../../../../Assets/images/cart.png')}
                        alt=""
                        width='50px'></img>

                    </div>         
                </div>
            </div>
                   
        </div>
       
    )
 }