import React, { useContext, useEffect } from 'react';
import Loader from "./Loader/Loader";
import AppContext from "../Context";

function Main ( { children } )
{
    const { loading, setGems, sendData } = useContext( AppContext );

    useEffect( () =>
    {

        const getGems = async () =>
        {
            const { data } = await sendData(
                {
                    endpoint: "shop/gems",
                    setLoad: false
                }
            );

            setGems( data );
        };

        const timer = setTimeout( getGems, 500 );

        return () => clearTimeout( timer );

    }, [ sendData, setGems ] );

    return (
        <main>
            {children }
            {loading && <Loader /> }
        </main>
    );
}

export default Main;
