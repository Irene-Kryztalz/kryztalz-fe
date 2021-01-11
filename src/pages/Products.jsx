import React, { useContext } from 'react';
import GemList from "../components/GemList";
import AppContext from "../Context";
import Filters from "../components/Filters";
import LoadMore from "../components/LoadMore/LoadMore";

function Products () 
{
    const { count, gems, sendData, setGems } = useContext( AppContext );

    const getGems = async () =>
    {
        const { data } = await sendData(
            {
                endpoint: `shop/gems?lastId=${ gems[ gems.length - 1 ]._id }`
            }
        );

        setGems( data );
    };


    return (
        <div>
            <Filters />
            <GemList items={ gems } />
            {  ( count > gems.length ) &&
                <LoadMore click={ getGems } /> }
        </div>
    );
}

export default Products;
