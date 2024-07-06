import { Outlet } from "react-router-dom";
import SideBar from "../../Component/Dashboard/Sidebar";
import TopBar from "../../Component/Dashboard/TopBar";
import './dashboard.css'

export default function Dashboard(){
    return(
        <div  className="position-relative">
            <TopBar/>
            <div  className="dashboard d-flex gap-1 "style={{marginTop:'70px'}} >
                
            <SideBar/>
            <Outlet/>
            </div>
        </div>
        
    )
}