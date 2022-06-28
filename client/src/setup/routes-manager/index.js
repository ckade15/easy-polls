import React from 'react';
import '../../index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Page imports
import CreatePoll from '../../pages/create-poll/index';
import Main from '../../pages/main';
import Poll from '../../pages/poll';
import Profile from '../../pages/profile';
import SignIn from '../../pages/sign-in';
import Register from '../../pages/register';
import MustBeMember from '../../pages/must-be-member';
import PageNotFound from '../../pages/page-not-found';

const RoutesManager = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/createPoll' element={<CreatePoll />} />
                <Route path='/poll/:pollId' element={<Poll />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/signIn' element={<SignIn />} />
                <Route path='/register' element={<Register />} />
                <Route path='/mustBeMember' element={<MustBeMember />} />
                <Route path='/pageNotFound' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesManager;