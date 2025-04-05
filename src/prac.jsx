// import React, {  useState } from "react";
// import {  Button, Input, Table } from "antd";

// import { Tabs } from 'antd';
// const {TabPane} =Tabs;

// const onChange = (key) => {
//   console.log(key);
// };
// function Student(){
//     const[personalDetails,setPersonalDetails]=useState([])
//     const[academicDetails,setAcademicDetails]=useState([])
//     const [name, setName] = useState("")
//     const [age, setAge] = useState("")
//     const [className, setClassName] = useState("")
//     const [subject, setSubject] = useState("")
//     const [marks, setMarks] = useState("")
//     const[percentage,setPercentage]=useState("")
   
//     const items = [
//         { key: '1', label: 'Personal Details',},
//         { key: '2',label: 'Academic Details',},]

//      const AddPersonalDetails = () => {
//         setPersonalDetails([...personalDetails, { name, age, className }])
//         setName("")
//         setAge("")
//         setClassName("")
//         };

        
//   const AddAcademicDetails = () => {
//     setAcademicDetails([...academicDetails, { subject, marks, percentage }])
//       setSubject("")
//       setMarks("")
//       setPercentage("")
    
//   };
   
            
  
//     const personal_Details = (
//            <div className="personal">
           
//               <Input className="line"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <br />
//               <Input className="line"
//                 placeholder="Age"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//               />
//               <br />
//               <Input className="line"
//                 placeholder="Class"
//                 value={className}
//                 onChange={(e) => setClassName(e.target.value)}
//               />
//               <br /> <br/>
//               <Button type="primary" onClick={AddPersonalDetails}>
//                 Add Personal Details
//               </Button>
        
//               <Table
//                 dataSource={personalDetails}
//                 columns={[
//                   { title: "Name", dataIndex: "name" },
//                   { title: "Age", dataIndex: "age" },
//                   { title: "Class", dataIndex: "className" },
//                 ]}  />
//            </div>
//           );


//         const academic_Details = (
//           <div>
            
//               <Input className="line"
//                 placeholder="Subject"
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}/><br />

//               <Input className="line"
//                 placeholder="Marks"
//                 value={marks}
//                 onChange={(e) => setMarks(e.target.value)}/><br />
                
//               <Input className="line"
//               placeholder="Percentage"
//               value={percentage}
//               onChange={(e) => setPercentage(e.target.value)}/><br /><br />

             

//               <Button type="primary"
//               onClick={AddAcademicDetails}>
//                 Add Academic Details
//               </Button>
        
//               <Table
//                 dataSource={academicDetails}
//                 columns={[
//                 { title: "student", dataIndex: "student" },
//                 { title: "marks", dataIndex: "marks" },
//                 { title: "percentage", dataIndex: "percentage" },
//                 ]}  />
//           </div>
//           );
        
      
//     return(
//         <div>
//             <h1>StudentList</h1>
//             {/* <Tabs defaultActiveKey="1" items={items} onChange={onChange} /> */}
           
//            <Tabs>
//                 <TabPane tab="Personal Details"  key="1" style={{width:"100%"}}>
//                     {personal_Details}
//                 </TabPane>
//                 <TabPane tab="Academic Details" key="2" style={{width:"100%"}}>
//                    {academic_Details}
//                 </TabPane>
//             </Tabs>
//     </div>
// )
// }
// export default Student