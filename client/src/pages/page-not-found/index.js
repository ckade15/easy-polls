import React, { useContext, useEffect } from "react";
import Footer from "../../common/footer";
import Header from "../../common/header";
import UserContext from "../../setup/app-context-manager";
import { checkToken } from "../../setup/auth";


const PageNotFound = (props) => {
    const [context, setContext] = useContext(UserContext);
    
    useEffect(() => {
        alreadyLoggedIn()
    }, [])

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
            <Header />
            <section className="bg-[#AF4D98] w-full min-h-screen text-center pt-20 font-mono ">
                <div className="w-2/3 ml-auto mr-auto mt-10 p-20 bg-[#9DF7E5] rounded-md shadow-xl">
                    <p className="text-4xl font-bold">Uh oh... 404 Error</p>
                    <p className="mt-4 text-xl mb-10">The page you are looking for does not exist.</p>
                    <a href="/" className="bg-[#F4E4BA] font-bold p-4 rounded-md text-xl text-gray-500 hover:shadow-lg hover:text-[#F4E4BA] hover:bg-[#AF4D98] ">Go back home</a>
                </div>

            </section>
            <Footer />
        </React.Fragment>
    );
}

export default PageNotFound;