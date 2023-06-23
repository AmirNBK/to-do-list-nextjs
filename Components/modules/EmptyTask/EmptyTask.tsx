import Image from 'next/image';
import finger from '../../Assets/Images/finger.svg';
import React from 'react';

const EmptyTask = () => {
    return (
        <div>
            <Image src={finger} alt='emptyWarning' className='mx-auto w-28 md:relative absolute left-3 bottom-3	rotate-90 md:rotate-0 md:left-0 md:bottom-0' />
            <h4 className='mt-5 text-lg font-medium hidden md:block'> Get started by adding your tasks! </h4>
        </div>
    );
};

export default EmptyTask;