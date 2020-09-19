import React, { useContext, useEffect, useState } from 'react';
import { parse } from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import AppContext from "../../Context";
import Failure from "./Failure";
import Success from "./Success";

function Test ()
{
    const { search } = useLocation();
    const { sendData, baseUrl } = useContext( AppContext );
    const history = useHistory();
    const [ comp, setComp ] = useState( null );

    useEffect( () =>
    {

        const confirmEmail = async () =>
        {

            const response = await sendData(
                {
                    endpoint: `confirm-email${ search }`
                } );

            if ( !response.error )
            {
                setComp( <Success /> );
            }
            else
            {
                const { id } = parse( search );
                setComp( <Failure id={ id } /> );
            }


        };

        if ( baseUrl ) confirmEmail();

    }, [ baseUrl, search, sendData, history ] );



    return comp;
}

export default Test;
