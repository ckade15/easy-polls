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
import RegisterSuccess from '../../pages/register-success';

// Context import
import {UserProvider} from '../app-context-manager/index';

const RoutesManager = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/createPoll' element={<CreatePoll />} />
                    <Route path='/poll/:pollId' element={<Poll />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/login' element={<SignIn />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/mustBeMember' element={<MustBeMember />} />
                    <Route path='/pageNotFound' element={<PageNotFound />} />
                    <Route path='/register/success' element={<RegisterSuccess />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}

export default RoutesManager;