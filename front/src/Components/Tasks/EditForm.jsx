import { useEffect, useState }  from 'react';
import { useForm } from 'react-hook-form';

import "../../css/editForm.css"
const colors = ['white', 'blue', 'red', 'yellow', 'grey', 'pink'];
export default function EditForm({taskInfo,setTask}) {
    const { register, errors, handleSubmit } = useForm(    {
        defaultValues: taskInfo
      });
// const handlerChange=(e)=>{
//     setTextTask(e.target.value);
//     console.log(e.target.value);
// }
// const onSubmit = (data) => {
//     console.log(data);
//     const load = async () => {
//       await newTask(
//         data.task,
//         data.taskColor,
//         data.typeTask,
//         data.dateLimitTask
//       );
//     };
//     load();
//     setActive(false);
//   };

const taskChange = (data) => {
    setTask({...taskInfo,task:data.task})
    console.log(data);
}

const colorChange = (data) => {
    setTask({...taskInfo,color:data.taskColor})
    console.log(data);
}

const typeChange = (data) => {
    setTask({...taskInfo,type:data.typeTask})
    console.log(data);
}

const dateChange = (data) => {
    setTask({...taskInfo,timeLimit:data.dateLimitTask})
    console.log(data);
}
    return (

        <form  className="taskForm" >
        <fieldset className="formContainer">
          <textarea
            type="text"
            name="task"
            placeholder="Introduce la tarea..."
            className="textTask"
            value={taskInfo.task}
            onChange={handleSubmit(taskChange)}
            ref={register({ required: true, minLength: 1 })}
          ></textarea>
          {errors.task && (
            <p className="messageError">*Es obligatorio introducir una tarea</p>
          )}
          <select name="taskColor"  onChange={handleSubmit(colorChange)} ref={register()}>
              <option style={{ backgroundColor: taskInfo.color }} selected value={taskInfo.color}  >{taskInfo.color} </option>

            {colors.filter((color)=>color!==taskInfo.color).map((color, index) => {
               
              return (
                
                <option key={color} style={{ backgroundColor: color }} value={color} >{color}</option>
              );
            })}

          </select>
          <input
            type="text"
            name="typeTask"
            placeholder="Tipo de tarea"
            onChange={handleSubmit(typeChange)}
            ref={register()}
            value={taskInfo.type}
          />
          <fieldset>
            <label htmlFor="dateLimitTask">Fecha límite </label>
            <input
              type="date"
              name="dateLimitTask"
              onChange={handleSubmit(dateChange)}
              ref={register()}
            />
          </fieldset>
        </fieldset>
        <fieldset className="addButtonContainer">
        </fieldset>
      </form>
    )
}
