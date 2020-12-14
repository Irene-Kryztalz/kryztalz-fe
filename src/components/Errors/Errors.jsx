import React from 'react';
import { joinClasses } from "../../utils/joinClasses";
import classes from './Error.module.css';

function InputError ( { message, styles } ) 
{
    return (
        <div className={ joinClasses( classes.InputError, styles ) }>
            <h3>{ message }</h3>
        </div>
    );
}

function PageError ( { message, styles } ) 
{
    return (
        <div className={ joinClasses( classes.PageError, styles ) }>
            <h3>{ message }</h3>
        </div>
    );
}

export 
{
    InputError,
    PageError
};
