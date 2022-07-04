import React, { useContext } from 'react';
import UserContext from '../../../setup/app-context-manager';
import edit from '../../../assets/edit.svg';
import Input from './Input';

function Content(props) {
    const [context, setContext] = useContext(UserContext);
    
    return (
        <main className='w-full h-screen bg-[#AF4D98] pt-10'>
            <section className='w-1/2 ml-auto mr-auto bg-blue-200 rounded-md min-h-[450px] h-auto flex-col justify-center p-5'>
                <h3 className='font-bold text-4xl text-center'>Profile Information</h3>
                <Input name='firstName' title='First Name:' val={context.firstName} id={context.id} />
                <Input name='lastName' title='Last Name:' val={context.lastName} id={context.id} />
                <Input name='email' title='Email:' val={context.email} id={context.id} />
                
                <a className="bg-red-200 p-3 flex rounded-md w-fit ml-auto mr-auto mt-12 font-bold text-[#AF4D98] border-2 border-[#AF4D98] shadow-md hover:bg-[#9DF7E5] hover:cursor-pointer" >Update Password</a>
            </section>
        </main>
    )
}

export default Content;