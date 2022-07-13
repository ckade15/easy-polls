import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../../setup/app-context-manager';
import addCircle from '../../../assets/add_circle.svg';
import cancel from '../../../assets/cancel.svg'
import { createPoll } from '../utils';
import { Navigate } from 'react-router-dom';

const Content = () => {
    const [context, setContext] = useContext(UserContext);
    const [state, setState] = useState({
        name: "",
        pollLength: 0,
        items: [], 
        errors: []
    });
    
    const handleAdd = () => {
        state.items.push({
            name: "",
            votes: 0
        });
        setState({...state})
    };

    const handleChange = (e) => {
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }


    const validate = (e) => {
        e.preventDefault();
        let errors = [];
        if (state.name === ''){
            errors.push('Poll title is required.')
        }
        if (state.items.length < 2){
            errors.push('There must be more than 1 item to vote on.')
        }
        if (state.pollLength.length === 0){
            errors.push('Please enter valid poll length.')
        }
        state.items.map(item => {
            if (errors[0] === 'Item name is required.' || errors[1] === 'Item name is required.' || errors[2] === 'Item name is required.'){

            }
            else if (item.name === ''){
                errors.push('Item name is required.'); 
            }
        });
        setState({
            ...state,
            errors: errors
        })
        if (errors.length > 0){
            return false;
        }else{
            return true;
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validate(e)){
            const fullName = `${context.firstName} ${context.lastName}`;
            const poll = createPoll(context.sessionToken, state.name, context.id, state.pollLength, fullName, state.items);
            poll.then(res => {
                console.log(res)
                if (res.data.success){
                    console.log('Successfully created poll')
                }else{
                    console.log('Poll not created')
                }
            })
            poll.catch(e=> console.log(e))

        }else{
        }
    }

    useEffect((e) => {

    }, [state, state.items, state.errors])

    return (
        <main className='w-full h-fit bg-[#AF4D98] pt-10 pb-10 min-h-screen font-mono'>
            <section className='w-1/2 bg-[#9DF7E5] h-fit ml-auto mr-auto p-6 rounded-md shadow-xl flex-col justify-center' id='container'>
                <h3 className='text-2xl text-center'>Create a new poll!</h3>
                <div className='flex justify-between w-2/3 ml-auto mr-auto mt-14 place-items-center'>
                    <p className='text-lg'>Enter a name for your poll:</p>
                    <input type='text' id='name' name='name' className='ml-8 rounded-md p-1 shadow-md h-fit' onChange={e => handleChange(e)}/>
                </div>
                <div className='flex justify-between w-2/3 ml-auto mr-auto mt-6 place-items-center'>
                    <p className='text-lg'>Enter how many hours you'd like your poll to be:</p>
                    <input type='number' id='pollLength' name='pollLength' className='ml-8 rounded-md p-1 shadow-md h-fit' onChange={e => handleChange(e)}/>
                </div>
                <div className='flex justify-center place-items-center mt-6 mb-6'>
                    <p className='mr-6'>Click here to add a poll item</p>
                    <a className="hover:cursor-pointer h-fit w-fit " ><img src={addCircle} className="" onClick={handleAdd}/></a>
                </div>
                

                {state.items.map((item, index) =>{
                    const handleInput = (e) => {
                        const updatedState = {...state};
                        updatedState.items[index] = e.target.value;
                        setState(updatedState);
                    }
                    
                    const handleCancel = () => {
                        state.items.pop(index)
                        setState({...state})
                    }
                    
                    return (
                        <div key={index} className='flex mt-4 w-2/3 ml-auto mr-auto place-items-center'>
                            <p>Entry name:</p>
                            <input type='text' key={item.name} onChange={e => {handleInput(e)}} className='ml-8 rounded-md p-1 shadow-md h-fit' />
                            <a className='ml-4 hover:cursor-pointer '><img src={cancel} onClick={handleCancel} className=' h-10'/></a>
                        </div>
                    )
                })}
                <div className='flex-col justify-center place-items-center mt-6'>
                {state.errors.length > 0 ? state.errors.map(error => {
                    return (<p className='w-fit text-red-600 mt-1 text-sm text-center ml-auto mr-auto'>* {error}</p>)
                }) : <></>}
                </div>
                {state.items.length > 0 ? <a className='bg-red-200 p-4 flex rounded-md w-fit ml-auto mr-auto mt-10 mb-10 font-bold text-[#AF4D98] border-2 border-[#AF4D98] shadow-md hover:bg-[#0d205f] hover:cursor-pointer hover:opacity-70' onClick={e => handleSubmit(e)}>Create Poll</a> : <></>}
            </section>
        </main>
    );
}

export default Content;