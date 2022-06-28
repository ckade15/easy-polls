import { useState, React } from "react";
import utils from "./utils";

const Register = (props) => {
    const [state, setState] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "" 
    });

    const getState = () => {
        return state;
    }

    const handleState = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        }, utils.validateInput(state));
    }
    
    return (
        <section className="bg-[#9DF7E5] w-full h-screen flex place-items-center">
            <form className="bg-[#F4E4BA] w-1/3 ml-auto mr-auto flex-col align-center p-5 h-fit rounded-md shadow-2xl">
                <h2 className="w-fit ml-auto mr-auto text-2xl text-[#AF4D98] font-bold">EasyPolls Register Page</h2>
                <p className="w-1/2 ml-auto mr-auto mt-5 text-[#AF4D98] font-bold">Email</p>
                <input id="email" name="email" type="email" className="flex mr-auto ml-auto rounded-md p-1 shadow-md" onChange={e => handleState(e)}/>
                <p className="w-1/2 ml-auto mr-auto mt-2 text-[#AF4D98] font-bold">Confirm Email</p>
                <input id="confirmEmail" name="confirmEmail" type="email" className="flex mr-auto ml-auto rounded-md p-1 shadow-md" onChange={e => {
                    handleState(e);}}/>
                <p className="w-1/2 ml-auto mr-auto mt-2 text-[#AF4D98] font-bold">Password</p>
                <input id="password" name="password" type="password" className="flex ml-auto mr-auto rounded-md p-1 shadow-md " onChange={e => {
                    handleState(e);}} />
                <p className="w-1/2 ml-auto mr-auto mt-2 text-[#AF4D98] font-bold">Confirm Password</p>
                <input id="confirmPassword" name="confirmPassword" type="password" className="flex ml-auto mr-auto rounded-md p-1 shadow-md " onChange={e => {
                    handleState(e)}} />
                <input type="submit" value="Register" className="bg-red-200 p-2 flex rounded-md w-fit ml-auto mr-auto mt-5 font-bold text-[#AF4D98] border-2 border-[#AF4D98] shadow-md hover:bg-[#9DF7E5] hover:cursor-pointer" />
            </form>
        </section>
    );
}

export default Register;