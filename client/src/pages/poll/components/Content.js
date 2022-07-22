import React, {useEffect, useState, useCallback} from 'react';
import { getIp, vote } from '../utils';
import socketio, { io } from 'socket.io-client';
import { SOCKET_URL } from '../../../setup/auth/config';
import Spinner from '../../../common/spinner';

const Content = (props) => {
    const [state, setState] = useState({
        voted: false,
        show: false,
        error: '',
        poll: undefined
    });

    const [socket, setSocket] = useState();

    const [poll, setPoll] = useState();

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
                    //setPoll(props.poll)
                    setState({poll: props.poll, voted: true, show: true});
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

    const mapStateChoices = () => {
        const choices = state.poll.item.map((item, index) => {
            const handleVote = e => {
                const request = vote(state.poll._id, index, state.userId);
                request.then(res => {
                    //setPoll(props.poll)
                    setState({poll: state.poll, voted: true, show: true});
                    socket.emit('vote', state.poll._id);
                    
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

    const mapStateResults = () => {
        const choices = poll.item.map((item, index) => {
            // Handles display percentage
            let percentage = (item.votes / state.poll.totalVotes) * 100;
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

    const showRes = useCallback(() => {
        return ;
    }, [])

    useEffect(()=> {
        // Connect to socket
        const sock = io(SOCKET_URL);
        if (props.loading){

        }else{
            sock?.emit('joinPoll', props.poll._id, props.userId);
        }
        setState({...state, poll: props.poll})
        
        console.log('Props: ',props)
       
        
        sock?.on('message', (m) => {
            console.log(m)
        });

        sock?.on('join', poll => {
            console.log(poll)
            setState({
                ...state,
                poll: poll.poll
            })
        })
        
        sock?.on('roomUsers', poll => {
            console.log(poll)
            setState({
                ...state, 
                show: true,
                poll: poll.poll
            });
        });

        setSocket(sock);
         
        console.log(state.poll)
        return () => {
            socket?.emit('disconnect', props.userId)

        }
    }, [props.loading, showRes])

    return (
        <section className='bg-[#AF4D98] w-full min-h-screen text-center font-mono pt-20 pb-20'>
            <div className='w-1/2 min-w-[500px] bg-[#9DF7E5] ml-auto mr-auto rounded-md p-10 flex-col justify-center place-items-center pb-20 pt-20'>

                {props.loading ? <Spinner /> : <>
                <p className='text-2xl'>Poll created by {props.poll.createdBy}</p>
                <p className='text-2xl mt-4 mb-8'>Poll Title: {props.poll.title}</p>
                {props.poll.pollStatus || state.voted ? 
                    <>{state.show ? 
                        <React.Fragment>
                            {props.loading ? <></> : (state.poll === undefined ? mapStateResults() : mapResults())}
                            <div className='mb-10' />
                            <a className='text-lg p-4 bg-[#F4E4BA] rounded-md hover:shadow-md hover:cursor-pointer hover:bg-gray-300 hover:text-blue-800' onClick={e => handleResults(e)}>Back to Voting</a>
                        </React.Fragment>
                        : 
                        <React.Fragment>
                            {mapChoices()}
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
                </>
                
                }
                
            </div>
        </section>
    )
}

export default Content;