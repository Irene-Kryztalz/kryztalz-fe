import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import AppContext from "../Context";
import RetryError from "../components/RetryError";
import Rates from "../components/Rates";
import LoadMore from "../components/LoadMore/LoadMore";
import SearchOrder from "../components/SearchOrder";
import { dateFormatter } from "../utils/formatDate";
import { getPDF as pdf } from "../utils/getPDF";

const OrdersPage = styled.div`
   width:90vw;
   max-width:1200px;
   margin: 60px auto ;


   .heading
   {
       color:var(--gold);
       margin-bottom:20px;
       font-size:2.5em;
   }
 
   .list
   {
       display:grid;
       grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
       gap:15px;
       font-size:1rem;
       margin:20px auto;

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
    const { orders, logout, updateOrders, sendData, totalOrders } = useContext( AppContext );
    const [ error, setError ] = useState( orders.length ? null : "Unable to retrive orders." );


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
                    if ( typeof error === "object" )
                    {
                        setError( error.error );
                        return;
                    }

                    setError( error );
                    return;
                }
                else
                {
                    setError( null );
                    updateOrders( data.orders, data.count );
                }
            };
            getOrders();

        }
    }, [ orders, sendData, updateOrders ] );

    const getPDF = async ( id ) =>
    {
        pdf( sendData, `orders/invoice/${ id }`, `${ id }-invoice` );
    };

    const getOrders = async ( isRefresh ) =>
    {
        let url = "orders";

        if ( orders.length && !isRefresh )
        {
            url = `${ url }?lastId=${ orders[ orders.length - 1 ]._id }`;
        }

        const { data, error } = await sendData(
            {
                endpoint: url,
                setLoad: orders.length ? false : true
            } );

        if ( error )
        {
            if ( typeof error === "object" )
            {
                setError( error.error );
                return;
            }

            if ( error.includes( "expire" ) )
            {
                logout();
                return;
            }

            setError( error );
            return;
        }
        else
        {
            setError( null );
            if ( isRefresh )
            {
                updateOrders( data.orders, data.count );
                return;
            }
            updateOrders( [ ...data.orders, ...orders ], data.count );
        }
    };

    return (
        <OrdersPage>
            <h2 className="heading" >My orders</h2>

            <SearchOrder />

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

                                <Rates curr={ order.userCurrency } asIs price={ order.amountDue / order.rateToCurr } />

                            </p>

                            <h2 className="header">

                                Ordered at
                            </h2>

                            <p className="content">

                                { dateFormatter( order.orderedAt ) }

                            </p>

                            <div className="actions">
                                <Link to={ { pathname: `/order/${ order._id }`, state: order } } >View Details</Link>
                                <button onClick={ () => getPDF( order._id ) } >Download Invoice</button>
                            </div>
                        </article>
                    ) )
                }
            </section>

            {  ( totalOrders > orders.length && !error ) &&
                <LoadMore click={ getOrders } /> }

            {

                ( totalOrders && error ) ?
                    <RetryError
                        message={ error }
                        action={ getOrders }
                        btnText="Retry" />
                    : null

            }


            {
                ( !totalOrders && error ) ?
                    <RetryError
                        message={ error }
                        action={ getOrders }
                        btnText="Try again" />
                    : null

            }



        </OrdersPage>
    );
}

export default Orders;
