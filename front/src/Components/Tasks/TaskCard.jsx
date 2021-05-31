import React, { useEffect, useState } from "react";
import "../../css/tasks.css";
import Modal from "../modals/Modal";
import ButtonIcon from "../utils";
import EditForm from "./EditForm";

const test =(e)=>{
  console.log(e.target);
}

export default function TaskCard({taksList}) {
  
  const [editModal,setEditModal]= useState(false)
  

  return( 
    
    <div className="cardTaskContainer">
      <Modal active ={editModal}  title={"Editar TASK"} body={<EditForm/>} actBtn={true}  btnName="CANCELAR" btnAction={()=>setEditModal(!editModal)} closeAction={()=>setEditModal(!editModal) } 
secBtnAction={()=>{console.log("second")}} ></Modal>
{/* <Modal active ={editModal} actBtn={true} actSecBtn={true} title={"hola"} closeAction={()=>setEditModal(!editModal) } 
secBtnName="cancelar" btnName="OK" btnAction={()=>{console.log("fist")}} secBtnAction={()=>{console.log("second")}} body={<h2>hech_T</h2>} ></Modal> */}
    {taksList.map((task,index)=>{
          return (
            
          <div  key = {task.id} className="cardTask">
          <div className="colorTask" style ={{backgroundColor: `${task.color}`}}>{task.color}{task.id}</div>
          <p className="contentTask">{task.task}</p>
          <div className="actionTasks">
          <ButtonIcon action={()=>{setEditModal(!editModal)}} icon="edit" cls="editIcon cardIcon"/>
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