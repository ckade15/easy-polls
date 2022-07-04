import React, { useContext } from 'react';
import UserContext from '../../../setup/app-context-manager';
import edit from '../../../assets/edit.svg';
import Input from './Input';

function Content(props) {
    
    const handleSave = e => {

    }

    const handleCancel = e => {

    }

    const handleEditClick = (e) => {
        e.preventDefault();
        const element = e.target.name;
        console.log(element)
        switch(element){
            case "first":
                console.log('hi')
                document.getElementById('first').className = 'hidden'
                document.getElementById('firstEdit').className = 'hidden'
                break;
            case "last":
                document.getElementById('last').className = 'hidden'
                document.getElementById('lastEdit').className = 'hidden'
                break;
            case "email":
                document.getElementById('email').className = 'hidden'
                document.getElementById('emailEdit').className = 'hidden'
                break;
        }

    }
    return (
        <main className='w-full h-screen bg-[#AF4D98] pt-10'>
            <section className='w-1/2 ml-auto mr-auto bg-blue-200 rounded-md h-1/2 min-h-[450px] h-auto flex-col justify-center p-5'>
                <h3 className='font-bold text-4xl text-center'>Profile Information</h3>
                <Input name='first' title='First Name:' val={props.first}/>
                <Input name='last' title='Last Name:' val={props.last} />
                <Input name='email' title='Email:' val={props.email}/>
                
                <a className="bg-red-200 p-3 flex rounded-md w-fit ml-auto mr-auto mt-12 font-bold text-[#AF4D98] border-2 border-[#AF4D98] shadow-md hover:bg-[#9DF7E5] hover:cursor-pointer" >Update Password</a>
            </section>
        </main>
    )
}

export default Content;