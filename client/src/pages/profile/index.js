import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Footer from "../../common/footer";
import Header from "../../common/header";
import UserContext from "../../setup/app-context-manager";
import { checkToken } from "../../setup/auth";
import Content from "./components/Content";

const Profile = (props) => {
    const [context, setContext] = useContext(UserContext);

    useEffect(()=> {
        alreadyLoggedIn();
        document.title = 'EasyPolls - Profile'
    }, [context.loggedIn]);

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
            <Header page="Profile" />
            {context.loggedIn ? <Navigate to='/login' /> : <></>}
            <Content first={context.firstName} last={context.lastName} email={context.email} />
            <Footer />
        </React.Fragment>
    );
}

export default Profile;