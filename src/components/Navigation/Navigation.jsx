import React, { useState } from 'react';
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
            />
            <MobileNav
                search={ search }
                currMenuOpen={ currMenuOpen }
                toggleCurrMenu={ toggleCurrMenu }
                toggleSearch={ toggleSearch }
                toggleMenu={ toggleMenu }
                menuOpen={ menuOpen }
            />
        </>
    );
}

export default Navigation;
