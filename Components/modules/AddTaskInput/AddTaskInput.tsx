// AddTaskInput.tsx
import Image from 'next/image';
import React, { useState, ChangeEvent, useContext } from 'react';
import styles from '../AddTask/AddTask.module.scss';
import { MainContext, MainContextType } from '../../../Context/Services/Procider/Provider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import plus from '../../Assets/Icons/plus.svg';
import { fetchTasks } from '@/pages/api/fetchData';

const AddTaskInput = () => {
    const { setTasks, setOfflineTasks, offlineTasks } = useContext<MainContextType>(MainContext);

    interface Task {
        task: string;
        isComplete: boolean;
        id: string;
    }

    const notify = () =>
        toast.warning('please check your connection and reload the page', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });

    const [task, setTask] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    };

    const handleAddTask = async () => {
        if (task.trim() === '') {
            return;
        }

        try {
            const newTask = {
                task,
                isComplete: false,
                id: Date.now().toString(),
            };

            setTask('');
            setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
            setOfflineTasks((prevTasks: Task[]) => [...(prevTasks ?? []), newTask]);
            localStorage.setItem('offlineTasks', JSON.stringify([...(offlineTasks ?? []), newTask]));

            await axios.post(
                'https://647cf535c0bae2880ad15c4d.mockapi.io/api/v1/tasks',
                {
                    task,
                    isComplete: false,
                }
            );
        } catch (error) {
            notify();
        }
        fetchTasks(setTasks)
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <div className={`${styles.AddTaskContainer}`}>
            <div className={`${styles.searchBar}`}>
                <input
                    className={`${styles.input}`}
                    placeholder="Add new task"
                    value={task}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <div className=''>
                    <Image
                        className={`${styles.plusIcon} w-6 sm:w-8`}
                        style={{ cursor: 'pointer' }}
                        src={plus}
                        alt="Plus icon"
                        onClick={handleAddTask}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddTaskInput;
