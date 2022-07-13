import React, {useEffect, useState} from 'react'
import { getIp, vote } from '../utils'

const Content = (props) => {
    const [state, setState] = useState({
        voted: false,
        show: false,
        error: '',
    });

    
    const mapChoices = () => {
        const choices = props.poll.item.map((item, index) => {
            const handleVote = e => {

                const request = vote(props.poll._id, index, props.userId);
                request.then(res => {
                    setState({...state, voted: true})
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
            const percentage = (item.votes / props.poll.totalVotes) * 100;
            
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
        
    }, [state.userId, state.show, state.voted])

    return (
        <section className='bg-[#AF4D98] w-full min-h-screen text-center font-mono pt-20'>
            <div className='w-1/2 min-w-[500px] bg-[#9DF7E5] ml-auto mr-auto rounded-md p-10 flex-col justify-center place-items-center pb-20 pt-20'>
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
                
            </div>
        </section>
    )
}

export default Content;