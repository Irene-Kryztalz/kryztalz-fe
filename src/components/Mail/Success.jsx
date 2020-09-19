import React from 'react';
import { NavLink } from "react-router-dom";
import classes from "./Mail.module.css";

function Success () 
{
    return (
        <div className={ classes.Body } >
            <h1 className={ classes.Header }>Congratulations!</h1>

            <div className={ classes.Content }>

                <p>Your account has been verified.</p>

                <NavLink className={ classes.Link } to="/sign-in" >
                    Proceed to sign in
            </NavLink>

            </div>



        </div>
    );
}

export default Success;
