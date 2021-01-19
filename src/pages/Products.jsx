import React, { useContext, useState, useEffect } from 'react';
import GemList from "../components/GemList";
import AppContext from "../Context";
import Filters from "../components/Filters";
import LoadMore from "../components/LoadMore/LoadMore";
import RetryError from "../components/RetryError";


function Products () 
{
    const { count, gems, sendData, setGems } = useContext( AppContext );
    const [ error, setError ] = useState( gems.length ? null : "Unable to retrive gems." );


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
            ;
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

    useEffect( () =>
    {
        if ( count )
        {
            setError( error => 
            {
                if ( error ) return null;
                return error;
            } );
        }
    }, [ count ] );

    return (
        <div>
            <Filters />
            <GemList items={ gems } />

            {  ( count > gems.length && !error ) &&
                <LoadMore click={ getGems } /> }

            {

                ( count && error ) &&
                <RetryError
                    message={ error }
                    action={ getGems }
                    btnText="Retry" />

            }


            {
                ( !count && error ) &&
                <RetryError
                    message={ error }
                    action={ getGems }
                    btnText="Try again" />

            }



        </div>
    );
}

export default Products;
