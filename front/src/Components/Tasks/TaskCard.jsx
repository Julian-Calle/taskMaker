import React, { useEffect, useState } from "react";
import { editTask } from "../../https/tasks";
import "../../css/tasks.css";
import Modal from "../modals/Modal";
import ButtonIcon from "../utils";
import EditForm from "./EditForm";

const test =(e)=>{
  console.log(e.target);
}



export default function TaskCard({taksList}) {
  
  const [editModal,setEditModal]= useState(false)
  const defaultTaskValue={
    task:"",
    checked:false,
    timeLimit: null,
    color: "white",
    type:null,
    taskId:null

  }
  const [taskSelected, setTaskSelected] = useState(defaultTaskValue)
  useEffect(() => {
    const updateTask = async () => {
      const data = await editTask(taskSelected);
      // setTasks(data)
      console.log(data);
    };
    updateTask();
  },[taskSelected]);


  const activeEditModal =(taskToSelect)=>{
    setTaskSelected(taskToSelect);
  setEditModal(!editModal);
  }

  return( 
    
    <div className="cardTaskContainer">
      <Modal active ={editModal}  title={"Editar TASK"} body={<EditForm text={taskSelected.task} setTextTask={(value)=>{setTaskSelected(...taskSelected, taskSelected.task=value)}} />} actBtn={true}  btnName="CANCELAR" btnAction={()=>setEditModal(!editModal)} closeAction={()=>setEditModal(!editModal) } 
secBtnAction={()=>{console.log("second")}} ></Modal>
{/* <Modal active ={editModal} actBtn={true} actSecBtn={true} title={"hola"} closeAction={()=>setEditModal(!editModal) } 
secBtnName="cancelar" btnName="OK" btnAction={()=>{console.log("fist")}} secBtnAction={()=>{console.log("second")}} body={<h2>hech_T</h2>} ></Modal> */}
    {taksList.map((task,index)=>{

      const checkState= task.checked?true: false;
      const taskLimitDate= new Date(task.timeLimit).toLocaleDateString();
      console.log(taskLimitDate);
          return (
            
          <div  key = {task.id} className="cardTask">
          <div className="colorTask" style ={{backgroundColor: `${task.color}`}}>{task.color}{task.id}</div>
          <h3 className="timeLimit">{taskLimitDate}</h3>
          <p className="contentTask">{task.task}</p>
          <div className="actionTasks">
          <h3 >{task.type}</h3>
          <ButtonIcon action={()=>{activeEditModal(task)}} icon="edit" cls="editIcon cardIcon"/>
          <ButtonIcon icon="trash" cls="deleteIcon cardIcon"/>
          <ButtonIcon icon="user-plus" cls="shareIcon cardIcon"/>
          <ButtonIcon icon="send" cls="sendIcon cardIcon"/>
          <input className="checkIcon cardIcon" readOnly checked={checkState} type="checkbox" />
          </div>
          </div>

          )

          })}
          
          </div>      
          )
  
}