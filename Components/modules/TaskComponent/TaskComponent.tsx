import React from 'react';
import Image from 'next/image';
import deleteIcon from '../../Assets/Icons/1398919_close_cross_incorrect_invalid_x_icon.svg';
import styles from './TaskComponent.module.scss';
import axios from 'axios';

const TaskComponent = (props: {
    title: string;
    isComplete: boolean;
    id: string;
}) => {
    const { title, isComplete, id } = props;

    const handleDeleteTask = async () => {
        try {
            await axios.delete(
                `https://647cf535c0bae2880ad15c4d.mockapi.io/api/v1/tasks/${id}`
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.TaskComponent}>
            <div className={styles.leftSide}>
                <h1 className={isComplete ? styles.completed : ''}>{title}</h1>
            </div>
            <div className={styles.iconContainer}>
                <Image
                    src={deleteIcon}
                    className={styles.icon}
                    alt="deleteIcon"
                    onClick={handleDeleteTask}
                />
            </div>
        </div>
    );
};

export default TaskComponent;
