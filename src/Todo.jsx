import React, { useState } from "react";

function Todo(){
    const[text,setText]=useState("")
    const[tasks,setTasks]=useState([])
    const[edit,setEdit]=useState("")

      const handlechange=(e)=>{
        setText(e.target.value)
        console.log(text)
      }
      const task=()=>{
        // const newtask={
        //     id:tasks.id+1,task:text
        // }
    
       setTasks([...tasks,text])
       
       console.log(tasks)
       
      }
      const Delete=(deletetask)=>{
        console.log(deletetask)
    //    tasks= tasks.filter((item)=>item!==deletetask)
       setTasks((prevtask)=>prevtask.filter((item)=>item !==deletetask))


      }
      const Edit=()=>{
        setTasks()
      }

    return(
      
       <div className="main">

        <div className="value">
           
            <input type="text" value={text} onChange={handlechange}></input>
            <button onClick={task}>submit</button>
       </div>

        {tasks.map((item)=>(
            <div className="flex">
                <p key={item.id}>{item}</p>
                <button>Edit</button>
                <button onClick={()=>Delete(item)}>Delete</button>
            </div>
        ))}
    
      </div>
        
    )
}
export default Todo