import React, { useState } from 'react'

const UpdatePassword = (props) => {
    const [state, setState] = useState({
        password: "",
        confirmPassword: "",
        updating: false,
        error: false
    });

    const handleUpdate = () => {
        setState({
            ...state, 
            updating: !state.updating
        });
    }

    const validate = () => {
        if (state.password > 0 && state.confirmPassword > 0 && state.password !== state.confirmPassword){
            setState({
                ...state,
                error: !state.error
            })
        }else{
            setState({
                ...state,
                error: !state.error
            });
        }
    }
    const handleChange = e => {
        setState({
            [e.target.id]: e.target.value
        });
        
    }

    if (state.updating){
        return (
            <div className='w-full flex-col justify-center place-items-center'>
                <div className='w-full justify-center flex mt-10'>
                    <p className='w-1/4'>Password:</p>
                    <input type='text' id='password' name='password' className="ml-8 rounded-md p-1 shadow-md " onChange={e => handleChange(e)}/>
                </div>
                <div className='w-full justify-center flex mt-10'>
                    <p className='w-1/4'>Confirm Password:</p>
                    <input type='text' id='confirmPassword' name='confirmPassword' className="ml-8 rounded-md p-1 shadow-md " />
                </div>
                {state.error ? <p className='text-red-600 text-sm text-center'>* Passwords must match</p> : <></>}
                <a className="bg-red-500 p-3 opacity-90 flex rounded-md w-fit ml-auto mr-auto mt-12 font-bold text-white  border-2 border-[#AF4D98] shadow-md hover:bg-[#353a357e] hover:text-[#9DF7E5] hover:cursor-pointer" onClick={handleUpdate}>Cancel</a>
                <a className="bg-red-200 p-3 flex rounded-md w-fit ml-auto mr-auto mt-12 font-bold text-[#AF4D98] border-2 border-[#AF4D98] shadow-md hover:bg-[#9DF7E5] hover:cursor-pointer" >Confirm</a>
            </div>
        )
    }else{
        return (
            <a className="bg-red-200 p-3 flex rounded-md w-fit ml-auto mr-auto mt-12 font-bold text-[#AF4D98] border-2 border-[#AF4D98] shadow-md hover:bg-[#9DF7E5] hover:cursor-pointer" onClick={handleUpdate} >Update Password</a>
        )

    }
}

export default UpdatePassword;