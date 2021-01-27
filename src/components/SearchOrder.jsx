import React, { useContext, useState } from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import AppContext from "../Context";
import Button from "./Button";
import Field from "./Inputs/Field";
import { PageError } from "./Errors/Errors";


const Search = styled.div`
    border:1px solid var(--gold);
    padding:10px;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    align-items:center;
    flex-direction:column;
    color:var(--gold);
    font-size:1.2rem;
    max-width:500px;

    .label
    {
        display:block
    }

    .input
    {
        padding:5px;
        font-size:0.9em;
    }

    .label,.input
    {
        margin-bottom:10px;
    }

    
    @media screen and (min-width:768px)
    {
        flex-direction:row;
        justify-content:start;

        .label
        {
            display:inline-block;
        }

        .label,.input
        {
            margin-bottom:00px;
            margin-right:20px;
        }
    }

    .error
    {
       flex: 0 0 100%;
       max-width:90%;
       font-size:0.9em !important;
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
        const isValid = id.match( /^[0-9a-fA-F]{24}$/ );

        if ( baseUrl && isValid )
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
        else
        {
            setError( "Invalid Order ID." );

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
                classNamesLabel="label"
                classNamesInput="input"

            />


            <Button pad="5px 10px" onClick={ search } >Find</Button>


            {
                error && <PageError styles="error" message={ error } />
            }



        </Search>
    );
}

export default SearchOrder;
