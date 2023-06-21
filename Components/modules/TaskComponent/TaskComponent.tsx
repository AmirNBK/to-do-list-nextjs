import React, { useContext, useState } from 'react';
import Image from 'next/image';
import deleteIcon from '../../Assets/Icons/1398919_close_cross_incorrect_invalid_x_icon.svg';
import styles from './TaskComponent.module.scss';
import axios from 'axios';

const TaskComponent = (props: {
    title: string;
    isComplete: boolean;
    id: string;
    onDeleteTask: () => void
}) => {
    const { title, isComplete, id, onDeleteTask } = props;
    const [isChecked, setIsChecked] = useState(isComplete);

    const handleInputChange = () => {
        setIsChecked(!isChecked);
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            await axios.delete(
                `https://647cf535c0bae2880ad15c4d.mockapi.io/api/v1/tasks/${taskId}`
            );
        } catch (error) {
            console.error(error);
        }
        onDeleteTask()
    };

    return (
        <div className={styles.TaskComponent}>
            <div className={styles.leftSide}>
                <input
                    type="radio"
                    checked={isChecked}
                    onChange={handleInputChange}
                    onClick={handleInputChange}
                />
                <h1 className={isChecked ? styles.completed : ''}>{title}</h1>
            </div>
            <div className={styles.iconContainer}>
                <Image src={deleteIcon} className={styles.icon} alt="deleteIcon" onClick={() => handleDeleteTask(id)} />
            </div>
        </div>
    );
};

export default TaskComponent;
