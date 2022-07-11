import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../../setup/app-context-manager';
import addCircle from '../../../assets/add_circle.svg';
import cancel from '../../../assets/cancel.svg'

const Content = () => {
    const [context, setContext] = useContext(UserContext);
    const [state, setState] = useState({
        name: "",
        items: []
    });
    
    const handleAdd = () => {
        state.items.push({
            name: ""
        });
        setState({...state})
    };

    useEffect((e) => {

    }, [state, state.items])

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
                {state.items.map((item, index) =>{
                    const handleInput = (e) => {
                        /*
                        let items  = [...state.items];
                        let i = {...items[index]};
                        i.name = e.target.value;
                        items[index] = i;
                        setState({...state, items});*/
                        state.items[index] = e.target.value;
                    }

                    const handleCancel = () => {
                        state.items.pop(index)
                        setState({...state})
                    }

                    return (
                        <div key={index} className='flex mt-4 w-1/2 ml-auto mr-auto place-items-center'>
                            <p>Entry name:</p>
                            <input type='text' key={item.name} onChange={e => {handleInput(e)}} className='ml-8 rounded-md p-1 shadow-md h-fit'/>
                            <a className='ml-8 hover:cursor-pointer'><img src={cancel} onClick={handleCancel} /></a>
                        </div>
                    )
                })}
            </section>
        </main>
    );
}

export default Content;