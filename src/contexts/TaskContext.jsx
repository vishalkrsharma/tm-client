import { createContext, useEffect, useState } from 'react';
import useTask from '../hooks/useTask';
import useUserContext from '../hooks/useUserContext';

export const TaskContext = createContext([]);

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { getTasks } = useTask();
  const { user } = useUserContext();

  useEffect(() => {
    async function getTs() {
      const ts = await getTasks();
      setTasks(ts);
      localStorage.setItem('user', JSON.stringify(tasks));
    }
    if (Object.keys(user).length !== 0) {
      getTs();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return <TaskContext.Provider value={{ tasks, setTasks }}>{children}</TaskContext.Provider>;
};
