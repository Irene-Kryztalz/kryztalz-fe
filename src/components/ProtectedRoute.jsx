import React, { useContext } from 'react';
import AppContext from "../Context";
import SignIn from "../pages/SignIn";

function ProtectedRoute ( { children } ) 
{
    const { isAuth } = useContext( AppContext );

    return isAuth ? children : <SignIn />;
}

export default ProtectedRoute;
