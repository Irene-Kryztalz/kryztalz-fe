import React, { useState, useContext } from 'react';
import { NavLink } from "react-router-dom";
import { normal, auth, user } from "../../../routes";
import Menu from "../UserActions/UserActions";
import CurrencySelect from "../../CurrencySelect/CurrencySelect";
import SearchInput from "../../SearchInput/SearchInput";
import AppContext from "../../../Context";
import logo from "../../../assets/images/logo-small.svg";
import cart from "../../../assets/images/cart-icon.svg";
import avatar from "../../../assets/images/user.svg";

import classes from "./MobileNav.module.css";

function MobileNav ()
{
    const [ menuOpen, setMenuOpen ] = useState( false );
    const [ search, setSearch ] = useState( false );
    const [ currMenuOpen, setCurrMenuOpen ] = useState( false );
    const { cart: cartItems } = useContext( AppContext );

    const closeAll = () => 
    {
        setMenuOpen( false );
        setCurrMenuOpen( false );
        setSearch( false );
    };

    const toggleMenu = ( event ) => 
    {
        event.stopPropagation();
        closeAll();
        setMenuOpen( !menuOpen );
    };

    const toggleCurrMenu = ( event ) => 
    {
        event.stopPropagation();
        closeAll();
        setCurrMenuOpen( !currMenuOpen );
    };

    const toggleSearch = () =>
    {
        closeAll();
        setSearch( !search );
    };



    return (
        <nav className={ classes.NavMobile } >

            <header className={ classes.TopNav }>

                <div className={ classes.LogoCurrency }>
                    <NavLink to="/" className={ classes.Logo }>
                        <img src={ logo } alt="kryztalz logo, a diamond shape" />
                    </NavLink>

                    <CurrencySelect isOpen={ currMenuOpen } toggle={ toggleCurrMenu } />
                </div>

                {
                    search ?
                        <>
                            <SearchInput />
                            <button className={ classes.ToggleSearch } onClick={ toggleSearch }>
                                <i className="fas fa-times"></i>
                            </button>
                        </> :
                        <button onClick={ toggleSearch } className={ classes.ToggleSearch }>
                            <i className="fas fa-search"></i>
                        </button>
                }

            </header >

            <div onClick={ closeAll } className={ classes.BottomNav } >

                <div className={ classes.BNWrap }>

                    <NavLink to="/cart" className={ [ classes.FooterIcon, classes.Cart ].join( " " ) }>
                        <img src={ cart } alt="cart icon showing number of items in cart" />

                        <p title={ `${ cartItems.length } items in cart` }>{ cartItems.length }</p>
                    </NavLink>

                    <NavLink activeClassName={ classes.Active } className={ classes.Link } to={ normal[ 0 ].path }>
                        { normal[ 0 ].text }
                    </NavLink>

                    <button onClick={ toggleMenu } className={ classes.FooterIcon }>
                        <img src={ avatar } alt="icon of a user" />
                    </button>

                    <Menu mobile toggle={ toggleMenu } isOpen={ menuOpen } menuItems={ [ ...auth, ...user ] } />

                </div>

            </div>
        </nav >
    );
}

export default MobileNav;
