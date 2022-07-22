import React, { useEffect, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Footer from "../../common/footer";
import Header from "../../common/header";
import UserContext from "../../setup/app-context-manager";
import { checkToken } from "../../setup/auth";
import Content from "./components/Content";
import Poll from "./components/ProfilePoll";

const Profile = (props) => {
    const [context, setContext] = useContext(UserContext);
    const [state, setState] = useState({
        loading: true
    })

    useEffect(()=> {
        if (state.loading){
            alreadyLoggedIn();
            document.title = 'EasyPolls - Profile';
            setState({loading: false})

        }
    }, [context.loggedIn]);

    const alreadyLoggedIn = () => {
        const token = localStorage.getItem('sessionToken');
        try{
            if (context.id.length > 0){

            }
        }catch{
            try{
                if (token.length > 0){
                    const validToken = checkToken(token).then(token => {
                        setContext({
                            ...context,
                            firstName: token.data.firstName,
                            lastName: token.data.lastName,
                            email: token.data.email,
                            sessionToken: token.data.sessionToken,
                            signedIn: true,
                            id: token.data.id
                        })
                    });
                }else{
                    
                }
        
            }catch{
                
            }
        }
    }

    return (
        <React.Fragment>
            <Header page="Profile" />
            {context.loggedIn ? <Navigate to='/login' /> : <></>}
            <Content first={context.firstName} last={context.lastName} email={context.email} loading={state.loading}/>
            <Poll loading={state.loading} userId={context._id} sessionToken={context.sessionToken} />
            <Footer />
        </React.Fragment>
    );
}

export default Profile;