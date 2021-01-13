import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import GemList from "../components/GemList";
import { parse } from "query-string";
import AppContext from "../Context";
import Button from "../components/Button";
import Filters from "../components/Filters";
import LoadMore from "../components/LoadMore/LoadMore";
import { PageError } from "../components/Errors/Errors";

const Header = styled.h3`
    text-align:center;
    background:var(--form-bg);
    color:var(--gold);
    max-width:90%;
    margin: 10px auto;
    padding: 10px;

`;

function FilterPage () 
{
    const { sendData, baseUrl } = useContext( AppContext );
    const [ results, setResults ] = useState( {
        gems: [],
        count: 0,
        error: null
    } );
    const history = useHistory();

    const { search } = useLocation();
    const { type, cutType } = parse( search );

    const filter = async () =>
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

        if ( count )
        {
            url = `${ url }&lastId=${ gems[ gems.length - 1 ] }`;
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
                setResults( { ...results, error: error.error } );
                return;
            }

            setResults( { ...results, error } );
        }
        else
        {
            if ( count )
            {
                const gems = [ ...results.gems, ...data.gems ];
                setResults( { gems, count: data.count, error: null } );
            }
            else
            {
                setResults( { gems: [ ...data.gems ], count: data.count, error: null } );
            }

        }
    };


    useEffect( () => 
    {
        if ( !baseUrl )
        {
            history.push( "/" );
            return;
        }

        const getGems = async () =>
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

            const { data, error } = await sendData(
                {
                    endpoint: url
                }
            );

            if ( error )
            {

                if ( typeof error === "object" )
                {
                    setResults( ( state ) => ( { ...state, error: null } ) );
                    return;
                }

                setResults( ( state ) => ( { ...state, error } ) );
            }


            setResults( { gems: [ ...data.gems ], count: data.count, error: null } );

        };

        getGems();

    }, [ baseUrl, history, cutType, type, sendData ] );


    return (
        <div>
            <Filters />


            <Header>
                { results.count } result(s) found for { type ? type : "" } { type && cutType && "," } { cutType ? `${ cutType }` : "" }
            </Header>

            <GemList items={ results.gems } />
            {  ( results.count > results.gems.length ) &&
                <LoadMore click={ filter } />
            }



            {
                results.error && !results.count &&
                <>
                    <PageError message={ results.error } />
                    <Button onClick={ filter }>
                        Retry
                </Button>
                </>
            }


            {
                results.error && results.count &&
                <>
                    <PageError message={ results.error } />
                    <Button onClick={ filter }>
                        Retry
                </Button>
                </>
            }



        </div>
    );
}

export default FilterPage;
