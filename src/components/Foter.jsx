import React from "react";
import { Layout} from 'antd';
const {  Footer } = Layout;

function Foter(){
    return(
        <div>
            <Footer style={{
            textAlign: 'center',backgroundColor:"#D9EEF3"
          }} >
          {/* Ant Design ©{new Date().getFullYear()} Created by Ant Sam */}
          @Sam...
        </Footer>
        </div>
    )
}
export default Foter