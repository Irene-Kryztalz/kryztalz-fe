import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import AppContext from "../Context";
import { dateFormatter } from "../utils/formatDate";
import { getPDF as pdf } from "../utils/getPDF";


const OrderDesc = styled.div`
    background: var(--form-bg);
    width:90vw;
    max-width:700px;
    margin: 60px auto;
    padding:10px;
    border-radius:10px;
    font-size:1.2rem;
    font-family: 'Crimson Pro', serif;
    color:var(--gold);
    word-break: break-all;

    @media screen and (max-width:300px)
    {
        font-size:1rem;
    }

    .header
    {
       display:flex;
       justify-content:space-between;
       align-items:center;
       margin:30px 0 ;

       button,a
       {
           background:none;
           font-size:inherit;
           padding:5px;
           text-decoration:none;
           color:#000;
           font-size: 0.9em ;
           font-family:inherit;
           background:var(--purple);
           color:var(--bg);
           text-transform:unset;
       }

       a
       {
           background:var(--bg);
           color:#fff;
           text-align:center;
       }
    }


    .field
    {
        display:flex;
        flex-direction:column;
        margin-bottom:20px;

        .bold
        {
            font-weight:800;
            padding:10px;
            background:var(--gold);
            color:var(--bg);
            border-radius: 4px;
            margin-bottom:10px;
        }


        @media screen and (min-width:768px)
        {
            flex-direction:row;
            align-items:center;

            .bold
            {
                margin-bottom:0;
                margin-right:20px;

                & ~ p
                {
                    letter-spacing:2px;
                }
            }
        }
    }

    .table
    {
        width: 100%;
        text-align: left;
        font-family: 'Croissant One', cursive;
        border-collapse: collapse;
        font-size:0.9em;

        .thead
        {
            background:var(--gold);
            color:var(--bg);

            th
            {                
                padding: 10px;
            }
        }

        th,td
        {
            border: 1px solid var(--bg);
        }

        .item
        {
            td
            {
                letter-spacing:1px;
                padding:10px 20px;
            }

            td:first-child
            {
                letter-spacing:0px;
                text-transform:capitalize
            }
        }

        @media screen and (max-width:767px)
        {
            table, thead, tbody, th, td, tr 
            {
                display: inline-block;
                border:none !important;
            }
            
            th
            {
                position: absolute;
                top: -9999px;
                left: -9999px;
            }

            tr
            {        
                padding: 0 10px;
                width:100%;
                margin-bottom: 10px;
            }

            .item
            {
                background:var(--bg);
                border-radius:4px;
            }

            .item:nth-child(even) 
            {
                background:var(--gold);
                color: var(--bg); 

                td:before
                {
                    border-bottom: 1px solid var(--bg);
                }
            }

            td
            {
                position:relative;
                text-transform:capitalize;

                span
                {
                    display:block;
                }
            }

             td:before 
            {
                content: attr(data-title);
                font-weight: bold;
                top: 0;
                left: 0;
                width: 45%;
                padding-right: 10px;
                border-bottom: 1px solid var(--gold);
            }

        }
    }



`;

const formatPrice = ( price, sym ) =>
{
    const res = +price ? new Intl.NumberFormat( 'en-NG' ).format( +price ) : 0;
    return `${ sym }${ res }`;
};

function OrderDetails ()
{
    const { baseUrl, sendData } = useContext( AppContext );

    const { state } = useLocation();
    const history = useHistory();

    useEffect( () =>
    {
        if ( !baseUrl || !state?._id )
        {
            history.push( "/products" );
        }

    }, [ baseUrl, history, state ] );

    const getPDF = async ( id ) =>
    {
        pdf( sendData, `orders/invoice/${ id }`, `${ id }-invoice` );
    };




    return (
        <OrderDesc>

            <div className="header">
                <Link to="/order-history" >Back to orders</Link>
                <button onClick={ () => getPDF( state._id ) } >Download Invoice</button>


            </div>

            <div className="field">
                <p className="bold">Order ID : </p>
                <p>{ state._id }</p>
            </div>

            <div className="field">
                <p className="bold">Order Date/Time: </p>
                <p>{ dateFormatter( state.orderedAt ) }</p>
            </div>

            <div className="field">
                <p className="bold">Price : </p>
                <p>{ formatPrice( state.total / state.rateToCurr, state.userCurrency ) }</p>
            </div>


            <div className="field">
                <p className="bold">Discount : </p>
                <p>{ formatPrice( state.discount / state.rateToCurr, state.userCurrency ) }</p>
            </div>

            <div className="field">
                <p className="bold">Amount Due : </p>
                <p>{ formatPrice( state.amountDue / state.rateToCurr, state.userCurrency ) }</p>
            </div>

            <table className="table">
                <thead>
                    <tr className="thead">
                        <th role="columnheader">Name</th>
                        <th role="columnheader">Quantity</th>
                        <th role="columnheader">Price</th>
                        <th role="columnheader">Total</th>
                    </tr>
                </thead>


                <tbody>
                    {
                        state.items.map( ( p, i ) => <tr className="item" key={ i } >
                            <td data-title="Name : " > <span>{ p.name }</span> </td>
                            <td data-title="Quantity : " > <span>{ p.quantity }</span> </td>
                            <td data-title="Price : " > <span>{ formatPrice( p.price / state.rateToCurr, state.userCurrency ) }</span> </td>
                            <td data-title="Total : " > <span>{ formatPrice( p.price * p.quantity / state.rateToCurr, state.userCurrency ) }</span> </td>

                        </tr> )
                    }
                </tbody>
            </table>

        </OrderDesc>
    );
}

export default OrderDetails;
