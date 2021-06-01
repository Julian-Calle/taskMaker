import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getTasksTypes, newTask } from '../../https/tasks';

import './form.css';
const AddTask = function ({ setActive }) {
  const colors = ['white', 'blue', 'red', 'yellow', 'grey', 'pink'];
  const [taskTypes, setTaskTipyes] = useState([]);
  const [newTypeInput, setNewTypeInput] = useState(false);
  useEffect(() => {
    const load = async () => {
      const response = await getTasksTypes();
      setTaskTipyes(response.filter((value) => value !== null));
    };
    load();
  }, []);
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
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
  const handleTypeTask = (e) => {
    e.target.value === '' ? setNewTypeInput(true) : setNewTypeInput(false);
    console.log(e.target.value);
  };
  console.log(newTypeInput);
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
        <fieldset>
          <label htmlFor="taskColor">Color: </label>
          <select name="taskColor" id="taskColor" ref={register()}>
            {colors.map((color, index) => {
              return (
                <option style={{ backgroundColor: color }} value={color}>
                  {color}
                </option>
              );
            })}
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="typeTask">Tipo: </label>
          <select
            name="taskType"
            id="taskType"
            ref={register()}
            onChange={handleTypeTask}
          >
            {taskTypes.map((taskType, index) => {
              return <option value={taskType}>{taskType}</option>;
            })}
            <option value="">Nuevo tipo...</option>
          </select>
          {newTypeInput && (
            <input
              type="text"
              name="typeTask"
              placeholder="Nuevo tipo"
              ref={register({ required: true })}
            />
          )}
        </fieldset>

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
