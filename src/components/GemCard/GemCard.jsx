import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import classes from "./GemCard.module.css";
import Button from "../Button";
import Rates from "../Rates";
import AppContext from "../../Context";


function GemCard ( props )
{
    const history = useHistory();
    const { name, price, image, type, _id, cutType } = props;
    const { updateWishlist, updateCart, isAuth } = useContext( AppContext );


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

    return (
        <article className={ classes.Card }>

            <div className={ classes.ImgWrap }>
                <img src={ image } alt={ `Gem photogragh of ${ name }` } />
            </div>

            <section className={ classes.InfoActions }>

                <div className={ classes.Info }>
                    <h3 className={ classes.Title }>{ name }</h3>
                    <p className={ classes.Price }>
                        { <Rates price={ price } /> } per { cutType === "none" ? "gram" : "carat" }
                    </p>
                    <p className={ classes.Type }>{ type }</p>
                </div>

                <div className={ classes.Actions }>


                    <Button
                        font="1rem"
                        border="1px solid #000"
                        margin="0 0 5px 0"
                        pad="5px"
                        onClick={ () => addToCart( { name, price, image, type, _id, cutType } ) }>
                        <i className="far fa-edit"></i>
                      &nbsp;  Add to cart
                    </Button>


                    <Button
                        bg="#000"
                        color="var(--gold)"
                        pad="5px"
                        font="1rem"
                        onClick={ () => addToWishlist( { name, price, image, type, _id, cutType } ) }>
                        <i className="far fa-trash-alt"></i>
                      &nbsp;   Add to wishlist
                    </Button>




                </div>

                <Button
                    font="1rem"
                    margin="0 0 5px 0"
                    bg="var(--bg)"
                    color="var(--gold)"
                    as={ Link }
                    radius="5px"
                    to={ `/products/${ _id }` } >
                    Read more...
                 </Button>

            </section >

        </article >
    );
}

export default GemCard;
