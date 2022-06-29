import { useState, React, useEffect } from "react";
import utils from "./utils";
import visibility from "../../assets/visibility.svg";
import visibilityOff from "../../assets/visibility_off.svg";

const Register = (props) => {
    const [state, setState] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        valid: false,
        visibile: false
    });

    useEffect(() => {
        
        setState({
            ...state,
            valid: utils.validateInput(state)
        })
    }, [state.email, state.confirmEmail, state.password, state.confirmPassword])

    const handleState = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handlePassword = () => {
        if (state.visibile){
            document.getElementById('password').type = 'password';
            document.getElementById('confirmPassword').type = 'password';
            document.getElementById('visible').src = visibility;
            setState({
                ...state,
                visibile: !state.visibile
            });
        }else{
            document.getElementById('password').type = 'text';
            document.getElementById('confirmPassword').type = 'text';
            document.getElementById('visible').src = visibilityOff;
            setState({
                ...state,
                visibile: !state.visibile
            });
        }
    }
    
    return (
        <section className="bg-[#9DF7E5] w-full h-screen flex place-items-center">
            <form className="bg-[#F4E4BA] w-1/3 ml-auto mr-auto flex-col align-center p-5 h-fit rounded-md shadow-2xl">
                <h2 className="w-fit ml-auto mr-auto text-2xl text-[#AF4D98] font-bold">EasyPolls Register Page</h2>
                <p className="w-1/2 ml-auto mr-auto mt-5 text-[#AF4D98] font-bold">Email</p>
                <input id="email" name="email" type="email" className="flex mr-auto ml-auto rounded-md p-1 shadow-md" onChange={e => handleState(e)}/>
                <p className="w-1/2 ml-auto mr-auto mt-2 text-[#AF4D98] font-bold">Confirm Email</p>
                <input id="confirmEmail" name="confirmEmail" type="email" className="flex mr-auto ml-auto rounded-md p-1 shadow-md" onChange={e => handleState(e)}/>
                {state.valid[0] === 'Emails do not match' ? <p className="w-fit text-red-600 ml-auto mr-auto mt-1">* Emails do not match</p> : <></>}
                <p className="w-1/2 ml-auto mr-auto mt-2 text-[#AF4D98] font-bold">Password</p>
                <input id="password" name="password" type="password" className="flex ml-auto mr-auto rounded-md p-1 shadow-md " onChange={e => handleState(e)} />
                <p className="w-1/2 ml-auto mr-auto mt-2 text-[#AF4D98] font-bold">Confirm Password</p>
                <div className="m-0 p-0 flex w-3/4  ml-auto mr-auto place-items-center justify-center ">
                    <input id="confirmPassword" name="confirmPassword" type="password" className="flex ml-10 h-fit rounded-md p-1 shadow-md " onChange={e => handleState(e)} />
                    <img src={visibility} className="w-8 h-8 ml-2 hover:cursor-pointer" onClick={handlePassword} id='visible' />
                </div>
                {state.valid[0] === 'Passwords do not match' ? <p className="w-fit text-red-600 ml-auto mr-auto mt-1">* Passwords do not match</p> : <></>}
                {state.valid[1] === 'Passwords do not match' ? <p className="w-fit text-red-600 ml-auto mr-auto mt-1">* Passwords do not match</p> : <></>}
                <input type="submit" value="Register" className="bg-red-200 p-2 flex rounded-md w-fit ml-auto mr-auto mt-5 font-bold text-[#AF4D98] border-2 border-[#AF4D98] shadow-md hover:bg-[#9DF7E5] hover:cursor-pointer" />
            </form>
        </section>
    );
}

export default Register;