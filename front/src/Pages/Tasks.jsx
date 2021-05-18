import { useEffect, useState } from 'react';
import TaskCard from '../Components/Tasks/TaskCard';
import { getAllPacks } from '../https/tasks';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const load = async () => {
      const data = await getAllPacks();
    };
    load();
  });

  return (
    <section className="tasksContainer">
      <TaskCard />
    </section>
  );
}
