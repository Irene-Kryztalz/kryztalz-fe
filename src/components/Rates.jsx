import React, { useContext } from 'react';
import AppContext from "../Context";


function Rates ( { price } ) 
{
    const { rates, activeCurr } = useContext( AppContext );

    const convertToCurrency = ( price ) => 
    {
        if ( rates.NGN )
        {
            const usdToNaira = +rates.NGN;
            const valueToUSD = price / usdToNaira;

            const valueToActiveCurr = valueToUSD * +rates[ activeCurr.toUpperCase() ];

            return new Intl.NumberFormat( 'en-NG' ).format( valueToActiveCurr );
        }

        return new Intl.NumberFormat( 'en-NG' ).format( +price );

    };

    return convertToCurrency( price );
}

export default Rates;
