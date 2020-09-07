import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { normal, auth, user } from "../../../routes";
import SearchInput from "../../SearchInput/SearchInput";
import Menu from "../UserActions/UserActions";
import logo from "../../../assets/images/logo-small.svg";
import cart from "../../../assets/images/cart-icon.svg";
import avatar from "../../../assets/images/user.svg";
import classes from "./LargeNav.module.css";

function LargeNav ()
{
    const [ menuOpen, setMenuOpen ] = useState( false );

    const toggleMenu = ( event ) => 
    {
        event.stopPropagation();
        setMenuOpen( !menuOpen );
    };

    const closeAll = () => 
    {
        setMenuOpen( false );
    };

    return (
        <nav onClick={ closeAll } className={ classes.NavBar }>

            <div className={ classes.LogoSearch }>
                <NavLink to="/" className={ classes.Logo }>
                    <img src={ logo } alt="kryztalz logo, a diamond shape" />
                </NavLink>

                <SearchInput />

            </div>
            <div className={ classes.Others }>

                <select name="" id="">
                    <option value="jnjn">Hello</option>
                </select>

                {
                    normal.map( link => 
                    {
                        const a = <NavLink exact activeClassName={ classes.Active } className={ classes.Link } key={ link.path } to={ link.path }>{ link.text }</NavLink>;

                        return a;
                    } )
                }

                <NavLink to="/cart" className={ classes.Cart }>
                    <img src={ cart } alt="cart icon showing number of items in cart" />
                    <p title="20 items in cart" >20</p>
                </NavLink>

                <button onClick={ toggleMenu } className={ classes.Avatar }>
                    <img src={ avatar } alt="icon of a user" />
                </button>

                <Menu toggle={ toggleMenu } isOpen={ menuOpen } menuItems={ [ ...auth, ...user ] } />

            </div>

        </nav>
    );
}

export default LargeNav;
