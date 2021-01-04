import React, { useState, useEffect } from 'react';
import LargeNav from "./LargeNav/LargeNav";
import MobileNav, { } from "./MobileNav/MobileNav";

function Navigation () 
{
    const [ menuOpen, setMenuOpen ] = useState( false );
    const [ search, setSearch ] = useState( false );
    const [ currMenuOpen, setCurrMenuOpen ] = useState( false );

    const closeAll = () => 
    {
        setMenuOpen( false );
        setCurrMenuOpen( false );
        setMenuOpen( false );
        setSearch( false );
    };

    useEffect( () =>
    {
        const resize = () => 
        {
            closeAll();
        };
        window.addEventListener( "resize", resize );
        return () => window.removeEventListener( "resize", resize );

    }, [] );

    const toggleMenu = () => 
    {
        closeAll();
        setMenuOpen( !menuOpen );
    };

    const toggleCurrMenu = () => 
    {
        closeAll();
        setCurrMenuOpen( !currMenuOpen );
    };

    const toggleSearch = () =>
    {
        closeAll();
        setSearch( !search );
    };

    return (
        <>
            <LargeNav
                currMenuOpen={ currMenuOpen }
                menuOpen={ menuOpen }
                toggleMenu={ toggleMenu }
                toggleCurrMenu={ toggleCurrMenu }
                close={ closeAll }
            />
            <MobileNav
                search={ search }
                currMenuOpen={ currMenuOpen }
                toggleCurrMenu={ toggleCurrMenu }
                toggleSearch={ toggleSearch }
                toggleMenu={ toggleMenu }
                menuOpen={ menuOpen }
                close={ closeAll }
            />
        </>
    );
}

export default Navigation;
