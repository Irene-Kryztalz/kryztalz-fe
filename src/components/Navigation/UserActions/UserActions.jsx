import React from 'react';
import { NavLink } from "react-router-dom";
import classes from "./UserActions.module.css";

function UserActions ( { isOpen, menuItems, mobile = false, toggle } )
{
    const menuStyle = mobile ? classes.MenuMobile : classes.Menu;
    return isOpen && (

        <div onClick={ toggle } className={ menuStyle }>

            <div className={ classes.MenuWrap } >

                { mobile ? <div className={ classes.ArrowMobile }></div> : <div className={ classes.ArrowLarge }></div> }

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
