import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import AddTask from '@/Components/modules/AddTask/AddTask';
import TaskComponent from '@/Components/modules/TaskComponent/TaskComponent';
import { MainContext, mainContextType } from '../Context/Services/Procider/Provider';
import axios from 'axios';
const inter = Inter({ subsets: ['latin'] });

interface Task {
  task: string;
  isComplete: boolean;
  id: string;
}

interface HomeProps {
  tasks: Task[];
}

export default function Home({ data }: HomeProps) {
  const { tasks, setTasks } = useContext<mainContextType>(MainContext);
  useEffect(() => {
    setTasks(data)
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        'https://647cf535c0bae2880ad15c4d.mockapi.io/api/v1/tasks'
      );
      const fetchedTasks: Task[] = await response.json();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${inter.className}`}
    >
      <AddTask onAddTask={fetchTasks} />
      <div className='w-full'>
        {tasks?.map((item) => (
          <TaskComponent
            title={item.task}
            isComplete={item.isComplete}
            id={item.id}
            key={item.id}
            onDeleteTask={() => fetchTasks()}
          />
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(
      'https://647cf535c0bae2880ad15c4d.mockapi.io/api/v1/tasks'
    );
    const data: Task[] = await response.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: [],
      },
    };
  }
}
