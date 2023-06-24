import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import AddTask from '@/Components/modules/AddTask/AddTask';
import TaskComponent from '@/Components/modules/TaskComponent/TaskComponent';
import { MainContext, MainContextType } from '../Context/Services/Procider/Provider';
const inter = Inter({ subsets: ['latin'] });
import styles from './index.module.scss';
import ConnectionIcon from '../Components/Assets/Icons/ConnectionIcon';
import add from '../Components/Assets/Icons/Add.svg'
import EmptyTask from '@/Components/modules/EmptyTask/EmptyTask';
import AddTaskInput from '@/Components/modules/AddTaskInput/AddTaskInput';
import Head from 'next/head';
import { fetchTasks } from './api/fetchData';

interface Task {
  task: string;
  isComplete: boolean;
  id: string;
}

interface HomeProps {
  data: Task[];
}

export default function Home({ data }: HomeProps) {
  const { tasks, setTasks, offlineTasks, setOfflineTasks } = useContext<MainContextType>(MainContext);
  const [isAddTask, setIsAddTask] = useState(false)
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(window.navigator.onLine);
    setTasks(data);

    const offlineTasksString = localStorage.getItem('offlineTasks');
    if (offlineTasksString) {
      const parsedOfflineTasks = JSON.parse(offlineTasksString);
      setOfflineTasks(parsedOfflineTasks);
    }
  }, []);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-start sm:p-24 p-8 ${inter.className}`}>
      <Head>
        <title>To do list</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h4 className='w-full' style={{ color: 'rgba(148, 173, 207, 0.7)' }}>
        {isOnline ?
          <div className='flex flex-row items-center mb-4 justify-center lg:justify-start'
          >
            Online mode
            <div className='ml-2'>
              <ConnectionIcon color='#82CD47' />
            </div>
          </div> :
          <div className='flex flex-row items-center mb-4'
          >
            Offline mode
            <div className='ml-2'>
              <ConnectionIcon color='#FC2947' />
            </div>
          </div>
        }
      </h4>
      <AddTask />
      {
        isOnline ?
          tasks.length > 0 ? (
            <div
              className={`w-full flex flex-row flex-wrap ${styles.mainContainer}`}
              style={{ columnGap: '50px' }}
            >
              {tasks?.map((item: Task) => (
                <TaskComponent
                  title={item.task}
                  isComplete={item.isComplete}
                  id={item.id}
                  key={item.id}
                  onDeleteTask={() => fetchTasks(setTasks)}
                />
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center mt-12' style={{ color: 'rgba(148, 173, 207, 0.7)' }}>
              <EmptyTask />
            </div>
          )
          :
          offlineTasks?.length > 0 ? (
            <div
              className={`w-full flex flex-row flex-wrap ${styles.mainContainer}`}
              style={{ columnGap: '50px' }}
            >
              {offlineTasks?.map((item: Task) => (
                <TaskComponent
                  title={item.task}
                  isComplete={item.isComplete}
                  id={item.id}
                  key={item.id}
                  onDeleteTask={() => fetchTasks(setTasks)}
                />
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center mt-12' style={{ color: 'rgba(148, 173, 207, 0.7)' }}>
              <EmptyTask />
            </div>
          )
      }
      {isAddTask && <div className='mt-10 w-full md:hidden block'>
        <AddTaskInput />
      </div>}
      <div className='absolute right-7 bottom-7 block md:hidden cursor-pointer'
        onClick={() => setIsAddTask(!isAddTask)}
      >
        <Image src={add} alt='Add' />
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
