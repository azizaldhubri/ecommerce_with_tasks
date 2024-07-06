
import { faStar as solid} from "@fortawesome/free-solid-svg-icons";
import StringSlice from "../../../../Helpers/StringSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TopRated(props){
    const roundStar=Math.round(props.rating)
 
    const stars=Math.min(roundStar,5);

const startgold=Array.from({length:stars}).map((_,index)=>(
    <FontAwesomeIcon key={index} icon={solid} style={{color:'gold'}}/>
))
//  console.log(props.rating)  
   
    return (
        <div className="col-12 border-bottom d-flex align-items-start flex-wrap mb-2">
            <div className="col-md-4 col-12"
                style={{
                    backgroundImage:`url(${props.img})`,
                backgroundSize:'cover',
                backgroundPosition:'center',
                height:'170px'}}>

            </div>
            <div className="m-1 col-md-6  col-12  p-3 d-flex  flex-column ">
                <div>
                   <p className="">{StringSlice(props.title,7)}</p>
                    <p className="">{StringSlice(props.description,9)}</p>               
                </div>
                <div className="d-flex align-items-center  justify-content-between pt-4" >
                    <div>
                        {startgold}      
                        <div className="d-flex  align-items-center gap-3 ">
                            <p className="m-0 text-primary">{props.price}$</p> 
                            <p className="m-0" style={{color:'gray' ,textDecoration:'line-through'}} >{props.discount}$</p> 
                       </div>

                    </div>

                    <div  className="border p-2 rounded">
                      <img width='50px'src={require('./../../../../Assets/images/cart.png')}></img>
                   </div>
                </div>
            </div>        
                      

        </div>
    )
}