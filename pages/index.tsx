import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import AddTask from '@/Components/modules/AddTask/AddTask';
import TaskComponent from '@/Components/modules/TaskComponent/TaskComponent';
import { MainContext, mainContextType } from '../Context/Services/Procider/Provider';
import finger from '../Components/Assets/Images/finger.svg';
const inter = Inter({ subsets: ['latin'] });
import styles from './index.module.scss';
import ConnectionIcon from '@/Components/Assets/Icons/connectionIcon';

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
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(window.navigator.onLine)
    setTasks(data);
  }, []);

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
    <main className={`flex min-h-screen flex-col items-center justify-start p-24 ${inter.className}`}>
      <h4 className='w-full' style={{ color: 'rgba(148, 173, 207, 0.7)' }}>
        {isOnline ?
          <div className='flex flex-row items-center'
          >
            Online mode
            <div className='ml-2'>
              <ConnectionIcon color='#82CD47' />
            </div>
          </div> :
          <div className='flex flex-row items-center'
          >
            Offline mode
            <div className='ml-2'>
              <ConnectionIcon color='#FC2947' />
            </div>
          </div>
        }
      </h4>
      <AddTask />
      {tasks.length > 0 ? (
        <div
          className={`w-full flex flex-row flex-wrap ${styles.mainContainer}`}
          style={{ columnGap: '50px' }}
        >
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
      ) : (
        <div className='flex flex-col items-center mt-12' style={{ color: 'rgba(148, 173, 207, 0.7)' }}>
          <Image src={finger} alt='emptyWarning' className='mx-auto w-28' />
          <h4 className='mt-5 text-lg font-medium'> Get started by adding your tasks! </h4>
        </div>
      )}
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
