
import { useForm } from 'react-hook-form';

import "../../css/editForm.css"
const colors = ['white', 'blue', 'red', 'yellow', 'grey', 'pink']; 


const getDateInFormat =(dateTochange)=>{
  // console.log(dateTochange);
const date =dateTochange?.split("T")[0]
return date;
}


export default function EditForm({taskInfo,setTask,updateTask,socket,change,setChange,updateListOfTask}) {
const initialValues={...taskInfo, timeLimit:getDateInFormat(taskInfo.timeLimit)}


// socket.off('newChange', doThisOnlyOnce).on('MY_EVENT', doThisOnlyOnce);
socket?.on("newChange", (data) => {
  if(change){
  
    setChange(false)
    console.log(data);
    setTask(data);
    updateListOfTask();
  }
  // socket.removeAllListeners()
});


    const { register, errors, handleSubmit } = useForm(    
      {
        defaultValues: initialValues
      }
      );

const taskChange = (data) => {
  if(new Date(data.timeLimit) > new Date()){
console.log("en edit form");
    console.log({...taskInfo,...data});
    setTask({...taskInfo,...data});
    updateTask({...taskInfo,...data})
    socket?.emit("edition",{...taskInfo,...data})
  }
    
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
          />
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
            <label htmlFor="dateLimitTask">Fecha l??mite </label>
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
