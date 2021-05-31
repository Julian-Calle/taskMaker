import { useEffect, useState } from 'react';
import TaskCard from '../Components/Tasks/TaskCard';
import { getTask } from '../https/tasks';


export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getAllTasks = async () => {
      const data = await getTask();
      console.log(data);
      setTasks(data)
    };
    getAllTasks();
  },[]);
  
  
  return (
    <section className="tasksContainer">
      <TaskCard taksList={tasks} />
    </section>
  );
}
