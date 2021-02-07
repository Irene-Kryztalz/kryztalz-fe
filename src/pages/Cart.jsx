import React, { useContext } from 'react';
import styled from "styled-components";
import AppContext from "../Context";
import CartItem from "../components/CartItem";
import OrderForm from "../components/OrderForm";
import Back from "../components/Back";


const Header = styled.h2`
    margin: 60px 6% 10px;
    font-size: 2rem;
    color: var(--gold);

    @media screen and (min-width:768px)
    {
        margin: 25px 6% 10px;
    }
`;


const CartSection = styled.div`
    display:grid;
    width:90vw;
    max-width: 1200px;
    margin: 20px auto;
    background: var(--form-bg);
    border-radius: 10px;
    padding:10px;
    gap:10px;

    @media screen and (min-width:768px)
    {
        grid-template-columns: 60% 40%;
        padding: 30px 20px;
    }

    .items
    {
        max-height: 100vh;
        overflow-y:auto;
        
        /* Handle */
        ::-webkit-scrollbar-thumb 
        {
            border-radius:5px;
        }
    }

    .empty
    {
        color:var(--gold);
        text-align:center;
    }
`;



function Cart ()
{
    const { cart, updateCart } = useContext( AppContext );

    const editCart = ( gem, newQty, remove ) =>
    {
        const quantity = newQty ? newQty - gem.quantity : 0;
        updateCart( gem, quantity, remove );
    };


    return (
        <>
            <Header>My shopping Cart</Header>
            <CartSection>

                {
                    cart.length ?


                        <div className="items">

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


                        :


                        <h2 className="empty">
                            No items in cart.
                 </h2>



                }

                { cart.length ? <OrderForm /> : null }


            </CartSection>

            <Back />

        </>
    );
}

export default Cart;
