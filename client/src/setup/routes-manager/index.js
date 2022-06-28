import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes, Routes} from 'react-router-dom';

// Page imports
import createPoll from '../pages/create-poll';
import homePage from '../pages/main';
import poll from '../pages/poll';
import profile from '../pages/profile';
import signIn from '../pages/sign-in';
import register from '../pages/register';
import mustBeMember from '../pages/must-be-member';
import pageNotFound from '../pages/page-not-found';

export default RootManager = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<homePage />} />
                <Route path='/createPoll' element={<createPoll />} />
                <Route path='/poll/:pollId' element={<poll />} />
                <Route path='/profile' element={<profile />} />
                <Route path='/signIn' element={<signIn />} />
                <Route path='/register' element={<register />} />
                <Route path='/mustBeMember' element={<mustBeMember />} />
                <Route path='/pageNotFound' element={<pageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}



reportWebVitals();