import { faPlus, faUsers, faCartShopping, faTruckFast } from '@fortawesome/free-solid-svg-icons'

export const Links=[
    {
        name:'Users',
        path:'users',
        icon:faUsers,
        role:['1995','2001']
        
    },
    {
        name:'Add User',
        path:'user/add',
        icon:faPlus,
        role:'1995'        
    }
    
    ,
    {
        name:'Taskes',
        path:'taskes',
        icon:faPlus,
        role:'1995'        
    },
   
    {
        name:'Categories',
        path:'categories',
        icon:faCartShopping,
        role:['1995' ,'1999','2001']       
    },
    
    {
        name:'Add Category',
        path:'Category/add',
        icon:faPlus,
        role:['1995' ,'1999'] 
        // icon:faCartShopping,
            
    },
    {
        name:'Products',
        path:'products',
        icon:faTruckFast,
        role:['1995' ,'1999','2001']       
    },
    {
        name:'Add Product',
        path:'Product/add',
        icon:faPlus,
        role:['1995' ,'1999'] 
        // icon:faCartShopping,
            
    },
  
    {
        name:'Writer',
        path:'writer',
        icon:faPlus,
        role:['1995' ,'1996']        
    }
];