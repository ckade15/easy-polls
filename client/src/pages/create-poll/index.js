import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Header from "../../common/header";
import Footer from '../../common/footer';
import UserContext from "../../setup/app-context-manager";
import { checkToken } from "../../setup/auth";

const CreatePoll = (props) => {
    const [context, setContext] = useContext(UserContext);
    useEffect(() => {
        document.title = 'EasyPolls - Create a Poll';
        alreadyLoggedIn();
    });

    const alreadyLoggedIn = () => {
        const token = localStorage.getItem('sessionToken');
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

    return (
        <React.Fragment>
            {context.signedIn ? <></> : <Navigate to='/login'/>}
            <Header page="Create Poll" />
            <Footer />
        </React.Fragment>
    );
}

export default CreatePoll;