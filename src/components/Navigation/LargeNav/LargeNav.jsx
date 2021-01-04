import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { normal, auth, user } from "../../../routes";
import AppContext from "../../../Context";
import SearchInput from "../../SearchInput/SearchInput";
import Menu from "../UserActions/UserActions";
import CurrencySelect from "../../CurrencySelect/CurrencySelect";
import logo from "../../../assets/images/logo-small.svg";
import cart from "../../../assets/images/cart-icon.svg";
import avatar from "../../../assets/images/user.svg";
import classes from "./LargeNav.module.css";

function LargeNav ( { menuOpen, currMenuOpen, toggleCurrMenu, close, toggleMenu } )
{
    const { cart: cartItems, isAuth } = useContext( AppContext );


    return (
        <nav className={ classes.NavBar }>

            <div className={ classes.LogoSearch }>
                <NavLink to="/" className={ classes.Logo }>
                    <img onClick={ close } src={ logo } alt="kryztalz logo, a diamond shape" />
                </NavLink>

                <SearchInput />

            </div>
            <div className={ classes.Others }>

                <CurrencySelect isOpen={ currMenuOpen } toggle={ toggleCurrMenu } />

                {
                    normal.map( link => 
                    {
                        const a = <NavLink onClick={ close } exact activeClassName={ classes.Active } className={ classes.Link } key={ link.path } to={ link.path }>{ link.text }</NavLink>;

                        return a;
                    } )


                }

                <NavLink onClick={ close } to="/cart" className={ classes.Cart }>
                    <img src={ cart } alt="cart icon showing number of items in cart" />
                    <p title={ `${ cartItems.length } items in cart` }>{ cartItems.length }</p>
                </NavLink>

                <button onClick={ toggleMenu } className={ classes.Avatar }>
                    <img src={ avatar } alt="icon of a user" />
                </button>

                <Menu toggle={ toggleMenu } isOpen={ menuOpen } menuItems={ isAuth ? user : auth } />

            </div>

        </nav>
    );
}

export default LargeNav;
