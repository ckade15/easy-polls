import { React, setState, useState, useEffect }from "react";
import utils from "./utils";
import visibility from '../../assets/visibility.svg';
import visibilityOff from '../../assets/visibility_off.svg';

const SignIn = (props) => {

    const [state, setState] = useState({
        email: "",
        password: "",
        valid: false,
        visibile: false
    });

    useEffect(() => {
        
        setState({
            ...state,
            valid: utils.validateInput(state)
        })
    }, [state.email, state.password])

    const handleState = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handlePassword = () => {
        if (state.visibile){
            document.getElementById('password').type = 'password';
            document.getElementById('visible').src = visibility;
            setState({
                ...state,
                visibile: !state.visibile
            });
        }else{
            document.getElementById('password').type = 'text';
            document.getElementById('visible').src = visibilityOff;
            setState({
                ...state,
                visibile: !state.visibile
            });
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('hi')
        if (state.valid === true){
            // Handle login
        }else{
            if (state.valid[0] === 'Email is required'){
                document.getElementById('emailWarning').className = "w-fit ml-auto mr-auto mt-1 text-red-600";
            }else{
                document.getElementById('emailWarning').className = "hidden w-fit ml-auto mr-auto mt-1 text-red-600";
            }
            if (state.valid[0] === 'Password is required' || state.valid[1] === 'Password is required'){
                document.getElementById('passwordWarning').className = "w-fit ml-auto mr-auto mt-1 text-red-600";
            }else{
                document.getElementById('passwordWarning').className = "hidden w-fit ml-auto mr-auto mt-1 text-red-600";
            }
        }
    }

    return (
        <section className="bg-[#9DF7E5] w-full h-screen flex place-items-center">
            <form className="bg-[#F4E4BA] w-1/3 ml-auto mr-auto flex-col align-center p-5 h-fit rounded-md shadow-2xl">
                <h2 className="w-fit ml-auto mr-auto text-2xl text-[#AF4D98] font-bold">EasyPolls Login Page</h2>
                <input id="email" name="email" type="email" placeholder="Email" className="flex mr-auto ml-auto mt-5 rounded-md p-1 shadow-md" onChange={e => handleState(e)}/>
                <p id="emailWarning" className="hidden w-fit ml-auto mr-auto mt-1 text-red-600">* Email is required</p>
                <div className="m-0 p-0 flex w-3/4  ml-auto mr-auto place-items-center justify-center mt-4 ">
                    <input id="password" name="password" type="password" placeholder="Password" className="ml-10 rounded-md p-1 shadow-md " onChange={e => handleState(e)}/>
                    <img src={visibility} className="w-8 h-8 ml-2 hover:cursor-pointer" onClick={handlePassword} id='visible' />
                </div>
                <p id="passwordWarning" className="hidden w-fit ml-auto mr-auto mt-1 text-red-600">* Password is required</p>
                <input type="submit" value="Login" className="bg-red-200 p-2 flex rounded-md w-fit ml-auto mr-auto mt-5 font-bold text-[#AF4D98] border-2 border-[#AF4D98] shadow-md hover:bg-[#9DF7E5] hover:cursor-pointer" onClick={e => handleSubmit(e)} />
            </form>
        </section>
      
    );
}

export default SignIn;