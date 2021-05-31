import { useForm } from 'react-hook-form';
import './form.css';
export default function AddTask() {
  const colors = ['blue', 'red', 'yellow', 'grey', 'pink', 'white'];
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        type="text"
        name="task"
        id="task"
        placeholder="Introduce la tarea..."
        className="textTask"
        ref={register({ required: true })}
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
      <button>Añadir</button>
    </form>
  );
}
