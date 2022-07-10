import React, { useEffect, useState } from 'react';
import utils from '../../register/utils';

const UpdatePassword = (props) => {
    const [state, setState] = useState({
        updating: false,
        error: false
    });
    
    // password state handled separately to optimize
    const [password, setPassword] = useState({
        password: "",
        confirmPassword: "",
    })

    // Handles view change from button to inputs and vice versa
    const handleUpdate = () => {
        setState({
            ...state, 
            updating: !state.updating
        });
    }

    const validate = () => {
        if (password.password.length > 0 && password.confirmPassword.length > 0){
            if (password.password !== password.confirmPassword){
                setState({...state, error: true});
               
            }else{
                setState({...state, error: false});
                
            }
        }
    }


    const handleInput = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        });
    }
    /*
    const path = 'http://localhost:5001/api/user/'+ props.id;
    const reqOptions = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({password: password.password})
    }*/
    const handleSubmit = async (e) => {
        
        if (state.error){
        }else{
            e.preventDefault();
            
            const response = await utils.updatePassword(props.id, password.password).then(response => props.setContext({
                _id: response.data.updateUser._id,
                firstName: response.data.updateUser.firstName,
                lastName: response.data.updateUser.lastName,
                email: response.data.updateUser.email,
                sessionToken: response.data.updateUser.sessionToken,
                signedIn: true
            })).catch(err => console.error);
            
            setState({
                ...state,
                updating: false
            }); 
        }
    }

    useEffect(() => {
        validate();
    }, [state.error, password.password, password.confirmPassword])

    if (state.updating){
        return (
            <div className='w-full flex-col justify-center place-items-center'>
                <div className='w-full justify-center flex mt-10'>
                    <p className='w-1/4'>Password:</p>
                    <input type='text' id='password' name='password' className="ml-8 rounded-md p-1 shadow-md h-fit " onChange={e => handleInput(e)}/>
                </div>
                <div className='w-full justify-center flex mt-10'>
                    <p className='w-1/4'>Confirm Password:</p>
                    <input type='text' id='confirmPassword' name='confirmPassword' className="ml-8 rounded-md p-1 shadow-md h-fit" onChange={e=> {handleInput(e)}} />
                </div>
                {state.error ? <p className='text-red-600 text-sm text-center mt-4' id='passwordWarning'>* Passwords must match</p> : <></>}
                <div className='flex w-1/2 ml-auto mr-auto'>
                    <a className="hover:pointer-click bg-red-500 p-3 opacity-90 flex rounded-md w-fit ml-auto mr-auto mt-12 font-bold text-white  border-2 border-[#AF4D98] shadow-md hover:bg-[#353a357e] hover:text-[#9DF7E5] hover:cursor-pointer" onClick={handleUpdate}>Cancel</a>
                    <a className="hover:pointer-click bg-red-200 p-3 flex rounded-md w-fit ml-auto mr-auto mt-12 font-bold text-[#AF4D98] border-2 border-[#AF4D98] shadow-md hover:bg-[#9DF7E5] hover:cursor-pointer" onClick={e => handleSubmit(e)}>Confirm</a>
                </div>
            </div>
        )
    }else{
        return (
            <a className="hover:pointer-click bg-red-200 p-3 flex rounded-md w-fit ml-auto mr-auto mt-12 font-bold text-[#AF4D98] border-2 border-[#AF4D98] shadow-md hover:bg-[#9DF7E5] hover:cursor-pointer" onClick={handleUpdate} >Update Password</a>
        )

    }
}

export default UpdatePassword;