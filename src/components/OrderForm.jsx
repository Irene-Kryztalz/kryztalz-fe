import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AppContext from "../Context";
import Field from "./Inputs/Field";
import Button from "./Button";
import Rates from "./Rates";
import { PageError } from "./Errors/Errors";

const Summary = styled.div`

    font-family:'Croissant One', cursive;
    margin: 20px 0;
    background:var(--gold);
    border-radius:10px;
    padding: 20px;
    font-size:0.8rem;

    @media screen and (min-width:768px)
    {
        font-size:1rem;
        margin: 0 5%;
    }

    .title
    {
        font-size: 1.8em;
    }

    .row
    {
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding: 10px 5%;
        font-size: 1.05em;
    }

    form
    {
        margin:0 2%;
        border: 1px dashed var(--bg);
        padding: 3%;

        .label
        {
            display: block;
        }

        .input
        {
            margin:10px 0;
            border:none;
            border-bottom: 2px solid var(--bg);
            width:100%;
            padding:8px;
            font-family: 'Crimson Pro', serif;
            font-size:1em;
            outline:none;

        }

        .input:focus
        {
            box-shadow: 0 0 5px var(--blue);
        }

        .center
        {
            text-align:center;
        }

    }
`;

const getTotal = ( items ) =>
{
    const total = items.reduce( ( sum, gem ) => 
    {
        return sum + ( gem.quantity * gem.gemId.price );
    }, 0 );

    return total;
};

function OrderForm () 
{
    const history = useHistory();
    const {
        cart,
        sendData,
        rates,
        activeCurr,
        currencies,
        clearCartOrWishList,
        updateOrders,

    } = useContext( AppContext );

    const [ details, setDetails ] = useState(
        {
            address: [ "", "", "" ],
            description: "",
            discount: 0
        }
    );

    const [ applied, setApplied ] = useState( false );
    const [ error, setError ] = useState( null );
    const symbol = activeCurr ? currencies[ activeCurr ].currencySymbol : "₦";


    const createOrder = async ( e ) =>
    {
        e.preventDefault();
        const { address, description, discount } = details;
        const items = cart.map( gem => (
            {
                _id: gem.gemId._id,
                quantity: +gem.quantity,
            }
        ) );

        const rateToCurr = +( rates[ "NGN" ] / rates[ activeCurr.toUpperCase() ] ).toFixed( 4 );

        const order =
        {
            items,
            userCurrency: currencies[ activeCurr ].currencySymbol,
            discount,
            deliveryAddress: address,
            description,
            rateToCurr,
        };

        console.log( order );

        /* const {data,error} = await sendData(
            {
                endpoint: "orders",
                formData: JSON.stringify( order ),
                method: "post",
                headers:
                {
                    "Content-Type": "application/json"
                }
            }
        );

        if ( error )
        {
            if ( typeof error === "string" )
            {
                setError( error );
                return;
            }

            setError( error.error );
        }
        else
        {
            clearCartOrWishList(true);
            console.log(data);
            history.push( "/products" );
        } */

    };

    const calcDiscount = () =>
    {
        setApplied( true );
        const total = getTotal( cart );

        const discPercent = Math.floor( Math.random() * 10 );

        if ( discPercent % 2 === 0 )
        {
            const state = { ...details };
            state.discount = +( discPercent.toFixed( 4 ) ) * 0.01 * total;
            setDetails( state );
        }
    };

    const changeHandler = ( e ) =>
    {
        const form = { ...details };
        const { name, value } = e.target;

        if ( name.includes( "line" ) )
        {

            const index = +name.split( "Address line " )[ 1 ] - 1;
            form.address[ index ] = value;
        }
        else
        {
            form[ name ] = value;
        }

        setDetails( form );
    };


    return (
        <Summary>
            {
                error && <PageError message={ error } />
            }


            <h3 className="title" >Order Summary</h3>

            <div className="row">
                <p>Total number of items : </p>
                <p> { cart.length } </p>
            </div>

            <div className="row">
                <p>Total price : </p>
                <p>{ symbol }  <Rates price={ getTotal( cart ) } /> </p>
            </div>

            {
                applied ?

                    <div className="row">
                        <p>Discount: </p>
                        <p> - { symbol }  <Rates price={ details.discount } /> </p>
                    </div>
                    :
                    <div className="row">
                        <p>Apply Discount </p>
                        <Button
                            color="var(--gold)"
                            bg="var(--nav-bg)"
                            type="submit"
                            font="1em"
                            onClick={ calcDiscount }
                        >
                            I'm feeling lucky!
                </Button> </div>

            }

            <div className="row">
                <p>Amount Due: </p>
                <p>{ symbol }  <Rates price={ getTotal( cart ) - details.discount } /> </p>
            </div>


            <form onSubmit={ createOrder }>

                <Field
                    classNamesLabel="label"
                    classNamesInput="input"
                    label="Description"
                    name="description"
                    control="textarea"
                    changeHandler={ changeHandler }
                />

                {
                    details.address.map( ( _, i ) => <Field
                        classNamesLabel="label"
                        classNamesInput="input"
                        key={ i }
                        label={ `Address line ${ i + 1 }` }
                        name={ `Address line ${ i + 1 }` }
                        changeHandler={ changeHandler }
                    />
                    )
                }


                <div className="center">
                    <Button
                        color="var(--gold)"
                        bg="var(--nav-bg)"
                        type="submit"
                    >
                        Order
                </Button>
                </div>



            </form>
        </Summary>
    );
}

export default OrderForm;
