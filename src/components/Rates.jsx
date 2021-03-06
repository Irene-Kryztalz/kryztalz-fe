import { useContext } from 'react';
import AppContext from "../Context";


function Rates ( { price, asIs, curr } ) 
{
    const { rates, activeCurr, currencies } = useContext( AppContext );
    const symbol = curr ? curr : ( activeCurr ? currencies[ activeCurr ].currencySymbol : "₦" );


    const convertToCurrency = ( price ) => 
    {
        if ( asIs )
        {
            return new Intl.NumberFormat( 'en-NG' ).format( +price );

        }

        if ( rates.NGN )
        {

            const usdToNaira = +rates.NGN;
            const valueToUSD = price / usdToNaira;

            const valueToActiveCurr = valueToUSD * +rates[ activeCurr.toUpperCase() ];

            return new Intl.NumberFormat( 'en-NG' ).format( valueToActiveCurr );
        }

        return new Intl.NumberFormat( 'en-NG' ).format( +price );

    };

    return `${ symbol } ${ convertToCurrency( price ) }`;
}

export default Rates;
