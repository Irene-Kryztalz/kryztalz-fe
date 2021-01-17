import React, { useContext, useState } from 'react';
import GemList from "../components/GemList";
import AppContext from "../Context";
import Filters from "../components/Filters";
import LoadMore from "../components/LoadMore/LoadMore";
import RetryError from "../components/RetryError";


function Products () 
{
    const { count, gems, sendData, setGems } = useContext( AppContext );
    const [ error, setError ] = useState( gems.length ? null : "Unable to load gems" );

    const getGems = async () =>
    {
        let url = "shop/gems";

        if ( gems.length )
        {
            url = `${ url }?lastId=${ gems[ gems.length - 1 ]._id }`;
        }

        const { data, error } = await sendData(
            {
                endpoint: url
            }
        );


        if ( error )
        {
            if ( typeof error === "object" )
            {
                setError( error.error );
                return;
            }

            setError( error );
            return;
        }

        if ( data.gems )
        {
            setError( null );
            setGems( data );
        }

    };


    return (
        <div>
            <Filters />
            <GemList items={ gems } />

            {  ( count > gems.length ) &&
                <LoadMore click={ getGems } /> }


            {
                error &&
                <RetryError
                    message={ error }
                    action={ getGems }
                    btnText="Retry" />

            }



        </div>
    );
}

export default Products;
