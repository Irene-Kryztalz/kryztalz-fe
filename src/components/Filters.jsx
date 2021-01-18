import React, { useState } from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import types, { cuts } from "../utils/gemList";
import SearchDropDown from "./SearchDropDown";
import Button from "./Button";

const FilterSection = styled.section`

    display:flex;
    margin-top:30px;
    flex-direction:column;
    justify-content:space-evenly;
    flex-wrap:wrap;
    align-items:center;
    color:var(--gold);
    font-size:1.2rem;

    > *
    {
        margin-top:10px;
    }

    @media screen and (min-width:768px)
    {
        flex-direction:row
    }

    


`;


function Filters () 
{
    const history = useHistory();
    const [ type, setType ] = useState( "" );
    const [ cutType, setCutType ] = useState( "" );

    const changeHandler = ( value, isCut ) =>
    {

        if ( isCut )
        {
            setCutType( value.trim().toLowerCase() );
            return;
        }
        setType( value.trim().toLowerCase() );
    };

    const filter = () =>
    {
        if ( type || cutType )
        {
            let url = `/products/filter?`;

            if ( type )
            {
                url = `${ url }type=${ type }`;
            }
            if ( cutType )
            {
                url = `${ url }${ type ? "&" : "" }cutType=${ cutType }`;
            }

            history.push( url );
        }
    };


    return (
        <FilterSection>

            <p>Filter by : </p>

            <SearchDropDown isCut changeHandler={ changeHandler } placeholder="Cut-Type" collection={ cuts } />

            <SearchDropDown changeHandler={ changeHandler } placeholder="Type" collection={ types } />

            <Button onClick={ filter } >Apply Filter</Button>
        </FilterSection>
    );
}

export default Filters;
