import React, {useEffect, useState} from 'react'
import { getIp, vote } from '../utils'

const Content = (props) => {
    const [state, setState] = useState({
        voted: false,
        userId: props.userId
    });

    
    const mapChoices = () => {
        const choices = props.poll.item.map((item, index) => {
            const handleVote = e => {

                const request = vote(props.poll._id, index, state.userId);
                request.then(res => {
                    console.log(res)
                });
                request.catch(e => console.log(e))
            }
            
            return (
                <a name={index} onClick={e => handleVote(e)} 
                className='block hover:cursor-pointer mb-4 text-lg bg-[#AF4D98] rounded-lg p-2 text-white 
                font-bold hover:shadow-lg hover:bg-white hover:border-2 hover:border-[#AF4D98] hover:text-[#AF4D98] 
                border-2 border-[#AF4D98]'>{item.name}</a>
            )
        })
        return choices;
    }

    useEffect(()=> {
        
    }, [state.userId])

    return (
        <section className='bg-[#AF4D98] w-full min-h-screen flex place-items-center justify-center text-center font-mono'>
            <div className='w-1/2 min-w-[500px] bg-[#9DF7E5] h-fit ml-auto mr-auto rounded-md p-10 flex-col justify-center place-items-center '>
                <p className='text-2xl'>Poll created by {props.poll.createdBy}</p>
                <p className='text-2xl mt-4 mb-8'>Poll Title: {props.poll.title}</p>
                {props.loading ? <></> : mapChoices()}
            </div>
        </section>
    )
}

export default Content;