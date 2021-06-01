import { useEffect, useState }  from 'react';
import { useForm } from 'react-hook-form';

import "../../css/editForm.css"
const colors = ['white', 'blue', 'red', 'yellow', 'grey', 'pink'];

const addZero=(value)=>{ 
  return ( value > 9)?value:`0${value}`;
}
const getDateInFormat =(dateTochange)=>{
const date =dateTochange?.split("T")[0]
console.log(date);
return date;
}


export default function EditForm({taskInfo,setTask,updateListOfTask}) {
const initialValues={...taskInfo, timeLimit:getDateInFormat(taskInfo.timeLimit)}

    const { register, errors, handleSubmit } = useForm(    
      // {
      //   defaultValues: initialValues
      // }
      );


const taskChange = (data) => {
  setTask({...taskInfo,...data})
  updateListOfTask();
    console.log({...taskInfo,...data});
    updateListOfTask();
}



const dateChange = (data) => {
    setTask({...taskInfo,timeLimit:data.dateLimitTask})
    console.log(data);
}
    return (

        <form  className="taskForm"  onChange={handleSubmit(taskChange)}>
        <fieldset className="formContainer">
          <textarea
            type="text"
            name="task"
            placeholder="Introduce la tarea..."
            className="textTask"
            value={taskInfo.task}
            
            ref={register({ required: true, minLength: 1 })}
            onChange={handleSubmit(taskChange)}
          ></textarea>
          {errors.task && (
            <p className="messageError">*Es obligatorio introducir una tarea</p>
          )}
          <select name="color"   ref={register()} style={{ backgroundColor: taskInfo.color }} value={taskInfo.color} onChange={handleSubmit(taskChange)}>
              {/* <option style={{ backgroundColor: taskInfo.color }} selected value={taskInfo.color}  >{taskInfo.color} </option> */}
              {/* .filter((color)=>color!==taskInfo.color) */}
            {colors.map((color, index) => {
               
              return (
                
                <option key={color} style={{ backgroundColor: color }} value={color} >{color}</option>
              );
            })}

          </select>
          <input
            type="text"
            name="type"
            placeholder="Tipo de tarea"
            onChange={handleSubmit(taskChange)}
            ref={register()}
            
            value={(taskInfo.type)??""}
          />
          <fieldset>
            <label htmlFor="dateLimitTask">Fecha límite </label>
            <input
              type="date"
              name="timeLimit"
              onChange={handleSubmit(taskChange)}
               value={initialValues.timeLimit??""}
              ref={register()}
            />
          </fieldset>
        </fieldset>

      </form>
    )
}
