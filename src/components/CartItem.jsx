import React, { useState, useContext } from 'react';
import styled from "styled-components";
import Field from "./Inputs/Field";
import Button from "./Button";
import Rates from "./Rates";
import AppContext from "./../Context";

import bg from "../assets/images/logo-mono.svg";

const Item = styled.div`
    border-bottom: 1px solid var(--gold);
    font-family: 'Crimson Pro', serif;
    font-size:1rem;
    grid-template-rows: 180px auto;
    display:grid;
    max-width:700px;

    @media screen and (min-width:768px)
    {
        grid-template-columns: 40% 60%;
        grid-template-rows: unset;
    }

    .image
    {
        width:100px;
        height:100px;
        margin:auto;
        border-radius:50%;
        text-align:center;
        overflow:hidden;
        background: url(${ bg });
        background-size:contain;
        background-position:center;
        background-repeat:no-repeat;

        img
        {
            object-fit:cover;
            width:100%;
            height:100%;
        }
    }

    .details
    {
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        justify:content:center;
        text-transform:capitalize;
        padding: 18px;
        font-size:1.1rem;

        >* 
        {
            margin-bottom:20px;
        }

        .name
        {
            border: 1px solid var(--gold);
            background:var(--purple-transparent);
            padding:5px;
        }

        .price
        {
            font-weight:bold
        }

        .controls
        {
            display:flex;
            position:relative;
            margin-top:10px;
            justify-content:space-between;
            align-items:center;
            width:60%;

            button
            {
                font-weight:bold;
            }

            .label
            {
                display:block;
                position:absolute;
                top:-22px;
                left:0;
                color:var(--gold);
                letter-spacing:2px;
            }

            .input
            {
                max-width:60px;
                padding:8px;
                text-align:center;
                border:none;
                border-radius:8px;
                font-size:1rem;
            }
        }
    }

`;

function CartItem ( props )
{
    const { name,
        quantity,
        image,
        gemId,
        price, updateCart } = props;

    const { activeCurr, currencies } = useContext( AppContext );

    const symbol = activeCurr ? currencies[ activeCurr ].currencySymbol : "₦";


    const [ qty, setQty ] = useState( quantity );

    const changeHandler = ( e, gem ) =>
    {
        const value = +e.target.value;
        updateCart( gem, value );
        setQty( value );
    };

    const counter = ( gem, amount = 1 ) =>
    {
        updateCart( gem, qty + amount );
        setQty( qty => qty + amount );
    };

    return (
        <Item>

            <div className="image">
                <img src={ image } alt="" />
            </div>
            <div className="details">
                <h2 className="name">Name: { name }</h2>
                <p className="price" >Price : { symbol } { <Rates price={ qty * price } /> } </p>

                <section className="controls">
                    <Button
                        pad="3px 10px"
                        font="25px"
                        radius="10px"
                        onClick={ () => counter( { _id: gemId, quantity }, -1 ) } >
                        -
                </Button>
                    <Field control="number"
                        classNamesLabel="label"
                        classNamesInput="input"
                        label="Quantity"
                        value={ qty }
                        name="quantity"
                        changeHandler={ e => changeHandler( e, { _id: gemId, quantity } ) }
                    />
                    <Button
                        pad="3px 10px"
                        font="20px"
                        radius="10px"
                        onClick={ () => counter( { _id: gemId, quantity } ) } >
                        +
                </Button>
                </section>



                <Button
                    onClick={ () => updateCart( { _id: gemId, }, null, true ) } >
                    Remove from cart
                </Button>
            </div>

        </Item>
    );
}

export default CartItem;
