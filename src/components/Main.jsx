import React, { useContext } from 'react';
import Loader from "./Loader/Loader";
import AppContext from "../Context";

function Main ( { children } )
{
    const { loading } = useContext( AppContext );
    return (
        <main>
            {children }
            {loading && <Loader /> }
        </main>
    );
}

export default Main;
