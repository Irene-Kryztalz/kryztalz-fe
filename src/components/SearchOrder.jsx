import React, { useEffect, useContext, useState } from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import AppContext from "../Context";
import Button from "./Button";
import Field from "./Inputs/Field";

const Search = styled.div`
    border:1px solid var(--gold);
    padding:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;

    @media screen and (min-width:768px)
    {
        flex-direction:row;
    }
`;


function SearchOrder () 
{
    const { sendData, baseUrl } = useContext( AppContext );
    const history = useHistory();
    const [ id, setId ] = useState( "" );
    const [ error, setError ] = useState( null );


    const search = async () =>
    {
        if ( baseUrl && id )
        {
            const { data, error } = await sendData(
                {
                    endpoint: `orders/${ id }`
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
            else
            {
                setError( null );
                history.push( { pathname: `/order/${ id }`, state: data } );
            }
        }
    };

    const changeHandler = ( e ) =>
    {
        const value = e.target.value.trim();
        setId( value );
    };


    return (
        <Search>

            <Field
                control="search"
                label="Find order by ID"
                placeholder="order id"
                changeHandler={ changeHandler }

            />

            <Button onClick={ search } >Find</Button>

        </Search>
    );
}

export default SearchOrder;
