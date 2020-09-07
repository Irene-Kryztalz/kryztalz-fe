import React from 'react';
import classes from "./SearchInput.module.css";

function SearchInput ()
{
    return (
        <div className={ classes.Search }>
            <input type="search" placeholder="Search gem ..." />
            <i className="fas fa-search"></i>
        </div>
    );
}

export default SearchInput;
