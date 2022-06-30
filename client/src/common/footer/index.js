import React from 'react';
import linkedin from '../../assets/linkedin.png';
import twitter from '../../assets/twitter.png';
import github from '../../assets/github.png'

const Footer = (props) => {
  return (
    <footer className={`bottom-0 ${props.dis} w-full  bg-[#9DF7E5] p-4 flex justify-evenly text-xl mt-20 absolute`}>
        <div className="flex flex-col w-1/2 text-xl text-center">
            <p className="text-xl text-black font-bold font-mono p-1 mt-2">&copy; EasyPolls  {(new Date().getFullYear())}</p>
            <p className="font-mono text-lg font-bold text-gray-600  mb-1">Made by Chris Kade</p>
        </div> 
        <div className="flex place-content-evenly mt-1 w-1/3 ">
            <a href="https://www.linkedin.com/in/christopher-kade-b9b2151a5/" className="soc-link text-blue-400 not-italic font-bold text-2xl rounded-full h-10 w-10 text-center leading-8"><img src={linkedin}/></a>
            <a href="https://twitter.com/Christhedev__" className="soc-link h-10 w-10 flex justify-center"><img src={twitter} className="w-full" alt="twitter icon" /></a>
            <a href="https://www.github.com/ckade15" className="git-link h-10 w-10 flex justify-center"><img src={github} alt="github icon" className="w-full h-full"/></a>
        </div>
    </footer>
  )
}

export default Footer;