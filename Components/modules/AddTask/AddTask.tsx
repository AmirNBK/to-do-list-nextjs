import React, { useState, ChangeEvent, useContext } from 'react';
import burgerMenu from '../../Assets/Icons/Burger.svg';
import plus from '../../Assets/Icons/plus.svg';
import Image from 'next/image';
import axios from 'axios';
import styles from './AddTask.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainContext, mainContextType } from '../../../Context/Services/Procider/Provider';

interface Task {
    task: string;
    isComplete: boolean;
    id: string;
}

const AddTask = () => {
    const { setTasks } = useContext<mainContextType>(MainContext);
    const notify = () =>
        toast.warning('please check your connection and reload the page so that we can save your data', {
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

            const response = await axios.post(
                'https://647cf535c0bae2880ad15c4d.mockapi.io/api/v1/tasks',
                {
                    task,
                    isComplete: false,
                }
            );
        } catch (error) {
            notify()
        }
    };



    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className={`${styles.AddTaskContainer} justify-between`}>
                <div className={`${styles.searchBar} hidden md:block`}>
                    <input
                        className={styles.input}
                        placeholder="Add new task"
                        value={task}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <Image
                        className={styles.plusIcon}
                        style={{ cursor: 'pointer' }}
                        src={plus}
                        alt="Plus icon"
                        onClick={handleAddTask}
                    />
                </div>
                <h2 className='block md:hidden font-bold text-2xl'
                    style={{ color: '#94ADCF' }}
                > My Tasks </h2>
                <Image
                    style={{ cursor: 'pointer' }}
                    src={burgerMenu}
                    alt="Picture of the author"
                />
            </div>
        </>
    );
};

export default AddTask;
