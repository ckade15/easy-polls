import React, { useEffect, useState } from 'react';
import { getActivePolls } from '../utils';

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
    <main className='bg-[#AF4D98] w-full min-h-screen'>
        
    </main>
  )
}

export default Content;