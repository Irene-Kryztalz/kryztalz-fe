import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import classes from "./SearchInput.module.css";

function SearchInput ()
{
    const history = useHistory();
    const [ state, setstate ] = useState( { last: "", value: "" } );

    const search = e =>
    {
        const { last, value } = state;

        if ( last !== value && value )
        {
            setstate( { last: value, value } );
            history.push( `/products/search?term=${ value }` );
        }
    };

    const change = e => 
    {
        setstate( { ...state, value: e.target.value } );
    };

    const pressEnter = e =>
    {
        if ( e.key === 'Enter' )
        {
            search();
        }
    };

    return (
        <div className={ classes.Search }>
            <input
                onKeyPress={ pressEnter }
                onChange={ change }
                value={ state.value }
                type="search"
                placeholder="Search gem ..." />
            <i
                role="button"
                onClick={ search }
                className="fas fa-search"></i>
        </div>
    );
}

export default SearchInput;
