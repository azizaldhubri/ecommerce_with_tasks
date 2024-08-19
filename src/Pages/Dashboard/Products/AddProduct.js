import { useEffect, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Axios } from "../../../Api/axios";
import { CAT, Pro} from "../../../Api/Api";
import LoadingSubmit from "../../../Component/Loading/Loading";
import {useNavigate } from "react-router-dom";

export default function AddProduct(){

    const[form,setForm]=useState({
       category:'Select Category',
       title:'',
       description:'',
       price:'',
       discount:'',
       About:''
    }) 
//   تم انشاء  منتج وهمي من شان رفع الصور 
    const dummyForm={
      category:null,
      title:'dumm',
      description:'dumm',
      price:222,
      discount:0,
      About:'about'
    }
    const[images,setImages]=useState([]);
      
    const[categories,setCategories]=useState([]);
    // const[deleteCat,setDeletCat]=useState([]);
    const[sent,setSent]=useState(false);    
      const[Loading,setLoading]=useState(false);
    const [id,setId]=useState();
    const nav=useNavigate();
   

    useEffect(()=>{
        
        Axios.get(`/${CAT}`)            
        .then((data)=>setCategories(data.data))             
        .catch((err)=>console.log(err));
    },[]);

    const focus=useRef('');
    const openImage=useRef(null);
    const progress=useRef([]);
    const ids=useRef([]);
   
       // handle focus
    useEffect(()=>{     
     focus.current.focus();
    },[]);
    
     //handle change
    function handleChange (e){
        
        setForm({...form,[e.target.name]: e.target.value});
          setSent(true);
        
        if(sent !==true){

          HandleSubmitForm();
        }
        
    }

    //handle submit form
    async function HandleSubmitForm(){
     
      try{
        const res =await Axios.post(`${Pro}/add`,dummyForm);
        setId(res.data.id)
      }

      catch(err){
        console.log(err)
      }
    }
      // handle edit
    async function HandleEdit(e){
      // console.log('HandleEdit')
        setLoading(true);
        e.preventDefault();
         
        try{
        
          await Axios.post(`${Pro}/edit/${id}`,form);
              nav('/dashboard/products')
        }catch(err){
            setLoading(false);
            console.log(err)
        }
    }

      //handle open image
    function handleOpenImage(){
      openImage.current.click()
    }
    
    const j=useRef(-1);

    //handle image chang
    async function HandleImagesChange(e){
      setImages((prev)=>[...prev,...e.target.files]);
     
      const imagesAsFiles=e.target.files;
      const data=new FormData();
      
      for(let i=0;i<imagesAsFiles.length;i++){
        j.current++ ;
        data.append('image',imagesAsFiles[i]);
        data.append('product_id',id);
        // console.log(data)
        try{
          const res= await Axios.post('/product-img/add',data,{
            onUploadProgress:(ProgressEvent)=>{
              const { loaded,total}=ProgressEvent ;
              const percent=Math.floor((loaded*100)/total);
              
              if(percent %10===0 ){
                progress.current[j.current].style.width=`${percent}%` ;
                progress.current[j.current].setAttribute('percent',`${percent}%`) ;                              
              }
                        
            }
          });
          ids.current[j.current]=res.data.id ;
        }
        catch(err){console.log(err)}
      }

    }
    // handle delet image
    async function HandelImageDelet(id,img){
    const findId=ids.current[id];
    try{
      await Axios.delete(`product-img/${findId}`);
      setImages((prev)=>prev.filter((imgi) =>imgi !==img));
      ids.current=ids.current.filter((i)=>i !==findId);
      j.current-- ;
      
    }
    catch(err){
      console.log(err)
    }

    }


   // mapping
    const categoriesShow=categories.map((item,key)=>(
    <option key={key} value={item.id}>{item.title}</option>))

    const imagesShow=images.map((item,index)=>(
      <div key={index} className="border p-2 w-100">
        <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center justify-content-start gap-2">
            <img src={URL.createObjectURL(item)} width='80px' alt=" img product"></img>
            <div>
              <p className="mb-1">{item.name}</p>

              <p >{item.size/1024 <900 ?
              (item.size/1024).toFixed(2)+'kB'
              :(item.size/(1024*1024)).toFixed(2)+'MB'}
              </p>         
            </div>
            </div>
            <button onClick={()=>HandelImageDelet(index,item)} className="dlet">Delete</button>

      </div>
          <div className="custom-progress mt-3">
            <span 
           
            ref={(e)=>(progress.current[index]=e)}
                   
              className="inner-progress"></span>
        </div>
      </div>
    ))

    return(
      <>
      {/* onSubmit={HandleSubmit}  */}
            {Loading  && <LoadingSubmit />}
        <Form  className="bg-white w-100" onSubmit={HandleEdit}  >

        <Form.Group className="mb-3" controlId="Category">
                <Form.Label>Category:</Form.Label>
                <Form.Select
                ref={focus}                 
                name="category"             
                value={form.category}
                onChange={handleChange} >
                    <option disabled>Select Category</option>   
                  {categoriesShow}
                 </Form.Select> 
           </Form.Group>
       
           <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title:</Form.Label>
                <Form.Control 
                required  
                name="title"              
                value={form.title}
                onChange={handleChange}                  
                 type="text" 
                 placeholder="Title ..." 
                 disabled={!sent}
                 />
           </Form.Group>

           <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description:</Form.Label>
                <Form.Control 
                required  
                name="description"              
                value={form.description}
                onChange={handleChange}                  
                 type="text" 
                 placeholder="Description ..." 
                 disabled={!sent}/>
           </Form.Group>

           <Form.Group className="mb-3" controlId="Price">
                <Form.Label>Price:</Form.Label>
                <Form.Control 
                required   
                name="price"             
                value={form.price}
                onChange={handleChange}                  
                 type="number" 
                 placeholder="Price ..." 
                 disabled={!sent}/>
           </Form.Group>

           
           <Form.Group className="mb-3" controlId="discount">
             <Form.Label>discount:</Form.Label>
                <Form.Control 
                type="number"
                name="discount" 
                value={form.discount}
                onChange={handleChange}
                placeholder="discount ..."
                disabled={!sent}
                />
           </Form.Group>

           <Form.Group className="mb-3" controlId="About">
             <Form.Label>about:</Form.Label>
                <Form.Control 
                type="text"
                name="About" 
                value={form.About}
                onChange={handleChange}
                placeholder="About ..."
                disabled={!sent}
                />
           </Form.Group>

           <Form.Group className="mb-3" controlId="images">
             <Form.Label>Images:</Form.Label>
                <Form.Control
                ref={openImage}
                hidden
                multiple 
                onChange={HandleImagesChange}
                type="file"                
                disabled={!sent}
                />
           </Form.Group>
           <div
           onClick={handleOpenImage}
           className="d-flex 
           align-items-center 
           justify-content-center
            gap-2 py-3 rounded  mb-2 w-100 flex-column "
            style={{border:!sent ? '2px dashed gray':'2px dashed #0086fe',
            cursor: sent && "pointer"}}
            >
            <img src={require('../../../Assets/images.jpg')}
            alt="upload here"
            width='100px'
            style={{filter:!sent && 'grayscale(1)'}}
            >
            </img>
            <p className="fw-bold mb-0" style={{color:!sent ?'gray':'#0086fe'}} >Upload Images</p>
           </div>

               <div className="d-flex align-items-start flex-column gap-2">  
                 {imagesShow} 
                 </div> 
        
            <button className="btn btn-primary">Save</button>
                   
    
    </Form>
      </>
    )
}