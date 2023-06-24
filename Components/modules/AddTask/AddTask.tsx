import React from 'react';
import styles from './AddTask.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import AddTaskInput from '../AddTaskInput/AddTaskInput';

const AddTask = () => {
    return (
        <>
            <div className={`${styles.AddTaskContainer} justify-between`}>
                <div className='mx-auto my-0 hidden md:block'>
                    <AddTaskInput />
                </div>
                <h2 className='block md:hidden font-bold text-2xl'
                    style={{ color: '#94ADCF' }}
                > My Tasks </h2>

            </div>
        </>
    );
};

export default AddTask;
