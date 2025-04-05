import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Table, Tabs } from "antd";
const { TabPane } = Tabs;
import { Header } from "antd/es/layout/layout";

function Student(){
  const [personalDetails, setPersonalDetails] = useState([])
  const [academicDetails, setAcademicDetails] = useState([])
  const [studentId, setStudentId] = useState("")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [className, setClassName] = useState("")
  const [teluguMarks, setTeluguMarks] = useState("")
  const [englishMarks, setEnglishMarks] = useState("")
  const [hindiMarks, setHindiMarks] = useState("")
  const [profilePersonalDetails, setProfilePersonalDetails] = useState(null)
  const [profileAcademicDetails, setProfileAcademicDetails] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [editingAcademicData, setEditingAcademicData] = useState(null)

  useEffect(()=>{
    const personaldata = localStorage.getItem("personalDetails")
    const academicdata =localStorage.getItem("academicDetails")
    setPersonalDetails(personaldata ? JSON.parse(personaldata):[])
    setAcademicDetails(academicdata ? JSON.parse(academicdata):[])
  },[])

 
  const addPersonalDetails = () => {
    if (!studentId || !name || !age || !className) {
      alert("All fields are required!");
      return
    }
    if (personalDetails.some((student) => student.studentId === studentId)) {
      alert("Student ID must be unique!");
      return
    }
    const newStudent = { studentId, name, age, className };
    setPersonalDetails([...personalDetails, newStudent]);
    resetPersonalForm()
  };

 const handleEditPersonal = (record) => {
    setEditingStudent(record)
    setStudentId(record.studentId)
    setName(record.name)
    setAge(record.age)
    setClassName(record.className)
  };

 const handleUpdatePersonal = () => {
    if (!studentId || !name || !age || !className) {
      alert("All fields are required!");
      return
    }
    const updatedDetails = personalDetails.map((student) => student.studentId === editingStudent.studentId
        ? { ...student, studentId, name, age, className } : student
    )
    setPersonalDetails(updatedDetails)
    setEditingStudent(null)
    resetPersonalForm()
  }


  const handleDeletePersonal = (record) => {
    const updatedPersonalDetails = personalDetails.filter( (student) => student.studentId !== record.studentId )
    setPersonalDetails(updatedPersonalDetails);

  const updatedAcademicDetails = academicDetails.filter((academic) => academic.studentId !== record.studentId)
    setAcademicDetails(updatedAcademicDetails);
     alert("Student deleted successfully!");
  }

 const resetPersonalForm = () => {
    setStudentId("")
    setName("")
    setAge("")
    setClassName("")
  }

const handleAcademicData = (record) => {setStudentId(record.studentId);
    const AcademicData = academicDetails.find((academic) => academic.studentId === record.studentId)

    if (AcademicData) {
      setEditingAcademicData(AcademicData);
      setTeluguMarks(AcademicData.teluguMarks);
      setEnglishMarks(AcademicData.englishMarks);
      setHindiMarks(AcademicData.hindiMarks);
    } else {
      setEditingAcademicData(null);
      setTeluguMarks("");
      setEnglishMarks("");
      setHindiMarks("");
    }
    setIsModalVisible(true);
  };

const handleAcademicSubmit = () => {
    if (!teluguMarks || !englishMarks || !hindiMarks) {
      alert("All fields are required!");
      return
    }
    const totalMarks =
      parseInt(teluguMarks) + parseInt(englishMarks) + parseInt(hindiMarks)
    const percentage = ((totalMarks / 300) * 100).toFixed(2)
    const academicDetail = {
      studentId,
      teluguMarks,
      englishMarks,
      hindiMarks,
      totalMarks,
      percentage,
    };


    if (editingAcademicData) {
    const updatedAcademicDetails = academicDetails.map((academic) =>academic.studentId === studentId ? academicDetail : academic)
      setAcademicDetails(updatedAcademicDetails)
    } else {
      setAcademicDetails([...academicDetails, academicDetail])
    }
    setIsModalVisible(false)
    resetAcademicForm()
  }

 const handleEditAcademic = (record) => {
    setEditingAcademicData(record)
    setStudentId(record.studentId)
    setTeluguMarks(record.teluguMarks)
    setEnglishMarks(record.englishMarks)
    setHindiMarks(record.hindiMarks)
    setIsModalVisible(true)
  };

  const handleDeleteAcademic = (record) => {
    const updatedAcademicDetails = academicDetails.filter((academic) => academic.studentId !== record.studentId )
    setAcademicDetails(updatedAcademicDetails)
    alert("Academic details deleted successfully!")
  }
   const resetAcademicForm = () => {
    setTeluguMarks("");
    setEnglishMarks("");
    setHindiMarks("");
  }

  const searchProfile = () => {
    if (!studentId) {
      alert("Please enter a Student ID!")
      return
    }
    const personal = personalDetails.find((p) => p.studentId === studentId)
    const academics = academicDetails.filter((a) => a.studentId === studentId)

   if (personal) {
      setProfilePersonalDetails(personal);
    } else {
      setProfilePersonalDetails(null);
      alert("Student not found in Personal Details");
    }


    if (academics.length > 0) {
      setProfileAcademicDetails(academics);
    } else {
      setProfileAcademicDetails(null);
      alert("No academic details found for this student");
    }
  }

const personal_Details = (
    <div className="personal">
      <Input placeholder="Student ID" value={studentId}
        onChange={(e) => setStudentId(e.target.value)}  required />
      <br />
      <Input placeholder="Name" value={name}
        onChange={(e) => setName(e.target.value)} required/>
      <br />
      <Input placeholder="Age" value={age}
        onChange={(e) => setAge(e.target.value)} required />
      <br />
      <Input placeholder="Class" value={className}
        onChange={(e) => setClassName(e.target.value)} required/>
      <br />
      <br />
      <Button type="primary"
     onClick={editingStudent ? handleUpdatePersonal : addPersonalDetails}> 
     {editingStudent ? "Update Personal Details" : "Add Personal Details"} </Button>
      
      <Table
        dataSource={personalDetails}
        columns={[
          { title: "Student ID", dataIndex: "studentId" },
          { title: "Name", dataIndex: "name" },
          { title: "Age", dataIndex: "age" },
          { title: "Class", dataIndex: "className" },
          { title: "Actions", key: "actions", render: (_, record) => (
         <div>
            <Button onClick={() => handleEditPersonal(record)}
            type="primary" style={{ marginRight: "8px" }}>  Edit </Button>
            <Button onClick={() => handleAcademicData(record)}
            type="primary" style={{ marginRight: "8px" }}> Academic Data</Button>
            <Button onClick={() => handleDeletePersonal(record)}
             type="primary">Delete</Button>
              </div>
            )}
        ]}
      />
    </div>
  );

 const academic_Details = (
    <div>
      <Table
        dataSource={academicDetails}
        columns={[
          { title: "Student ID", dataIndex: "studentId" },
          { title: "Telugu Marks", dataIndex: "teluguMarks" },
          { title: "English Marks", dataIndex: "englishMarks" },
          { title: "Hindi Marks", dataIndex: "hindiMarks" },
          { title: "Total Marks", dataIndex: "totalMarks" },
          { title: "Percentage", dataIndex: "percentage" },
          { title: "Actions",key: "actions", render: (_, record) => (
          <div>
            <Button onClick={() => handleEditAcademic(record)}
              type="primary" style={{ marginRight: "8px" }}> Edit</Button>
            <Button onClick={() => handleDeleteAcademic(record)}
               type="primary" > Delete </Button>
              </div>
            )}
        ]}
      />
    </div>
  );



  const profile = (
    <div className="searchid">
    <div className="search-input">
    <Input placeholder="Enter Student ID" value={studentId}
        onChange={(e) => setStudentId(e.target.value)} required />
     
      <Button type="primary" onClick={searchProfile}>
        Search Profile
      </Button>
    </div>


      {profilePersonalDetails && (
        <div>
          <h3>Personal Details:</h3>
          <p>Student ID: {profilePersonalDetails.studentId}</p>
          <p>Name: {profilePersonalDetails.name}</p>
          <p>Age: {profilePersonalDetails.age}</p>
          <p>Class: {profilePersonalDetails.className}</p>
        </div>
      )}


      {profileAcademicDetails && profileAcademicDetails.length > 0 && (
        <div>
          <h3>Academic Details:</h3>
          <Table
            dataSource={profileAcademicDetails}
            columns={[
              { title: "Student ID", dataIndex: "studentId" },
              { title: "Telugu Marks", dataIndex: "teluguMarks" },
              { title: "English Marks", dataIndex: "englishMarks" },
              { title: "Hindi Marks", dataIndex: "hindiMarks" },
              { title: "Total Marks", dataIndex: "totalMarks" },
              { title: "Percentage", dataIndex: "percentage" },
            ]}
          />
        </div>
      )}


      {!profileAcademicDetails || profileAcademicDetails.length === 0 ? (
        <p>No academic details found for this student.</p>
      ) : null}
    </div>
  );


  return (
    
    <div style={{ padding: "20px" }}>
       <Header className="header">STUDENT LIST</Header>
     
      <Tabs defaultActiveKey="1">
        <TabPane tab="Personal Details" key="1">
          {personal_Details}
        </TabPane>
        <TabPane tab="Academic Details" key="2">
          {academic_Details}
        </TabPane>
        <TabPane tab="Profile" key="3">
          {profile}
        </TabPane>
      </Tabs>


      <Modal
        title="Academic Details"
        open={isModalVisible}
        onOk={handleAcademicSubmit}
        onCancel={() => setIsModalVisible(false)}>

    <label>Telugu Marks:</label>
    <Input type="number" value={teluguMarks} placeholder="Enter Telugu marks"
    onChange={(e) => setTeluguMarks(e.target.value)} required></Input>
         
    <label>English Marks:</label>
    <Input type="number"  value={englishMarks}  placeholder="Enter English marks"
     onChange={(e) => setEnglishMarks(e.target.value)}  required></Input>
         
    <label>Hindi Marks:</label>
    <Input type="number" value={hindiMarks} placeholder="Enter Hindi marks"
    onChange={(e) => setHindiMarks(e.target.value)}  required ></Input>
         
      </Modal>
    </div>
  );
};


export default Student;

