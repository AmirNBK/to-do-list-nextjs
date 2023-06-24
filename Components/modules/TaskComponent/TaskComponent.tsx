import React, { useContext, useState } from 'react';
import Image from 'next/image';
import deleteIcon from '../../Assets/Icons/1398919_close_cross_incorrect_invalid_x_icon.svg';
import styles from './TaskComponent.module.scss';
import { MainContext, mainContextType } from '../../../Context/Services/Procider/Provider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchTasks } from '@/pages/api/fetchData';

const TaskComponent = (props: {
    title: string;
    isComplete: boolean;
    id: string;
    onDeleteTask: () => void;
}) => {
    const { setTasks, setOfflineTasks, offlineTasks } = useContext<mainContextType>(MainContext);
    const { title, isComplete, id, onDeleteTask } = props;
    const [isChecked, setIsChecked] = useState(isComplete);

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

    const handleInputChange = async (taskId: string) => {
        setIsChecked(!isChecked);
        try {
            await axios.put(
                `https://647cf535c0bae2880ad15c4d.mockapi.io/api/v1/tasks/${taskId}`,
                {
                    isComplete: !isComplete,
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        setTasks((prevTasks: any) => prevTasks.filter((task: any) => task.id !== taskId));
        setOfflineTasks((prevTasks: any) => prevTasks.filter((task: any) => task.id !== taskId));
        localStorage.setItem('offlineTasks', JSON.stringify([...offlineTasks.filter((task: any) => task.id !== taskId)]));
        try {
            await axios.delete(
                `https://647cf535c0bae2880ad15c4d.mockapi.io/api/v1/tasks/${taskId}`
            );
            onDeleteTask();
        } catch (error) {
            notify();
        }
        fetchTasks(setTasks)
    };

    return (
        <div className={styles.TaskComponent}>
            <div className={styles.leftSide}>
                <input
                    type="radio"
                    checked={isChecked}
                    onChange={() => handleInputChange(id)}
                    onClick={() => handleInputChange(id)}
                />
                <h1 className={isChecked ? styles.completed : ''}>{title}</h1>
            </div>
            <div className={styles.iconContainer}>
                <Image
                    src={deleteIcon}
                    className={styles.icon}
                    alt="deleteIcon"
                    onClick={() => handleDeleteTask(id)}
                />
            </div>
        </div>
    );
};

export default TaskComponent;
