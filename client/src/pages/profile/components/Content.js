import React, { useContext } from 'react';
import UserContext from '../../../setup/app-context-manager';


function Content(props) {
    //const [context, useContext] = useContext(UserContext);
    return (
        <main className='w-full h-screen bg-[#AF4D98] pt-10'>
            <section className='w-2/3 ml-auto mr-auto bg-blue-200 rounded-md h-1/3 flex-col justify-center p-5'>
                <h3 className='font-bold text-4xl text-center'>Profile Information</h3>
                <div className='flex justify-center mt-8'>
                    <p className='text-lg'>First Name:</p>
                    <p id='first' className='ml-8 text-lg'>{props.first}</p>
                    <button></button>
                </div>
                <div className='mt-6 flex place-items-center justify-center'>
                    <p className='text-lg'>Last Name:</p>
                    <p id='last' className='ml-8 text-lg'>{props.last}</p>
                    
                </div>
                <div className='flex mt-6 place-items-center justify-center'>
                    <p className=''>Email:</p>
                    <p id='email' className='ml-8 text-lg'>{props.email}</p>

                </div>
            </section>
        </main>
    )
}

export default Content;