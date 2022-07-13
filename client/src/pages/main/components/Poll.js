import React from 'react'

const Poll = (props) => {
  const URL = 'http://localhost:3000/poll/' + props.pollId;
  return (
    <div className='bg-blue-400 w-fit p-10 font-mono flex-col justify-center text-center rounded-lg shadow-lg'>
      <p className='text-xl'>Poll title: {props.title}</p>
      <p className='mt-4 mb-8 text-lg'>Creator: {props.createdBy}</p>
      <a href={URL} className='text-lg bg-[#F4E4BA] font-bold p-4 rounded-md text-gray-500 hover:shadow-lg hover:text-[#F4E4BA] hover:bg-[#AF4D98] '>View Poll</a>
    </div>
  )
}

export default Poll;