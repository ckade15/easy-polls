import React, { useContext, useEffect } from "react";
import Footer from "../../common/footer";
import Header from "../../common/header";
import UserContext from "../../setup/app-context-manager";
import { checkToken } from "../../setup/auth";

const Main = (props) => {
    const [context, setContext] = useContext(UserContext);
    
    useEffect(() => {
        alreadyLoggedIn()
    })

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
                        signedIn: true
                    })
                });
            }
    
        }catch{
            
        }
        
    }

    return (
        <section className="w-full h-min-screen">
            <Header />
            <Footer />

        </section>
    );
}

export default Main;