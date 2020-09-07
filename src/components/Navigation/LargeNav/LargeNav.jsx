import React from 'react';
import { NavLink } from "react-router-dom";
import { normal, auth, user } from "../../../routes";
import Menu from "../UserActions/UserActions";
import classes from "./LargeNav.module.css";
import logo from "../../../assets/images/logo-small.svg";
import cart from "../../../assets/images/cart-icon.svg";
import avatar from "../../../assets/images/user.svg";

function LargeNav ()
{
    return (
        <nav className={ classes.NavBar }>

            <div className={ classes.LogoSearch }>
                <NavLink to="/" className={ classes.Logo }>
                    <img src={ logo } alt="kryztalz logo, a diamond shape" />
                </NavLink>

                <div className={ classes.Search }>
                    <input type="search" placeholder="Search gem ..." />
                    <i className="fas fa-search"></i>
                </div>

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

                <button className={ classes.Avatar }>
                    <img src={ avatar } alt="icon of a user" />
                </button>

                <Menu menuItems={ [ ...auth, ...user ] } />

            </div>

        </nav>
    );
}

export default LargeNav;
