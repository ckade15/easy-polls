import React, { useEffect, useState, useContext } from 'react';
import getUserPolls from '../utils'
import UserContext from '../../../setup/app-context-manager';

const ProfilePoll = (props) => {

    const [context, setContext] = useContext(UserContext);
    const [state, setState] = useState({
        polls: undefined
    });
    
    useEffect(() => {
        if (props.loading){

        }else{
            console.log(context.id)
            try{
                const userPolls = getUserPolls(context.id);
                setState({polls: userPolls})
            }catch{

            }
            
        }
        console.log(props)
    }, [props.loading, context.id])

    return (
        <main className='bg-[#AF4D98] w-full min-h-screen pt-14 flex justify-center'>
            <section className='bg-[#9DF7E5] w-4/5 h-fit pt-10 pb-10 shadow-lg rounded-md grid grid-cols-3 justify-center place-items-center gap-y-12 pr-10 pl-10 gap-x-4 mb-10'>

            </section>
      </main>
    )
}

export default ProfilePoll