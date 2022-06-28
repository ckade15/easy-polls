import React from "react";

const SignIn = (props) => {

    const desktop = () => {
        <section className="bg-[#9DF7E5] w-full h-screen flex place-items-center">
            <form className="bg-[#F4E4BA] w-1/3 ml-auto mr-auto flex-col align-center p-5 h-fit rounded-md shadow-2xl">
                <h2 className="w-fit ml-auto mr-auto text-2xl text-[#AF4D98] font-bold">EasyPolls Login Page</h2>
                <input id="email" type="email" placeholder="Email" className="flex mr-auto ml-auto mt-5 rounded-md p-1 shadow-md"/>
                <input id="password" type="password" placeholder="Password" className="flex ml-auto mr-auto mt-3 rounded-md p-1 shadow-md " />
                <input type="submit" value="Login" className="bg-red-200 p-2 flex rounded-md w-fit ml-auto mr-auto mt-5 font-bold text-[#AF4D98] border-2 border-[#AF4D98] shadow-md hover:bg-[#9DF7E5] hover:cursor-pointer" />
            </form>
        </section>
    }

    return (
        <section className="bg-[#9DF7E5] w-full h-screen flex place-items-center">
            <form className="bg-[#F4E4BA] w-1/3 ml-auto mr-auto flex-col align-center p-5 h-fit rounded-md shadow-2xl">
                <h2 className="w-fit ml-auto mr-auto text-2xl text-[#AF4D98] font-bold">EasyPolls Login Page</h2>
                <input id="email" type="email" placeholder="Email" className="flex mr-auto ml-auto mt-5 rounded-md p-1 shadow-md"/>
                <input id="password" type="password" placeholder="Password" className="flex ml-auto mr-auto mt-3 rounded-md p-1 shadow-md " />
                <input type="submit" value="Login" className="bg-red-200 p-2 flex rounded-md w-fit ml-auto mr-auto mt-5 font-bold text-[#AF4D98] border-2 border-[#AF4D98] shadow-md hover:bg-[#9DF7E5] hover:cursor-pointer" />
            </form>
        </section>
      
    );
}

export default SignIn;