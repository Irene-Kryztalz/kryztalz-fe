import React from 'react';
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import classes from "./Mail.module.css";

function AfterSignUp ()
{

    const { search } = useLocation();
    const { name, email } = parse( search );

    return (
        <div className={ classes.Body } >
            <h1 className={ classes.Header }>Welcome, { name } </h1>

            <div className={ classes.Content }>
                <p>An email confirmation link has been sent to { email }</p>
                <br />
                <small>** Check spam if the mail is not in your inbox **</small>
            </div>

        </div>
    );


}

export default AfterSignUp;
