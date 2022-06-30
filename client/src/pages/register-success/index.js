import React from 'react';
import Header from '../../common/header';
import Footer from '../../common/footer';

const RegisterSuccess = (props) => {
  return (
    <div className="w-full min-h-screen bg-gray-300 ">
        <Header />
        <div className="w-full bg-gray-300 font-mono flex flex-col justify-center place-items-center">
            <h1 className="text-center text-4xl text-red-800 mt-10 font-bold">Thank you for registering!</h1>
            <p className="text-blue-600  text-2xl mt-10 font-bold ">Check your email to confirm account.</p>
        </div>
        <Footer />
    </div>
  )
}

export default RegisterSuccess;