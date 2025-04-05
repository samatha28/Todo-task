import React from "react";
import { Layout, Menu} from 'antd';
const {  Sider } = Layout;
import { Link } from "react-router-dom";


function Nav(){
    const items = [{item:"ToDo List",path:"/"},{item:"Student List",path:"/Student"}].map(
        (item) => ({
         path:item.path,
          
          label: item.item,
        }),
      );
      console.log(items)
    return(
        <div>
        <Sider className="sider" >
        
      <Menu  className="menu">
          {items.map((item)=>(
         <Menu.Item key={item.label}>
         <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
          ))}
      </Menu>
   </Sider>
      
 </div>
    )
}
export default Nav