import React, { useContext, useState } from 'react';
import AppContext from "../../Context";
import classes from "./CurrencySelect.module.css";

function CurrencySelect ( { toggle, isOpen } )
{
    const [ curr, setCurr ] = useState( "" );
    const { currencies, activeCurr, changeCurr } = useContext( AppContext );

    const changeHandler = ev =>
    {
        const value = ev.target.value;
        setCurr( value );
    };

    const clickHandler = ev =>
    {
        changeCurr( ev.target.dataset.value );
        toggle();
    };

    const filteredCurr = Object.keys( currencies ).filter( c =>
    {
        const _curr = curr.toLowerCase();

        return ( c.indexOf( _curr ) > -1 ) || ( currencies[ c ].currencyName.indexOf( _curr ) > -1 ) || ( currencies[ c ].currencySymbol.indexOf( _curr ) > -1 );
    } );

    return activeCurr && (
        <div className={ classes.Wrap }>

            <p onClick={ toggle } className={ classes.ActiveCurr }>Currency :<span> { activeCurr } ({ currencies[ activeCurr ].currencySymbol }) </span>  </p>
            <i onClick={ toggle } className="fas fa-caret-down"></i>

            {
                isOpen && ( <div className={ classes.CurrencyMenu }>
                    <input placeholder="Search currency..." value={ curr } onChange={ changeHandler } type="text" />
                    <ul className={ classes.List } >

                        {
                            filteredCurr.length > 0 ?
                                filteredCurr.map( c =>
                                {
                                    return (
                                        <li onClick={ clickHandler } data-value={ c } key={ c }>
                                            { currencies[ c ].currencyName }
&nbsp;&nbsp;
                                            { currencies[ c ].currencySymbol }
                                        </li>
                                    );
                                } )

                                :

                                <h2>Could not find currency</h2>


                        }


                    </ul>
                </div>
                )
            }

        </div>
    );
}

export default CurrencySelect;
