import React, { useState } from 'react';
import styled from "styled-components";
import Field from "./Inputs/Field";
import Button from "./Button";

import bg from "../assets/images/logo-mono.svg";

const Item = styled.div`
    border-top: 1px solid var(--gold);
    border-bottom: 1px solid var(--gold);
    background: var(--form-bg);
    display:grid;
    grid-template-columns: 40% 60%;
    margin: 20px auto;
    width:80%;
    max-width:700px;

    .image
    {
        min-height:200px;
        max-height:250px;
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
        padding: 10px;

        >* 
        {
            margin-bottom:20px;
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


    const [ qty, setQty ] = useState( quantity );

    const changeHandler = ( e, gem ) =>
    {
        const value = +e.target.value;
        updateCart( gem, value );
        setQty( value );
    };

    return (
        <Item>

            <div className="image">
                <img src={ image } alt="" />
            </div>
            <div className="details">
                <h2>Name: { name }</h2>
                <p>Price per weight: { price }</p>

                <Field control="number"
                    label="Quantity"
                    value={ qty }
                    name="quantity"
                    changeHandler={ e => changeHandler( e, { _id: gemId, quantity } ) }
                />


                <Button
                    onClick={ () => updateCart( { _id: gemId, }, null, true ) } >
                    Remove from cart
                </Button>
            </div>

        </Item>
    );
}

export default CartItem;
