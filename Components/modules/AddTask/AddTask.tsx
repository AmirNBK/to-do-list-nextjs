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
    const { tasks, setTasks } = useContext<mainContextType>(MainContext);
    const notify = () =>
        toast.success('Your task added!', {
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
            notify();
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
            console.error(error);
        }
    };



    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <div className={styles.AddTaskContainer}>
            <div className={styles.searchBar}>
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
            <Image
                style={{ cursor: 'pointer' }}
                src={burgerMenu}
                alt="Picture of the author"
            />
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
        </div>
    );
};

export default AddTask;
