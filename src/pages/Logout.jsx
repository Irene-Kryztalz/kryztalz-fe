import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import AppContext from "../Context";

function Logout () 
{
    const history = useHistory();
    const { logout } = useContext( AppContext );

    useEffect( () =>
    {
        logout();
        history.push( "/" );
    }, [ history, logout ] );
    return <div></div>;
}

export default Logout;
