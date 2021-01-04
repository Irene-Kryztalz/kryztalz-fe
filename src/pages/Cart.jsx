import React, { useContext } from 'react';
import AppContext from "../Context";
import CartItem from "../components/CartItem";

function Cart ()
{
    const { cart, updateCart } = useContext( AppContext );

    const editCart = ( gem, newQty, remove ) =>
    {
        const quantity = newQty ? newQty - gem.quantity : 0;
        updateCart( gem, quantity, remove );
    };


    return (
        <div>

            {
                cart.map( gem => <CartItem
                    key={ gem.gemId._id }
                    gemId={ gem.gemId._id }
                    name={ gem.gemId.name }
                    quantity={ gem.quantity }
                    image={ gem.gemId.image || gem.gemId.imageUrls[ 0 ] }
                    price={ gem.gemId.price }
                    updateCart={ editCart }
                /> )
            }
        </div>
    );
}

export default Cart;
