// import { Link } from "react-router-dom";
// import { Axios } from "../../../Api/axios";
// import Cookie from 'cookie-universal' ;
// import { LOGOUT } from "../../../Api/Api";


import './Home.css'

import ShowLatestProduct from "../../../Component/Website/Products/LatestProduct/ShowLatestProduct";
import LatestSaleProduct from "../../../Component/Website/Products/SaleProducts/ShowLatestSaleProduct";
import Landing from "../../../Component/Website/Landing/Landing";

import ShowTopRated from '../../../Component/Website/Products/TopRated/ShowTopRated';

export default  function HomePage() {
 
  // const cookie=Cookie();

  // async function handleLogout(){
  //   try{
  //      await Axios.get(`/${LOGOUT}`);         
  //    window.location.pathname='/login'
  //    cookie.remove('e-commerce');
  //   }
  //   catch(err){
  //       console.log(err)
  //   }

  //   }
  return (
      <div >
        
      <Landing/>
     
      <LatestSaleProduct/>
      <div className="w-100 d-flex  align-items-start flex-wrap mt-5" >
        <ShowTopRated/>
        <ShowLatestProduct/>

      </div>
      </div>
   
  );
}


