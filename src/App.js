import HomePage from './Pages/Websit/HomePage/HomePage';
// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Users from './Pages/Dashboard/Users/Users';
import GoogleCallBack from './Pages/Auth/GoogleCallBack';
import Dashboard from './Pages/Dashboard/Dashboard';
import RequireAuth from './Pages/Auth/RequireAuth';
import UserUpdate from './Pages/Dashboard/Users/UserUpdate';
import AddUser from './Pages/Dashboard/Users/AddUser';
import Writer from './Pages/Dashboard/Writer';
import Err404 from './Pages/Auth/404';
import RequirBack from './Pages/Auth/RequireBack';
import Categories from './Pages/Dashboard/Categories/Categories';
import AddCategory from './Pages/Dashboard/Categories/AddCategory';
import CategoryUpdate from './Pages/Dashboard/Categories/CategoryUpdate';
import Products from './Pages/Dashboard/Products/Products';
import AddProduct from './Pages/Dashboard/Products/AddProduct';
import ProductUpdate from './Pages/Dashboard/Products/ProductUpdate';
import Category from './Pages/Websit/Categories/Categories';
import WebSite from './Pages/Websit/WebSite';
import AddTaskes from './Pages/Dashboard/Taskes/AddTask';
import Taskes from './Pages/Dashboard/Taskes/Taskes';





function App() {
  return (
    <div className="App">
    <Routes>
      {/* public Routes */}
    <Route element={<WebSite/>}> 
    <Route path='/' element={<HomePage/>}> </Route>
    <Route path='/Category' element={<Category/>}> </Route>
    </Route>
    <Route element={<RequirBack/>}>   
        <Route path='/login' element={<Login/>}> </Route>
        <Route path='/Register' element={<Register/>}> </Route>
       
    </Route>
    <Route path='/auth/google/callback' element={<GoogleCallBack/>}></Route>
    <Route path='/*' element={<Err404/>}></Route>
    {/* protected Routes */}
    <Route element={<RequireAuth allowedRole={['1996','1995','1999','2001']}/>}>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route element={<RequireAuth allowedRole={['2001','1995']}/>}>        
            <Route path='users'element={<Users/>}/>           
            <Route path='users/:id' element={<UserUpdate/>}></Route>            
            <Route path='user/add' element={<AddUser/>}></Route>
            <Route path='addTask' element={<AddTaskes/>}></Route>
            <Route path='taskes' element={<Taskes/>}></Route>        
           
          </Route>  
          <Route element={<RequireAuth allowedRole={['1999','1995','2001']}/>}> 
          {/* //     Categories    */}
            <Route path='Categories' element={<Categories/>}></Route>
            <Route path='Categories/:id' element={<CategoryUpdate/>}></Route>
            <Route path='Category/add' element={<AddCategory/>}></Route>

                 {/* products */}
            <Route path='Products' element={<Products/>}></Route>
            <Route path='Products/:id' element={<ProductUpdate/>}></Route>
            <Route path='Product/add' element={<AddProduct/>}></Route>
           


          </Route>   
          <Route element={<RequireAuth allowedRole={['1996','1995']}/>}>        
            <Route path='writer' element={<Writer/>}></Route>
          </Route>  

        </Route>

    </Route>

    </Routes>
   
    </div>
  );
}

export default App;
