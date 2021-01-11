import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import GemList from "../components/GemList";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import AppContext from "../Context";
import Filters from "../components/Filters";
import LoadMore from "../components/LoadMore/LoadMore";

function FilterPage () 
{
    const { loading, sendData } = useContext( AppContext );
    const [ results, setResults ] = useState( {
        gems: [],
        count: 0
    } );
    const history = useHistory();

    const { search } = useLocation();
    const { type, cutType } = parse( search );

    const getGems = async () =>
    {
        const { data, error } = await sendData(
            {
                endpoint: `shop/gems/filter?`
            }
        );

    };

    const filterGems = useCallback(
        async () =>
        {
            let url = `shop/gems/filter?`;

            if ( type )
            {
                url = `${ url }type=${ type }`;
            }

            if ( cutType )
            {
                url = `${ url }${ type ? "&" : "" }cutType=${ cutType }`;
            }

            const { gems, count } = results;

            if ( gems.length && count > gems.length )
            {
                url = `${ url }&lastId=${ gems[ gems.length - 1 ] }`;
            }

            const { data, error } = await sendData(
                {
                    endpoint: url
                }
            );

            if ( type || cutType )
            {
                let path = `/products/filter?`;

                if ( type )
                {
                    path = `${ path }type=${ type }`;
                }
                if ( cutType )
                {
                    path = `${ path }${ type ? "&" : "" }cutType=${ cutType }`;
                }

                history.push( path );
                console.log( type, cutType );
            }

            console.log( data );

        },
        [ results, type, history, cutType, sendData ],
    );


    useEffect( () => 
    {
        filterGems();
    }, [ filterGems ] );


    return (
        <div>
            <Filters />

        </div>
    );
}

export default FilterPage;
