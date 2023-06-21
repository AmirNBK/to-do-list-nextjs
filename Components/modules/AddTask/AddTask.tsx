import React, { useState, ChangeEvent } from 'react';
import burgerMenu from '../../Assets/Icons/Burger.svg';
import plus from '../../Assets/Icons/plus.svg';
import Image from 'next/image';
import axios from 'axios';
import styles from './AddTask.module.scss';

const AddTask = () => {
    const [task, setTask] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    };

    const handleAddTask = async () => {
        if (task.trim() === '') {
            return;
        }
        try {
            const response = await axios.post(
                'https://647cf535c0bae2880ad15c4d.mockapi.io/api/v1/tasks',
                {
                    task,
                    isComplete: false,
                }
            );
            setTask('');
        } catch (error) {
            console.error(error);
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
        </div>
    );
};

export default AddTask;
