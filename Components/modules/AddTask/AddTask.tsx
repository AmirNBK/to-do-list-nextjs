import React, { useState, ChangeEvent, useContext } from 'react';
import burgerMenu from '../../Assets/Icons/Burger.svg';
import Image from 'next/image';
import styles from './AddTask.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTaskInput from '../AddTaskInput/AddTaskInput';

const AddTask = () => {

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
                <div className='mx-auto my-0 hidden md:block'>
                    <AddTaskInput />
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
