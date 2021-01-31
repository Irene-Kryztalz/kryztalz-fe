import React, { useEffect } from 'react';

function ScrollToTop ( { children } ) 
{
    useEffect( () => 
    {
        window.scrollTo( 0, 0 );
    }, [] );

    return <>{ children }</>;
}

export default ScrollToTop;
