import React from 'react'

const Content = (props) => {
    
 

    const mapChoices = () => {
        const choices = props.poll.item.map(item => {
            return (
                <a className='block hover:cursor-pointer mb-4 text-lg bg-[#AF4D98] rounded-lg p-2 text-white font-bold hover:shadow-lg hover:bg-white hover:border-2 hover:border-[#AF4D98] hover:text-[#AF4D98] border-2 border-[#AF4D98]'>{item.name}</a>
            )
        })
        return choices;
    }

    

    return (
        <section className='bg-[#AF4D98] w-full min-h-screen flex place-items-center justify-center text-center font-mono'>
            <div className='w-1/2 min-w-[500px] bg-[#9DF7E5] h-fit ml-auto mr-auto rounded-md p-10 flex-col justify-center place-items-center '>
                <p className='text-2xl'>Poll created by {props.poll.createdBy}</p>
                <p className='text-2xl mt-4 mb-8'>Poll Title: {props.poll.title}</p>
                {mapChoices()}
            </div>
        </section>
    )
}

export default Content;