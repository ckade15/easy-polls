import React, { useContext, useEffect } from 'react';
import pollPic from '../../assets/polls192.png'
import UserContext from '../../setup/app-context-manager';
import logout from './utils';

const Header = (props) => {

    const [context, setContext] = useContext(UserContext);
    const btnStyle = 'bg-[#F4E4BA] font-bold p-2 rounded-md text-xl text-gray-500 hover:shadow-lg hover:text-[#F4E4BA] hover:bg-[#AF4D98] ';
    const logoutBtn = 'bg-red-400 font-bold p-2 rounded-md text-xl text-gray-500 hover:shadow-lg hover:text-[#AF4D98] hover:bg-red-200 ';

    useEffect(()=> {
        
    })
    const dtAnon = (
        <nav className='p-4 bg-[#9DF7E5] flex justify-between'>
            <div className='w-1/3 flex'>
                <a href="/"><img src={pollPic} className='h-12 w-20'/></a>
                <p className='font-bold text-xl ml-6'>{props.page}</p>
            </div>
            <div className='w-1/3 flex justify-evenly place-items-center'>
                <a href="/register" onClick={e => e.preventDefault} className={btnStyle}>Register</a>
                <a href="/login" onClick={e => e.preventDefault}  className={btnStyle}>Login</a>
            </div>    
        </nav>
    );

    const dtLoggedIn = (
        <nav className='p-4 bg-[#9DF7E5] flex justify-between'>
            <div className='w-1/3 flex place-items-center'>
                <a href="/"><img src={pollPic} className='h-12 w-20'/></a>
                <p className='font-bold text-xl ml-6'>{props.page}</p>
            </div>
            <div className='w-1/3 flex justify-evenly place-items-center'>
                <a href="/createPoll" className={btnStyle}>Create Poll</a>
                <a href="/profile" className={btnStyle}>Profile</a>
                <a href="/" className={logoutBtn} onClick={logout}>Logout</a>
            </div>    
        </nav>
    );
    
    return (
        <React.Fragment>
            {context.signedIn === true ? dtLoggedIn : dtAnon}
        </React.Fragment>
    );
}

export default Header;