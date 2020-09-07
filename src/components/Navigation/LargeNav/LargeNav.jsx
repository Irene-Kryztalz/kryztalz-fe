import React from 'react';
import classes from "./LargeNav.module.css";
import logo from "../../../assets/images/logo-small.svg";

function LargeNav ()
{
    return (
        <nav className={ classes.NavBar }>

            <div className={ classes.LogoSearch }>
                <div className={ classes.Logo }>
                    <img src={ logo } alt="kryztalz logo, a diamond shape" />
                </div>

                <div className={ classes.Search }>
                    <input type="search" placeholder="Search gem ..." />
                </div>

            </div>
            <div></div>

        </nav>
    );
}

export default LargeNav;
