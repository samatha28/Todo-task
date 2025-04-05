import React from "react";
import { Layout} from 'antd';
const { Header, Content} = Layout;
import Foter from "./Foter";
import List from "./List";
import Student from "../Student";
import { Routes,Route } from "react-router-dom";
function Main(){
   return(
       <div className="msg">
       
   <Layout>
       <Content className="content" >
          <div className="main">
         
         <Routes>
          <Route path="/" element={<List/>}/>
          <Route path="/student" element={<Student/>}/>
         </Routes>
        
          </div>
        </Content>
        <Foter/>
      
        </Layout>
        
        </div>
       )
}
export default Main