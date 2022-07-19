import React, {useEffect, useState} from 'react';
import { getIp, vote } from '../utils';
import socketio, { io } from 'socket.io-client';
import { SOCKET_URL } from '../../../setup/auth/config';

const Content = (props) => {
    const [state, setState] = useState({
        voted: false,
        show: false,
        error: '',
    });

    const [socket, setSocket] = useState(null);

    const checkVoted = () => {
        props.poll.hasVoted.map(poll => {
            if (poll._id == props.userId){
                console.log('has voted')
                setState({...state, voted: true, show: true})
            }
        })
    }
    
    const mapChoices = () => {
        const choices = props.poll.item.map((item, index) => {
            const handleVote = e => {
                const request = vote(props.poll._id, index, props.userId);
                request.then(res => {
                    setState({...state, voted: true, show: true});
                    socket.emit('vote', props.poll._id);
                    
                });
                request.catch(e => console.log(e))
            }
            
            
            return (
                <a name={index} onClick={e => handleVote(e)} 
                className='block hover:cursor-pointer mb-8 text-lg bg-[#AF4D98] rounded-md p-4 text-white 
                font-bold hover:shadow-lg hover:bg-white hover:border-2 hover:border-[#AF4D98] hover:text-[#AF4D98] 
                border-2 border-[#AF4D98]' key={item.name}>{item.name}</a>
            )
        })
        return choices;
    }

    const mapResults = () => {
        const choices = props.poll.item.map((item, index) => {
            // Handles display percentage
            let percentage = (item.votes / props.poll.totalVotes) * 100;
            percentage = parseFloat(percentage).toFixed(1);
            if (item.votes === 0){
                percentage = 0
            }
            
            return (<a name={index}
                className='block hover:cursor-pointer mb-8 text-lg bg-[#AF4D98] rounded-md p-4 text-white 
                font-bold hover:shadow-lg hover:bg-white hover:border-2 hover:border-[#AF4D98] hover:text-[#AF4D98] 
                border-2 border-[#AF4D98]' key={item.name}>{item.name}&nbsp; {percentage}%&nbsp; &nbsp;{item.votes} Votes</a>
            )
        });
        return choices
    }

    const handleResults = e => {
        e.preventDefault();
        setState({
            ...state,
            show: !state.show
        })
    }

    useEffect(()=> {
        // Connect to socket
        if (props.loading){
            const socket = io(SOCKET_URL)
            //console.log(socket)
        }else{
            //console.log(socket)
            socket?.emit('joinPoll', state.poll._id, state.userId);
            socket?.on('m', m => console.log(m))
            
            socket?.on('message', (m) => {
                console.log(m)
            })
            socket?.on('user connected', () => console.log('connected'))
            socket?.on('roomUsers', (poll) => {
                setState({
                    ...state,
                    poll: poll
                })
            })
        }
    }, [state.userId, state.show, state.voted, socket])

    return (
        <section className='bg-[#AF4D98] w-full min-h-screen text-center font-mono pt-20'>
            <div className='w-1/2 min-w-[500px] bg-[#9DF7E5] ml-auto mr-auto rounded-md p-10 flex-col justify-center place-items-center pb-20 pt-20'>

                {props.loading ? <>
                <div role="status" className='w-full flex justify-center place-items-center p-10'>
                    <svg aria-hidden="true" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-400 fill-[#AF4D98]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <p className="sr-only">Loading...</p>
                </div>
                
                </> : <>
                <p className='text-2xl'>Poll created by {props.poll.createdBy}</p>
                <p className='text-2xl mt-4 mb-8'>Poll Title: {props.poll.title}</p>
                {props.poll.pollStatus || state.voted ? 
                    <>{state.show ? 
                        <React.Fragment>
                            {props.loading ? <></> : mapResults()}
                            <div className='mb-10' />
                            <a className='text-lg p-4 bg-[#F4E4BA] rounded-md hover:shadow-md hover:cursor-pointer hover:bg-gray-300 hover:text-blue-800' onClick={e => handleResults(e)}>Back to Voting</a>
                        </React.Fragment>
                        : 
                        <React.Fragment>
                            {props.loading ? <></> : mapChoices()}
                            <div className='mb-10'/>
                            
                            <a className='text-lg p-4 bg-[#F4E4BA] rounded-md hover:shadow-md hover:cursor-pointer hover:bg-gray-300 hover:text-blue-800' onClick={e => handleResults(e)}>Show Results</a>
                        </React.Fragment>
                        }
                    </> 
                    : 
                    <React.Fragment>
                    {props.loading ? <></> : mapResults()}
                    <div className='mb-10' />
                    </React.Fragment>
                }
                {checkVoted}
                </>
                
                }
                
            </div>
        </section>
    )
}

export default Content;