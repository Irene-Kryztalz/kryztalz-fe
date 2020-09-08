import React from 'react';
import classes from "./CurrencySelect.module.css";

function CurrencySelect ()
{
    return (
        <div className={ classes.Wrap }>

            <p className={ classes.ActiveCurr }>Currency : NGN (#) </p>
            <i className="fas fa-caret-down"></i>

        </div>
    );
}

export default CurrencySelect;
