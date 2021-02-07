import React from 'react';
import styled from "styled-components";
import WishItem from "./WishItem";

const List = styled.section`
        background:var(--form-bg);
        display:grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-gap: 20px;
        padding:20px 10px;
        font-family: 'Crimson Pro', serif;
        font-size:1rem;

        @media screen and (min-width:680px)
        {
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));

        }

`;

function WishlistItems ( { items, addCart, removeWL } ) 
{
    return (
        <List>
            {
                items.map( item => 
                {
                    const gem = item.gemId;
                    return <WishItem
                        key={ gem._id }
                        addCart={ () => addCart( gem ) }
                        removeWL={ () => removeWL( gem ) }
                        gem={ gem } />;
                } )
            }

        </List>
    );
}

export default WishlistItems;
