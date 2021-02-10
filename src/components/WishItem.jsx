import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Rates from "./Rates";
import Button from "./Button";

const Card = styled.article`
    background:var(--gold);
    padding:10px;
    display:grid; 
    gap:10px;
    grid-template-columns: 30% 70%;
    position:relative;
    max-width: 450px;
    
 
    img
    {
        object-fit:cover
    }

    .big
    {
        height:100px;
        margin-bottom:10px
    }

    .images
    {
        display:flex;
        flex-wrap:wrap;
        margin-bottom:40px;

        .mini
        {
            overflow:hidden;
            width:50px;
            height:50px;
            background:none;  
            margin:10px 5px;  
            border-radius:10px;

            &.active
            {
                border: 2px solid var(--purple);
            }
        }
    }


    .name
    {
        font-size:1.5em;
        text-transform:capitalize;
        margin-bottom:10px;
        margin-top:20px;
    }

    .add
    {
        position:absolute;
        right:0;
        font-size:1.15em;
        bottom:0;
         padding:5px 10px;
    }

    .remove
    {
        position:absolute;
        top:0;
        right:0;
        background:var(--purple-transparent);
        padding:5px 10px;

    }


`;

function WishItem ( { gem, addCart, removeWL } ) 
{
    const [ active, setActive ] = useState( 0 );

    const changeImage = index => setActive( index );

    return (
        <Card>
            <div>
                <div className="big">
                    <img src={ gem.imageUrls[ active ] } alt={ `pic of ${ gem.name }` } />
                </div>
                <Button
                    font=".8rem"
                    margin="0 0 5px 0"
                    bg="var(--bg)"
                    color="var(--gold)"
                    as={ Link }
                    radius="2px"
                    to={ `/products/${ gem._id }` } >
                    Read more...
                 </Button>
            </div>


            <div>
                <p className="name" >
                    { gem.name }
                </p>

                <p>
                    <strong>
                        <Rates price={ gem.price } />
                   &nbsp; per { gem.cutType === "none" ? "gram" : "carat" }

                    </strong>
                </p>
                <div className="images">
                    {
                        gem.imageUrls.map( ( img, i ) => (
                            <button
                                onClick={ () => changeImage( i ) }
                                className={ `mini ${ active === i ? "active" : "" }` } key={ i }>
                                <img src={ img } alt={ gem.name } />
                            </button>
                        ) )
                    }


                </div>

                <button className="add" onClick={ addCart } >
                    Add to cart
            </button>
            </div>

            <button className="remove" onClick={ removeWL }>
                Remove
            </button>


        </Card>
    );
}

export default WishItem;
