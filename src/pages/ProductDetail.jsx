import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import AppContext from "../Context";
import ProductImages from "../components/ProductImages";
import Title from "../components/Title";
import { PageError } from "../components/Errors/Errors";
import Rates from "../components/Rates";
import Button from "../components/Button";

const Details = styled.div`
    max-width:960px;
    width:90vw;
    margin: 20px auto;
    font-family: 'Crimson Pro', serif;
    font-size:1rem;

    .header
    {
        margin: 20px auto;
        font-family: 'Revalia', cursive !important;
    }

    .content
    {
        font-size:1.2em;
        background:var(--form-bg);
        padding: 20px;
        margin: 20px auto;
        color:#fff;

        .mt
        {
            margin-top:20px;
        }

        table
        {
            width: 100%;
            border-collapse: collapse;
            margin:20px auto;

            thead
            {
                background:var(--gold);
                color:var(--bg);
            }

            th,td
            {
                text-align:center;
                border: 1px solid var(--gold);
                padding:5px;
            }

            td:nth-child(2)
            {
                text-transform:capitalize;
            }
        }

        .actions
        {
            display:flex;
            align-item:center;
            justify-content:flex-end;
        }
    }
    
`;


function ProductDetail () 
{
    const history = useHistory();
    const { id } = useParams();

    const { sendData, updateCart, isAuth, updateWishlist } = useContext( AppContext );

    const [ state, setState ] = useState(
        {
            gem: {},
            error: null,
            mounted: false
        } );

    useEffect( () =>
    {

        if ( !state.mounted )
        {

            const getGem = async () =>
            {
                const { data, error, code } = await sendData(
                    {
                        endpoint: `shop/gems/${ id }`
                    } );


                if ( code && code >= 400 )
                {
                    setState(
                        {
                            error: "Bad request",
                            gem: {},
                            mounted: true

                        } );
                    return;
                }

                if ( code && code >= 500 )
                {
                    setState(
                        {
                            error: "Server could not respond",
                            gem: {},
                            mounted: true
                        } );
                    return;
                }

                if ( error )
                {
                    const state =
                    {
                        error,
                        gem: {},
                        mounted: true
                    };
                    if ( typeof error === "object" )
                    {
                        state.error = error.error;
                    }

                    setState( state );
                    return;

                }

                setState( {
                    error: null,
                    gem: data,
                    mounted: true
                } );


            };

            getGem();
        }
    }, [ state, sendData, id ] );

    const addToWishlist = ( gem ) =>
    {
        updateWishlist( gem );
        if ( !isAuth )
        {
            history.push( "/sign-in" );
        }
    };

    const addToCart = ( gem ) =>
    {
        updateCart( gem, 1 );
        if ( !isAuth )
        {
            history.push( "/sign-in" );
        }
    };

    const { gem, error, mounted } = state;

    return (

        <Details>
            {
                gem._id ?
                    <>
                        <Title className="header" content={ gem.name } />
                        <ProductImages images={ gem.imageUrls } />
                        <section className="content" >
                            <Title className="mt" content="Gem description" />

                            <p>
                                { gem.description }
                            </p>


                            <Title className="mt" content="Features" />
                            <table>
                                <thead>
                                    <tr className="thead">
                                        <th role="columnheader">Value</th>
                                        <th role="columnheader">Property</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Type</td>
                                        <td>{ gem.type }</td>
                                    </tr>
                                    <tr>
                                        <td>Cut</td>
                                        <td>{ gem.cutType }</td>
                                    </tr>
                                    <tr>
                                        <td>Price per unit</td>
                                        <td><Rates price={ gem.price } /></td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="actions">

                                <Button
                                    font="1rem"
                                    margin="0 5px 0 0"
                                    pad="5px"
                                    onClick={ () => addToCart( gem ) }>
                                    <i className="far fa-edit"></i>
                      &nbsp;  Add to cart
                    </Button>


                                <Button
                                    bg="#000"
                                    color="var(--gold)"
                                    pad="5px"
                                    font="1rem"
                                    onClick={ () => addToWishlist( gem ) }>
                                    <i className="far fa-trash-alt"></i>
                      &nbsp;   Add to wishlist
                    </Button>


                            </div>


                        </section>
                    </> :
                    (
                        mounted ?
                            <PageError message={ error } /> : null
                    )
            }

        </Details>
    );
}

export default ProductDetail;
