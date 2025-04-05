import React, { useState, useEffect } from "react";
import { Button, Modal, Table, InputNumber, Tabs, Row, Col } from 'antd';
import { Progress } from 'antd';
import { Header } from "antd/es/layout/layout";
function List() {
  const [value, setValue] = useState(false)
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [tabs, setTabs] = useState("1")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [totalHours, setTotalHours] = useState(0)
  const [percentage, setPercentage] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [editTask, setEditTask] = useState(null)

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    const storedCompletedTasks = localStorage.getItem("completedTasks")
    setTasks(storedTasks ? JSON.parse(storedTasks) : [])
    setCompletedTasks(storedCompletedTasks ? JSON.parse(storedCompletedTasks) : [])
  }, []); 

  useEffect(() => {
     if (tasks.length > 0 || completedTasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
      localStorage.setItem("completedTasks", JSON.stringify(completedTasks))
     }
  }, [tasks, completedTasks])


  const calculateTotalHours = () => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const diff = (end - start) / (1000 * 60 * 60); 
    setTotalHours(diff);
  };

  const AddTask = () => {
    if (!title || !description || !startTime || !endTime || !percentage ) {
      alert("Please fill in all required fields")
      return
    }

      if(percentage<0 || percentage>100){
        alert("invalid percentage value")
        return
      } 
 const newTask = {
      title,
      description,
      startTime,
      endTime,
      totalHours,
      percentage
    }

    if (percentage === '100') {
      setCompletedTasks((prevCompletedTasks) => {
        const updatedCompletedTasks = [...prevCompletedTasks, newTask]
        return updatedCompletedTasks
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.title !== newTask.title))
    } else {
      setTasks((prevTasks) => [...prevTasks, newTask])
    }
    
    
    setTitle("")
    setDescription("")
    setStartTime("")
    setEndTime("")
    setTotalHours(0)
    setPercentage('')
    setValue(false)
  };

  const EditTask = (task) => {
    setEditTask(task)
    setTitle(task.title)
    setDescription(task.description)
    setStartTime(task.startTime)
    setEndTime(task.endTime)
    setTotalHours(task.totalHours)
    setPercentage(task.percentage)
    setIsEdit(true)
    setValue(true)
  };

  const EditTaskSave = () => {
     const updatedTasks = tasks.map((item) =>
      item.title === editTask.title
        ? { ...item, title, description, startTime, endTime, totalHours, percentage }: item
    )
    
  
    if (percentage === '100') {
      setCompletedTasks((prevCompletedTasks) => {
        const updatedCompletedTasks = [...prevCompletedTasks, { title, description, startTime, endTime, totalHours, percentage }]
        return updatedCompletedTasks;
      });
      setTasks(updatedTasks.filter((item) => item.title !== editTask.title))
    } else {
      setTasks(updatedTasks)
    }

    
    setValue(false)
    setIsEdit(false)
    setTitle("")
    setDescription("")
    setStartTime("")
    setEndTime("")
    setTotalHours(0)
    setPercentage('')
  };

  const DeleteTask = (task) => {
    const updatedCompletedTasks = completedTasks.filter((item) => item.title !== task.title);
    setCompletedTasks(updatedCompletedTasks);
  };
  

  const onChange = (key) => {
    setTabs(key);
  };
  const getColour=(percentage) => {
    if (percentage <= 25) {
      return 'red'
    }if (percentage <= 50) {
      return 'yellow'
    }if (percentage <= 75) {
      return 'blue'
    }if (percentage < 99) {
      return 'orange'
    }else{
      return 'green'
    } }

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Start Time', dataIndex: 'startTime', key: 'startTime' },
    { title: 'End Time', dataIndex: 'endTime', key: 'endTime' },
    { title: 'Total Hours', dataIndex: 'totalHours', key: 'totalHours' },
    { title: 'Percentage',dataIndex: 'percentage',key: 'percentage',
      render: (_, task) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
         <Progress
          percent={task.percentage}
            strokeColor={getColour(task.percentage)}
            style={{ width: '100%' }} >
          </Progress>
       </div>
    
      ), },
    { title: 'Action',key: 'action',render: (_, task) => (
    <Button onClick={() => EditTask(task)}>Edit</Button>
      ),},];
  const completedColumns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Start Time', dataIndex: 'startTime', key: 'startTime' },
    { title: 'End Time', dataIndex: 'endTime', key: 'endTime' },
    { title: 'Total Hours', dataIndex: 'totalHours', key: 'totalHours' },
    { title: 'Percentage',dataIndex: 'percentage',key: 'percentage',},
    { title: 'Action', key: 'action', render: (_, task) => (

     
     <Button onClick={() => DeleteTask(task)}>Delete</Button>
      )
  } ]

  const items = [
    { key: '1', label: 'Tasks' },
    { key: '2', label: 'Completed Tasks' },];

  return (
    <>
      <div>
      <Header className="header">TODO LIST</Header>
     
       <Row> 
        <Col span={3} offset={21}>
        <Button type="primary" onClick={() => setValue(true)}>ADD TASK</Button>
        </Col>
       </Row>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <Tabs.TabPane tab="Tasks" key="1">
            <Table style={{ width: "100%" }} dataSource={tasks} columns={columns} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Completed Tasks" key="2">
            <Table style={{ width: "100%" }} dataSource={completedTasks} columns={completedColumns} />
          </Tabs.TabPane>
        </Tabs>

        <Modal
          title={isEdit ? "Edit Task" : "ADD TASK"}
          centered
          open={value}
          footer={null}
          onCancel={() => {
            setValue(false)
            setIsEdit(false)
          }}  >
          
          <div className="inputtype">
          <label>Title:</label><br />
          <input type="text" value={title}
             onChange={(e) => setTitle(e.target.value)}  />
          </div>
       
          <div className="inputtype">
          <label>Description:</label><br />
          <input type="text" value={description} 
          onChange={(e) => setDescription(e.target.value)} /><br /><br />
         </div>

         <div className="inputtype">
         <label>Start Time:</label>
          <input type="time" value={startTime} 
          onChange={(e) => { setStartTime(e.target.value); calculateTotalHours() }} /><br />
         </div>
         
         <div className="inputtype">
         <label>End Time:</label>
          <input type="time" value={endTime} 
          onChange={(e) => { setEndTime(e.target.value); calculateTotalHours() }} /><br />

          {totalHours !== null && (
            <div>
              <h3>Total Hours: {totalHours.toFixed(2)}</h3>
            </div>
          )}
         </div>
         <div className="inputtype">
          <label>Percentage:</label>
          <input type="number" value={percentage} 
          onChange={(e) => setPercentage(e.target.value)} required />
         </div>

         <Row>
            <Col span={8} offset={20}>
            <Button type="primary" onClick={isEdit ? EditTaskSave : AddTask}>
            {isEdit ? "Update" : "Save"}
          </Button>
            </Col>
          </Row>
        </Modal>
      </div>
    </>
  )}
export default List