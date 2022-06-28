import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Route import
import RoutesManager from './setup/routes-manager/index';

import createPoll from './pages/create-poll/index';
import homePage from './pages/main';
import poll from './pages/poll';
import profile from './pages/profile';
import signIn from './pages/sign-in';
import register from './pages/register';
import mustBeMember from './pages/must-be-member';
import pageNotFound from './pages/page-not-found';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutesManager />
    {/*
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
    */}
  </React.StrictMode>
);

reportWebVitals();
