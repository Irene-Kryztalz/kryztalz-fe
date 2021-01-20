import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import AppContext from "../Context";
import LoadMore from "../components/LoadMore/LoadMore";
import RetryError from "../components/RetryError";
import Rates from "../components/Rates";
import { dateFormatter } from "../utils/formatDate";

const OrdersPage = styled.div`
   width:90vw;
   max-width:1200px;
   margin: 60px auto ;
 
   .list
   {
       display:grid;
       grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
       gap:15px;
       font-size:1rem;

       .order
       {
           font-family: 'Crimson Pro', serif !important ;
           background:var(--gold);
           padding:10px;

           .header
           {
                font-weight: bold;
                font-size: 1.52em;
                margin: 10px 0;
                padding-bottom: 9px;
                border-bottom: 2px solid var(--blue);
           }

           .content
           {
                background: var(--bg);
                padding: 10px;
                display: inline-block;
                color: var(--gold);
                border-radius: 5px;
                letter-spacing:1px
           }

           .actions
           {
               display:flex;
               justify-content:space-between;
               align-items:center;
               margin:30px 0 10px;

               button,a
               {
                   background:none;
                   font-size:inherit;
                   padding:5px;
                   text-decoration:none;
                   color:#000;
                   font-size: 1.3em ;
                   font-family:inherit;
                   background:var(--purple-transparent);
                   color:var(--bg);
               }

               a
               {
                   background:var(--blue);
                   color:#fff;
                   text-align:center;
               }
           }

       }
   }

`;

function Orders ()
{
    const { orders, updateOrders, sendData } = useContext( AppContext );

    useEffect( () => 
    {

        if ( !orders.length )
        {
            const getOrders = async () =>
            {
                const { data, error } = await sendData(
                    {
                        endpoint: "orders"
                    } );

                if ( error )
                {
                    console.log( error );
                }
                else
                {
                    console.log( data );
                    updateOrders( data );
                }
            };
            getOrders();

        }
    }, [ orders, sendData, updateOrders ] );

    const getPDF = async ( id ) =>
    {
        const { data, error } = await sendData(
            {
                endpoint: `orders/invoice/${ id }`,
                isBlob: true
            }
        );

        if ( !error )
        {
            const file = new Blob( [ data ], { type: 'application/pdf' } );

            const url = URL.createObjectURL( file );
            const a = document.createElement( 'a' );

            a.href = url;
            a.download = `${ id }-invoice.pdf`;

            const clickHandler = () =>
            {
                setTimeout( () =>
                {
                    URL.revokeObjectURL( url );
                    a.removeEventListener( 'click', clickHandler );
                }, 150 );
            };

            a.addEventListener( 'click', clickHandler, false );
            a.click();

        }
    };

    return (
        <OrdersPage>
            <h2>My orders</h2>

            <section className="list">
                {
                    orders.map( order => (
                        <article key={ order._id } className="order" >

                            <h2 className="header">

                                Order ID
                            </h2>

                            <p className="content">

                                { order._id }
                            </p>

                            <h2 className="header">

                                Total number of items
                            </h2>

                            <p className="content">

                                { order.items.length }
                            </p>


                            <h2 className="header">

                                Amount paid
                            </h2>

                            <p className="content">

                                <Rates price={ order.amountDue } />

                            </p>

                            <h2 className="header">

                                Ordered at
                            </h2>

                            <p className="content">

                                { dateFormatter( order.orderedAt ) }

                            </p>

                            <div className="actions">
                                <Link to={ `/order/${ order._id }` } >View Details</Link>
                                <button onClick={ () => getPDF( order._id ) } >Download Invoice</button>
                            </div>
                        </article>
                    ) )
                }
            </section>

        </OrdersPage>
    );
}

export default Orders;
