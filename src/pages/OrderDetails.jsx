import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import AppContext from "../Context";

function OrderDetails ()
{
    const { baseUrl } = useContext( AppContext );

    const { state } = useLocation();
    const history = useHistory();

    useEffect( () =>
    {
        if ( !baseUrl || !state?._id )
        {
            history.push( "/products" );
        }

    }, [ baseUrl, history, state ] );


    return (
        <div>
            {state ? state._id : null }
        </div>
    );
}

export default OrderDetails;
