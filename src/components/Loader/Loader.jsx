import React from 'react';
import Overlay from "../Overlay";
import classes from "./Loader.module.css";

function Loader ()
{
    return (
        <>
            <Overlay />
            <div className={ classes.Content }>
                <div className={ classes.LDS }></div>
                <h1>Loading, please wait</h1>
            </div>

        </>
    );
}

export default Loader;
