import React from 'react';
import pollPic from '../../assets/polls192.png'

const Header = (props) => {

    const desktop = (<div></div>);
    const mobile = (<div></div>);

    const dtAnon = (
        <nav className='p-4 bg-red-300 flex justify-between'>
            <div className='w-1/3'>
                <a href="/"><img src={pollPic} className='h-12 w-20'/></a>
            </div>
            <div className='w-1/3 flex justify-evenly place-items-center'>
                <a href="/register">Register</a>
                <a href="/login">Login</a>
            </div>    
        </nav>
    );

    const dtLoggedIn = (
        <nav className='p-4 bg-red-300 flex justify-between'>
            <div className='w-1/3'>
                <a href="/"><img src={pollPic} className='h-12 w-20'/></a>
            </div>
            <div className='w-1/3 flex justify-evenly place-items-center'>
                <a href="/createPoll">Create Poll</a>
                <a href="/profile">Profile</a>
            </div>    
        </nav>
    );

    return (
        dtAnon
    );
}

export default Header;