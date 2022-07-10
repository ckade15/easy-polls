import React, { useContext, useState } from 'react';
import UserContext from '../../../setup/app-context-manager';
import addCircle from '../../../assets/add_circle.svg';

const Content = () => {
    const [context, setContext] = useContext(UserContext);
    const [state, setState] = useState({
        name: "",
        items: []
    });
    
    const handleAdd = () => {
        state.items.push({
            name: ""
        })
    }

    return (
        <main className='w-full h-fit bg-[#AF4D98] pt-10 pb-10 min-h-screen font-mono'>
            <section className='w-1/2 bg-[#9DF7E5] h-fit ml-auto mr-auto p-6 rounded-md shadow-xl flex-col justify-center' id='container'>
                <h3 className='text-2xl text-center'>Create a new poll!</h3>
                <div className='flex justify-between w-2/3 ml-auto mr-auto mt-14'>
                    <p className='text-lg'>Enter a name for your poll:</p>
                    <input type='text' id='name' className='ml-8 rounded-md p-1 shadow-md h-fit'/>
                </div>
                <div className='flex justify-center place-items-center mt-6'>
                    <p className='mr-6'>Click here to add a poll item</p>
                    <a className="hover:cursor-pointer h-fit w-fit " ><img src={addCircle} className="" onClick={handleAdd}/></a>
                </div>
                {state.items.length > 0 ? state.items.map(item =>{
                    <div>
                        <p>Entry name:</p>
                        <input type='text' />
                        
                    </div>
                }) : <></>}
            </section>
        </main>
    );
}

export default Content;