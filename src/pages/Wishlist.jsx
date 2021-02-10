import React, { useContext } from 'react';
import styled from "styled-components";
import AppContext from "../Context";
import WishlistItems from "../components/WishlistItems";
import Back from "../components/Back";

const WishlistPage = styled.section`
   width:90vw;
   max-width:1200px;
   margin: 50px auto ;
   min-height:80vh;

   .heading
   {
       color:var(--gold);
       margin-bottom:20px;
       font-size:2.5em;
   }   

    .empty
    {
        color:var(--gold);
        text-align:center;
    }
`;

function Wishlist ()
{
    const { wishlist, updateWishlist, updateCart } = useContext( AppContext );

    const addCart = ( gem ) =>
    {
        updateCart( gem, 1 );
        updateWishlist( gem, true );
    };

    const removeWL = gem =>
    {
        updateWishlist( gem, true );
    };


    return (
        <WishlistPage>
            <h2 className="heading" >My wishlist</h2>
            {
                wishlist.length
                    ?

                    <WishlistItems
                        addCart={ addCart }
                        removeWL={ removeWL }
                        items={ wishlist } />
                    :

                    <h2 className="empty">
                        No items in wishlist
                 </h2>
            }

            <Back />
        </WishlistPage>
    );
}

export default Wishlist;
