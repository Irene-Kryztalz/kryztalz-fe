import React, { useState } from 'react';
import styled from "styled-components";

const Images = styled.section`
    display: flex;
    justify-content:space-between;
    align-items:center;
    flex-direction:column;    

    img
    {
        object-fit:cover;
    }

    @media screen and (min-width:768px)
    {
        margin:auto;
        width:60%;
        flex-direction:row;
    }

    .big
    {
        width:100%;
        height:300px;
        max-width:400px;
        margin: auto auto 10px;
        overflow:hidden;
        border-radius:5px;
            
        @media screen and (min-width:768px)
        {
            height:400px;
            margin:auto;
        }

    }

    .list
    {
        display:flex;

        .item
        {
            border:none;
            background:none;
            width:54px;
            height:54px;
            overflow:hidden;
        }

        .item.active
        {
            border: 2px solid var(--gold);
        }

        @media screen and (min-width:768px)
        {
            flex-direction:column;
            justify-content:space-between;
            align-items:center;
            margin-left: 10px;

            .item
            {
                width:100px;
                height:100px;
                margin-bottom:10px;
            }
        }
    }
`;


function ProductImages ( { images } )
{
    const [ active, setActive ] = useState( images[ 0 ] );

    const change = ( e ) =>
    {
        const index = +e.target.dataset.index;

        setActive( images[ index ] );

    };

    return (
        <Images>

            <div className="big">
                <img src={ active } alt="gem" />
            </div>

            <div className="list">
                {
                    images.map( ( gem, i ) => (
                        <button
                            onClick={ change }
                            className={ `item ${ gem === active ? "active" : "" }` } key={ i }>
                            <img data-index={ i } src={ gem } alt="gem" />
                        </button>
                    ) )
                }
            </div>

        </Images>
    );
}

export default ProductImages;
