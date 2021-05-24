import React, { useEffect, useState } from "react";
import "../../css/tasks.css";


export default function TaskCard({taksList}) {

  

  return( 
    <div className="cardTaskContainer">
    {taksList.map((task,index)=>{
          return (

          <div  key = {task.id} className="cardTask">
          <div className="colorTask" style ={{backgroundColor: `${task.color}`}}>{task.color}</div>
          <div className="actionTasks">
          <i className="fa fa-arrow-circle-left fa-lg"></i>
          <i className="fa fa-arrow-circle-right fa-lg"></i>
          <i className="fa fa-arrow-circle-right fa-lg"></i>
          </div>
          <p className="contentTask">{task.task}</p>
          </div>

          )

          })}
          
          </div>      
          )
  
}