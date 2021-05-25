import React, { useEffect, useState } from "react";
import "../../css/tasks.css";
import Modal from "../modals/Modal";
import ButtonIcon from "../utils";

const test =(e)=>{
  console.log(e.target);
}

export default function TaskCard({taksList}) {
  
  const [editModal,setEditModal]= useState(false)
  

  return( 
    
    <div className="cardTaskContainer">
<Modal active ={editModal}></Modal>
    {taksList.map((task,index)=>{
          return (
            
          <div  key = {task.id} className="cardTask">
          <div className="colorTask" style ={{backgroundColor: `${task.color}`}}>{task.color}{task.id}</div>
          <p className="contentTask">{task.task}</p>
          <div className="actionTasks">
          <ButtonIcon action={test} icon="edit" cls="editIcon cardIcon"/>
          <ButtonIcon icon="trash" cls="deleteIcon cardIcon"/>
          <ButtonIcon icon="user-plus" cls="shareIcon cardIcon"/>
          <ButtonIcon icon="send" cls="sendIcon cardIcon"/>
          </div>
          </div>

          )

          })}
          
          </div>      
          )
  
}