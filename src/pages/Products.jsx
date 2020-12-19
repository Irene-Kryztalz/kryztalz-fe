import React, { useContext } from 'react';
import GemList from "../components/GemList";
import AppContext from "../Context";

function Products () 
{
    const { gems, sendData, count } = useContext( AppContext );


    return (
        <div>
            <GemList items={ gems } />
        </div>
    );
}

export default Products;
