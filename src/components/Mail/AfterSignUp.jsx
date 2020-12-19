import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { parse } from "query-string";
import classes from "./Mail.module.css";
import Button from "../Button";

const getTime = () =>
{
    const now = new Date().getTime();
    const later = JSON.parse( localStorage.getItem( "mail" ) );

    const diff = later ? later - now : 0;

    return diff;
};

function AfterSignUp ()
{
    const [ disabled, setDisabled ] = useState( true );
    const [ left, setLeft ] = useState( `${ parseInt( getTime() / 60000, 10 ) } mins` );
    const history = useHistory();
    const { search } = useLocation();
    const { name, email } = parse( search );

    useEffect( () => 
    {
        const diff = getTime();

        let timer;
        const run = () => setDisabled( false );

        if ( diff > 0 )
        {
            timer = setTimeout( () => run, diff );
        }
        else
        {
            run();
        }

        return () => clearTimeout( timer );


    }, [] );

    useEffect( () => 
    {
        if ( getTime() <= 0 )
        {
            setDisabled( false );
            return;
        }

        let timer = setInterval( () =>
        {
            const left = getTime();
            setLeft( `${ parseInt( left / 60000, 10 ) } mins` );
        }, 1000 * 60 );

        return () => clearInterval( timer );


    }, [] );

    if ( !name || !email )
    {
        history.push( "/" );
        return <div />;
    }

    return (
        <div className={ classes.Body } >
            <h1 className={ classes.Header }>Welcome, { name } </h1>

            <div className={ classes.Content }>
                <p>An email confirmation link has been sent to { email }</p>
                <br />
                <small>** Check spam if the mail is not in your inbox **</small>
            </div>

            <br />

            { getTime() > 0 && <p>The link below will become active in { left }</p> }

            <br />
            <Button
                onClick={ () => history.push( "/verify-account" ) }
                disabled={ disabled } >
                Resend email</Button>

        </div>
    );


}

export default AfterSignUp;
