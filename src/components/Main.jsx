import React, { useContext, useEffect } from 'react';
import Loader from "./Loader/Loader";
import AppContext from "../Context";

function Main ( { children } )
{

    const { init, loading, setGems, sendData, baseUrl } = useContext( AppContext );

    useEffect( () =>
    {
        if ( !baseUrl )
        {
            init();
        }

        const getGems = async () =>
        {
            const { data } = await sendData(
                {
                    endpoint: "shop/gems"
                }
            );

            setGems( data );
        };

        getGems();

    }, [ sendData, setGems, init, baseUrl ] );

    return (
        <main>
            {children }
            {loading && <Loader /> }
        </main>
    );
}

export default Main;
