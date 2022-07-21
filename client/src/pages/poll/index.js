import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../common/footer";
import Header from "../../common/header";
import UserContext from "../../setup/app-context-manager";
import { getPoll, getIp } from "./utils";
import { checkToken } from "../../setup/auth";
import Content from "./components/Content";
import axios from "axios";
import io from 'socket.io-client';
import { SOCKET_URL } from '../../setup/auth/config';

const Poll = (props) => {
    const [context, setContext] = useContext(UserContext);
    const [state, setState] = useState({
        loading: true,
        poll: {},
        userId: ""
    });

    let {pollId} = useParams();


    useEffect(() => {
        alreadyLoggedIn();
        if (state.loading){
            
            let userId = ''
            const poll = getPoll(pollId);
            try{
                if (context.id.length > 0){
                    userId = context.userId;
                }
                poll.then(res => {
                    setState({
                        ...state,
                        poll: res.data.poll,
                        userId: userId,
                        loading: false
                    })
                });

            }catch{
                poll.then(res => {
                    getIp(res.data.poll)
                }).catch(e => console.log(e))
            }
        }
        
    }, [state.poll]);

    const getIp = async (poll) => {
        fetch('https://geolocation-db.com/json/')
        .then(response => response.json())
        .then(data => {setState({...state, userId: data.IPv4, poll: poll, loading: false})})
    }

    const alreadyLoggedIn = () => {
        const token = localStorage.getItem('sessionToken');
        try{
            if(context.id.length > 0){
                setContext({
                    ...context,
                    id: context.id,
                    firstName: context.firstName,
                    lastName: context.lastName,
                    email: context.email,
                    sessionToken: context.sessionToken,
                    signedIn: true
                });
            }
        }catch{
            try{
                if (token.length > 0){
                    const validToken = checkToken(token).then(token => {
                        setContext({
                            ...context,
                            id: token.data.id,
                            firstName: token.data.firstName,
                            lastName: token.data.lastName,
                            email: token.data.email,
                            sessionToken: token.data.sessionToken,
                            signedIn: true
                        });
                    });
                }
        
            }catch{
                
            }

        }
        
    }

    return (
        <React.Fragment>
            <Header page="Poll" />
            <Content poll={state.poll} context={context} loading={state.loading} userId={state.userId} setParent={setState} parentState={state}/>
            <Footer />
        </React.Fragment>
    );
}

export default Poll;