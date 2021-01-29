import React, { useContext, useState, useEffect } from 'react';
import { parse } from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import AppContext from "../Context";
import GemList from "../components/GemList";
import Header from "../components/Header";
import LoadMore from "../components/LoadMore/LoadMore";
import RetryError from "../components/RetryError";

function SearchPage ()
{
    const { sendData, baseUrl } = useContext( AppContext );

    const [ results, setResults ] = useState( {
        gems: [],
        count: 0,
        error: null
    } );
    const history = useHistory();
    const { search } = useLocation();
    const { term } = parse( search );

    const searchGems = async () =>
    {
        let url = `shop/search?searchString=${ term.trim() }`;

        if ( results.gems.length )
        {
            const { gems } = results;
            url = `${ url }&lastId=${ gems[ gems.length - 1 ]._id }`;
        }

        const { data, error } = await sendData(
            {
                endpoint: url,
                setLoad: results.gems.length ? false : true
            }
        );

        if ( error )
        {
            setResults( state =>
            {
                const newState = { ...state };
                newState.error = typeof error === "object" ? error.error : error;
                return newState;
            } );
            return;
        }

        if ( data.gems )
        {
            let { gems, count } = data;
            if ( results.gems.length )
            {
                gems = [ ...results.gems, ...gems ];
            }
            setResults(
                {
                    gems,
                    count,
                    error: null
                }
            );
        }

    };

    useEffect( () =>
    {

        if ( !baseUrl )
        {
            history.push( "/" );
            return;
        }

        if ( term.trim() )
        {
            let url = `shop/search?searchString=${ term.trim() }`;
            const getGems = async () =>
            {
                const { data, error } = await sendData(
                    {
                        endpoint: url
                    }
                );

                if ( error )
                {
                    setResults( state =>
                    {
                        const newState = { ...state };
                        newState.error = typeof error === "object" ? error.error : error;
                        return newState;
                    } );
                    return;
                }

                if ( data.gems )
                {
                    const { gems, count } = data;
                    setResults(
                        {
                            gems,
                            count,
                            error: null
                        }
                    );
                }
            };

            getGems();
        }
        else
        {
            history.push( "/" );
            return;
        }

    }, [ term, baseUrl, history, sendData ] );

    return (
        <div>
            <Header margin="30px auto 10px">
                { results.count } result(s) found for the term <i>{ term }</i>
            </Header>

            <GemList items={ results.gems } />
            {  ( results.count > results.gems.length ) && !results.error &&
                <LoadMore click={ searchGems } />
            }

            {
                ( results.error && !results.count ) &&

                <RetryError
                    message={ results.error }
                    action={ searchGems }
                    btnText="Retry" />

            }


            {
                ( results.error && results.count ) ?
                    <RetryError
                        message={ results.error }
                        action={ searchGems }
                        btnText="Try again" />
                    : null
            }


        </div>
    );
}

export default SearchPage;
