import React from 'react';
import styled from "styled-components";
import { PageError } from "./Errors/Errors";
import Button from "./Button";


const Retry = styled( Button )`
    margin:20px auto;
    display:block;
`;

function RetryError ( { action, message, btnText } ) 
{
    return (
        <>
            <PageError message={ message } />
            <Retry onClick={ action }>
                { btnText }
            </Retry>
        </>
    );
}

export default RetryError;
