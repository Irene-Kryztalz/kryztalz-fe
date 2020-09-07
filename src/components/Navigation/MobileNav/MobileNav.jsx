import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { normal, auth, user } from "../../../routes";
import Menu from "../UserActions/UserActions";
import SearchInput from "../../SearchInput/SearchInput";
import logo from "../../../assets/images/logo-small.svg";
import cart from "../../../assets/images/cart-icon.svg";
import avatar from "../../../assets/images/user.svg";

import classes from "./MobileNav.module.css";

function MobileNav ()
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
        <nav onClick={ closeAll } className={ classes.NavMobile } >

            <header className={ classes.TopNav }>

                <div className={ classes.LogoCurrency }>
                    <NavLink to="/" className={ classes.Logo }>
                        <img src={ logo } alt="kryztalz logo, a diamond shape" />
                    </NavLink>

                    <select name="" id="">
                        <option value="jnjn">Hello</option>
                    </select>
                </div>

                <SearchInput />



            </header>


            <footer className={ classes.BottomNav } >

                <div className={ classes.BNWrap }>

                    <NavLink to="/cart" className={ classes.FooterIcon }>
                        <img src={ cart } alt="cart icon showing number of items in cart" />
                        <p title="20 items in cart" >20</p>
                    </NavLink>

                    <NavLink activeClassName={ classes.Active } className={ classes.Link } to={ normal[ 0 ].path }>
                        { normal[ 0 ].text }
                    </NavLink>

                    <button onClick={ toggleMenu } className={ classes.FooterIcon }>
                        <img src={ avatar } alt="icon of a user" />
                    </button>

                    <Menu mobile toggle={ toggleMenu } isOpen={ menuOpen } menuItems={ [ ...auth, ...user ] } />

                </div>

            </footer>
        </nav>
    );
}

export default MobileNav;
