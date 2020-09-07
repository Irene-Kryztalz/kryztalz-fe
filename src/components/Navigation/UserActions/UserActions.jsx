import React from 'react';
import { NavLink } from "react-router-dom";
import classes from "./UserActions.module.css";

function UserActions ( { menuItems } )
{
    return (
        <div className={ classes.Menu }>

            <div className={ classes.MenuWrap } >
                { menuItems.map( menu => 
                {
                    const a = <NavLink exact className={ classes.Item } key={ menu.path } to={ menu.path }>{ menu.text }</NavLink>;

                    return a;
                } ) }
            </div>



        </div>
    );
}

export default UserActions;
