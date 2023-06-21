import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import AddTask from '@/Components/modules/AddTask/AddTask';
import TaskComponent from '@/Components/modules/TaskComponent/TaskComponent';


const inter = Inter({ subsets: ['latin'] });

interface Task {
  task: string;
  isComplete: boolean;
  id: string;
}

interface HomeProps {
  tasks: Task[];
}

export default function Home({ tasks }: HomeProps) {
  const [updatedTasks, setUpdatedTasks] = useState(tasks);

  useEffect(() => {
    // Fetch updated tasks when `updatedTasks` state changes
    fetchTasks();
  }, [updatedTasks]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        'https://647cf535c0bae2880ad15c4d.mockapi.io/api/v1/tasks'
      );
      const fetchedTasks: Task[] = await response.json();
      setUpdatedTasks(fetchedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${inter.className}`}
    >
      <AddTask onAddTask={() => setUpdatedTasks((prevTasks) => [...prevTasks])} />
      <div className='w-full'>
        {updatedTasks?.map((item) => (
          <TaskComponent title={item.task} isComplete={item.isComplete} id={item.id} key={item.id} />
        ))}
      </div>
    </main>
  );
}
