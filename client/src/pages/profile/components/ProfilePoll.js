import React, { useEffect, useState, useContext } from 'react';
import {getUserPolls, deletePoll} from '../utils'
import UserContext from '../../../setup/app-context-manager';
import axios from 'axios';

const ProfilePoll = (props) => {

    const [context, setContext] = useContext(UserContext);
    const [state, setState] = useState({
        polls: undefined
    });

    const handleDelete = (e, pollId) => {
        e.preventDefault()
        const sub = window.confirm(`Are you sure you would like to delete poll ID ${pollId}?`);
        if (sub){
            console.log(props.sessionToken)
            const deleteP = deletePoll(pollId, props.sessionToken);
            const newState = state.polls.filter(poll => {
                if (poll._id === pollId){

                }else{
                    return poll;
                }
            })
        }
        
    }
    
    useEffect(() => {
        if (props.loading){
            
        }else{
            
            const URL = 'http://localhost:5001/api/poll/get/' + context.id;
            const userPolls = axios.get(URL)
            userPolls.then(response => {
                console.log(response)
                setState({
                    ...state,
                    polls: response.data.polls
                })
            })
        }
        console.log(props)
    }, [props.loading, context.id, state.polls?.length])

    return (
        <main className='bg-[#AF4D98] w-full min-h-screen pt-14 flex justify-center'>
            {state.polls !== undefined && state.polls?.length > 0 ?
                
                <section className='bg-[#9DF7E5] w-4/5 h-fit pt-10 pb-10 shadow-lg rounded-md grid grid-cols-3 justify-center place-items-center gap-y-12 pr-10 pl-10 gap-x-4 mb-10'>
                    {state.polls.map(poll => {
                        const URL = 'http://localhost:3000/poll/' + poll._id;
                        return (
                            <div className='bg-blue-400 w-fit p-10 font-mono flex-col justify-center text-center rounded-lg shadow-lg  min-w-[400px] max-w-[400px]' key={poll._id}>
                              <p className='text-xl'>Poll title: {poll.title}</p>
                              <p className='mt-4 mb-8 text-lg'>Creator: {poll.createdBy}</p>
                              
                              <a onClick={e => handleDelete(e, poll._id)} 
                                    className='block mb-4 text-lg bg-[#F4E4BA] font-bold p-4 w-[170px] ml-auto mr-auto rounded-md text-gray-500 hover:shadow-lg hover:text-[#F4E4BA] 
                                    hover:bg-[#AF4D98] hover:cursor-pointer '>Delete Poll</a>
                              <a href={URL} className='block text-lg bg-[#F4E4BA] mr-auto ml-auto font-bold p-4 w-[170px] 
                                rounded-md text-gray-500 hover:shadow-lg hover:text-[#F4E4BA] hover:bg-[#AF4D98] '>View Poll</a>
                              
                            </div>
                        )    
                    })}
                </section>
            :
            <></>
            }
            
      </main>
    )
}

export default ProfilePoll