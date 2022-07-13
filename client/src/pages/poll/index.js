import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../common/footer";
import Header from "../../common/header";
import UserContext from "../../setup/app-context-manager";
import { getPoll, getIp } from "./utils";
import { checkToken } from "../../setup/auth";
import Content from "./components/Content";
import axios from "axios";

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
            const poll = getPoll(pollId);
            poll.then(res => {
                setState({
                    ...state,
                    poll: res.data.poll,
                })
                /*
                try{
                    if (context.userId.length > 0){
                        setState({
                            ...state,
                            poll: res.data.poll,
                            userId: context.userId,
                            loading: false
                        });
                    }

                }catch{
                    
                    const ip = getIp();
                    console.log(ip.data.IPv4)
                    setState({
                        ...state,
                        poll: res.data.poll,
                        userId: ip,
                        loading: false
                    });
                }*/
            });
        }
    }, []);

    const getIp = async () => {
        const ip = await axios.get('https://geolocation-db.com/json/')
        return ip.data.IPv4;
    }

    const alreadyLoggedIn = () => {
        const token = localStorage.getItem('sessionToken');
        try{
            if(context.id.length > 0){

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
                        })
                    });
                }
        
            }catch{
                
            }

        }
        
    }

    return (
        <React.Fragment>
            <Header page="Poll" />
            <Content poll={state.poll} context={context} loading={state.loading} userId={context.id} />
            <Footer />
        </React.Fragment>
    );
}

export default Poll;