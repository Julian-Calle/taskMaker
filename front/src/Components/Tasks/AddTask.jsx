import { useForm } from 'react-hook-form';
import { newTask } from '../../https/tasks';
import { useHistory } from 'react-router-dom';

import './form.css';
const AddTask = function ({ setActive }) {
  const colors = ['white', 'blue', 'red', 'yellow', 'grey', 'pink'];
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    console.log(data);
    const load = async () => {
      await newTask(
        data.task,
        data.taskColor,
        data.typeTask,
        data.dateLimitTask
      );
    };
    load();
    setActive(false);
  };
  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="formContainer">
        <textarea
          type="text"
          name="task"
          id="task"
          placeholder="Introduce la tarea..."
          className="textTask"
          ref={register({ required: true, minLength: 5 })}
        />
        {errors.task && (
          <p className="messageError">*Es obligatorio introducir una tarea</p>
        )}
        <select name="taskColor" id="taskColor" ref={register()}>
          {colors.map((color, index) => {
            return (
              <option style={{ backgroundColor: color }} value={color}>
                {color}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="typeTask"
          id="typeTask"
          placeholder="Tipo de tarea"
          ref={register()}
        />
        <fieldset>
          <label htmlFor="dateLimitTask">Fecha límite </label>
          <input
            type="date"
            name="dateLimitTask"
            id="dateLimitTask"
            ref={register()}
          />
        </fieldset>
      </fieldset>
      <fieldset className="addButtonContainer">
        <button className="addButton">Añadir</button>
      </fieldset>
    </form>
  );
};

export default AddTask;
