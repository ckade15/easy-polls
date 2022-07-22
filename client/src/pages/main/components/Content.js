import React, { useEffect, useState } from 'react';
import { getActivePolls } from '../utils';
import Poll from './Poll';

function Content() {
  const [state, setState] = useState({
    polls: [], 
    loading: true
  });


  useEffect(() => {
    if (state.loading){
      const polls = getActivePolls();
      polls.then(res => {
        console.log(res);
        setState({loading: false, polls: res.data.polls})
      }).catch(e => {console.log(e)})
      
      setState({...state, loading: false})
    }
  }, [])

  return (
    <main className='bg-[#AF4D98] w-full min-h-screen pt-14 flex justify-center'>
        {state.polls.length > 0 ? 
            <section className='bg-[#9DF7E5] w-4/5 h-fit pt-10 pb-10 shadow-lg rounded-md grid grid-cols-3 justify-center place-items-center gap-y-12 pr-10 pl-10 gap-x-4 mb-10'>
                {state.loading ? <></> : state.polls.map(poll => {
                
                return <Poll title={poll.title} pollId={poll._id} createdBy={poll.createdBy} />
                })}

            </section>
        : <p className='text-6xl font-mono text-bold mt-20'>No active polls.</p>
        }
    </main>
  )
}

export default Content;