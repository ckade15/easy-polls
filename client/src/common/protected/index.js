import React, {useContext} from 'react';
import { Outlet } from 'react-router-dom';
import UserContext from '../../setup/app-context-manager';
import SignIn from '../../pages/sign-in';
import { checkToken } from '../../setup/auth';


const ProtectedRoute = () => {
    const [context, setContext] = useContext(UserContext);

    const checkLoggedIn = () => {
        const token = localStorage.getItem('sessionToken');
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
                }).catch(e => {
                    setContext({
                        ...context,
                        id: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        sessionToken: "",
                        signedIn: false
                    })
                })
            }
    
        }catch{
            setContext({
                ...context,
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                sessionToken: "",
                signedIn: false
            })
        }
    }

    return (
        <React.Fragment>
            {context.signedIn ? <Outlet /> : <SignIn />}
        </React.Fragment>
    )
}

export default ProtectedRoute;