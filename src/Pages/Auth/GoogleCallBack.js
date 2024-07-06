import axios from "axios"
import { useEffect } from "react"
import {GOOGLE_CALL_BACK, baseUrl } from "../../Api/Api"
import { useLocation } from "react-router-dom";
import Cookie from 'cookie-universal' ;


export default function GoogleCallBack(){
    const cookie=Cookie();
    const location=useLocation();
    
    useEffect(()=>{
        async function GoogleCall(){
            try{
            const res=  await axios.get(`${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`);
            
            const  token=res.data.access_token;
            cookie.set('e-commerce',token)
            console.log(res)

            }
            catch(err){
                console.log(err)
            }
        }
        GoogleCall();
    },[])
    return <h1>test google call back</h1>
}