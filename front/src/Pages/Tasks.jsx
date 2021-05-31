import { useEffect, useState } from 'react';
import Modal from '../Components/modals/Modal';
import AddTask from '../Components/Tasks/AddTask';
import TaskCard from '../Components/Tasks/TaskCard';
import { getTask } from '../https/tasks';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const getAllTasks = async () => {
      const data = await getTask();
      console.log(data);
      setTasks(data);
    };
    getAllTasks();
  }, []);
  const handleClick = () => {
    setActive(true);
  };

  return (
    <section className="tasksContainer">
      <button className="addTaskButton" onClick={handleClick}>
        Add task
      </button>
      <Modal
        active={active}
        title={'Crear TASK'}
        body={<AddTask setActive={setActive} />}
        actBtn={true}
        btnName="CANCELAR"
        btnAction={() => setActive(false)}
        closeAction={() => setActive(false)}
        secBtnAction={() => {
          console.log('second');
        }}
      />
      <TaskCard taksList={tasks} />
    </section>
  );
}
