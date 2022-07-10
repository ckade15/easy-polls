import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../../setup/app-context-manager';
import edit from '../../../assets/edit.svg';
import Input from './Input';
import UpdatePassword from './UpdatePassword';

function Content(props) {
    const [context, setContext] = useContext(UserContext);

    useEffect(() => {

    }, [context.firstName, context.lastName, context.email]);
    
    return (
        <main className='w-full h-fit bg-[#AF4D98] pt-10 pb-10 min-h-screen font-mono'>
            <section className='w-1/2 ml-auto mr-auto bg-blue-200 rounded-md min-h-[450px] h-auto flex-col justify-center p-5 '>
                <h3 className='font-bold text-4xl text-center'>Profile Information</h3>
                <Input name='firstName' title='First Name:' val={context.firstName} id={context.id} context={context} setContext={setContext}/>
                <Input name='lastName' title='Last Name:' val={context.lastName} id={context.id} context={context} setContext={setContext}/>
                <Input name='email' title='Email:' val={context.email} id={context.id} context={context} setContext={setContext}/>
                <UpdatePassword context={context} setContext={setContext} id={context.id} />
            </section>
        </main>
    )
}

export default Content;