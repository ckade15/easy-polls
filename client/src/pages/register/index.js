import { useState, React, useEffect, useContext } from "react";

import utils from "./utils";
import visibility from "../../assets/visibility.svg";
import visibilityOff from "../../assets/visibility_off.svg";
import auth from "../../setup/auth";
import {checkToken} from "../../setup/auth";
import UserContext from "../../setup/app-context-manager";
import { Navigate } from "react-router-dom";

const Register = (props) => {
    const [context, setContext] = useContext(UserContext);

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        valid: false,
        submit: false,
        visibile: false,
        registered: false,
        errors: []
    });

    useEffect(() => {
        alreadyLoggedIn();

    }, [state.email, state.confirmEmail, state.password, state.confirmPassword]);

    const alreadyLoggedIn = () => {
        const token = localStorage.getItem('sessionToken');
        if (token.length > 0){
            checkToken(token).then(token => {
                setContext({
                    ...context,
                    firstName: token.data.firstName,
                    lastName: token.data.lastName,
                    email: token.data.email,
                    sessionToken: token.data.sessionToken,
                    signedIn: true
                })
            });
        }else{
            setState({
                ...state,
                valid: utils.validateInput(state)
            });
        }
    }

    const handleState = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submit: false
        });
        handleWarnings(e);
    }

    // Handles changing password visibility
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

    // Turns off warnings after user enters data
    const handleWarnings = (e) => {
        switch (e.target.id){
            case 'firstName':
                document.getElementById('firstWarning').className = 'hidden text-red-600 mt-1';
                break;
            case 'lastName':
                document.getElementById('lastWarning').className = 'hidden text-red-600 mt-1';
                break;
            case 'email':
                document.getElementById('emailWarning').className = 'hidden text-red-600 mt-1';
                break;
            case 'confirmEmail':
                document.getElementById('emailConfirmWarning').className = 'hidden text-red-600 mt-1';
                break;
            case 'password':
                document.getElementById('passwordWarning').className = 'hidden text-red-600 mt-1';
                break;
            case 'confirmPassword':
                document.getElementById('passwordConfirmWarning').className = 'hidden text-red-600 mt-1';
                break;
        }
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        setState({
            ...state,
            submit: true
        });
        const valid = utils.validateInput(state);
        if (valid === true){
            // Register Account
            auth.register(state.firstName, state.lastName, state.email, state.password).then(response=>{
                if (response.data.success){
                    setState({
                        ...state,
                        registered: true
                    })
                }else{
                    setState({
                        ...state,
                        errors: response.data.error
                    })
                }
            })

        }else{
            valid.map(error => {
                switch (error){
                    case 'Please enter your first name':
                        document.getElementById('firstWarning').className = 'text-red-600 mt-1 text-sm';
                        break;
                    case 'Please enter your last name':
                        document.getElementById('lastWarning').className = 'text-red-600 mt-1 text-sm';
                        break;
                    case 'Please enter your email':
                        document.getElementById('emailWarning').className = 'text-red-600 mt-1 text-sm';
                        break;
                    case 'Please confirm your email':
                        document.getElementById('emailConfirmWarning').className = 'text-red-600 mt-1 text-sm';
                        break;
                    case 'Please enter a password':
                        document.getElementById('passwordWarning').className = 'text-red-600 mt-1 text-sm';
                        break;
                    case 'Please confirm your password':
                        document.getElementById('passwordConfirmWarning').className = 'text-red-600 mt-1 text-sm';
                        break;
                }
            })
        }

    }

    if (state.registered){
        return window.location.href = '/register/success';
    }else{

        return (
            <section className="bg-[#9DF7E5] w-full min-h-screen p-4">
                <form className="bg-[#F4E4BA] mt-2 w-fit ml-auto mr-auto flex-col align-center justify-center p-10 h-fit rounded-md shadow-2xl">
                    <h2 className="w-fit ml-auto mr-auto text-2xl text-[#AF4D98] font-bold">EasyPolls Register Page</h2>
    
                        <p className="text-[#AF4D98] font-bold mt-6">First Name</p>
                        <input id="firstName" name="firstName" type="text" className="rounded-md p-1 shadow-md" onChange={e => handleState(e)}/>
                        <p id="firstWarning" className="hidden">* Please enter your first name</p>
                        <p className="text-[#AF4D98] font-bold mt-2">Last Name</p>
                        <input id="lastName" name="lastName" type="text" className="rounded-md p-1 shadow-md" onChange={e => handleState(e)}/>
                        <p id="lastWarning" className="hidden">* Please enter your last name</p>
                        <p className="text-[#AF4D98] font-bold mt-2">Email</p>
                        <input id="email" name="email" type="email" className="rounded-md p-1 shadow-md" onChange={e => handleState(e)}/>
                        <p id="emailWarning" className="hidden">* Please enter your email</p>
                        <p className="text-[#AF4D98] font-bold mt-2">Confirm Email</p>
                        <input id="confirmEmail" name="confirmEmail" type="email" className="rounded-md p-1 shadow-md" onChange={e => handleState(e)}/>
                        {state.valid[0] === 'Emails do not match' ? <p className="w-fit text-red-600 mt-1 text-sm">* Emails do not match</p> : <></>}
                        <p id="emailConfirmWarning" className="hidden">* Please confirm your email</p>
                        <p className="text-[#AF4D98] font-bold mt-2">Password</p>
                        <input id="password" name="password" type="password" className="rounded-md p-1 shadow-md " onChange={e => handleState(e)} />
                        <p id="passwordWarning" className="hidden">* Please enter a password</p>
                        <p className="text-[#AF4D98] font-bold mt-2">Confirm Password</p>
                        <div className="m-0 p-0 flex ml-auto mr-auto ">
                            <input id="confirmPassword" name="confirmPassword" type="password" className="flex h-fit rounded-md p-1 shadow-md " onChange={e => handleState(e)} />
                            <img src={visibility} className="w-8 h-8 ml-2 hover:cursor-pointer" onClick={handlePassword} id='visible' />
                        </div>
                        <p id="passwordConfirmWarning" className="hidden">* Please confirm your password</p>
                        {state.errors.length > 0 && <div className="mt-1 text-red-600 text-center">{state.errors.map(error => <p className="mt-2">{ "* " + error}</p>)}</div>}
                        {state.valid[0] === 'Passwords do not match' ? <p className="w-fit text-red-600 mt-1 text-sm">* Passwords do not match</p> : <></>}
                        {state.valid[1] === 'Passwords do not match' ? <p className="w-fit text-red-600  mt-1 text-sm">* Passwords do not match</p> : <></>}
    
                    <input type="submit" value="Register" className="bg-red-200 p-2 flex rounded-md w-fit ml-auto mr-auto mt-5 font-bold text-[#AF4D98] border-2 border-[#AF4D98] shadow-md hover:bg-[#9DF7E5] hover:cursor-pointer" onClick={e => handleSubmit(e)}/>
                    <p className="mt-3 text-md">Already have an account? <a href="login" className="text-blue-800">Login</a></p>
                    {context.signedIn ? <Navigate to="/" /> : <></>}
                </form>
            </section>
        );
    }

}

export default Register;