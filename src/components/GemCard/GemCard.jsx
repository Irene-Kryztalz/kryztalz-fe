import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import classes from "./GemCard.module.css";
import Button from "../Button";
import AppContext from "../../Context";


function GemCard ( props )
{
    const { name, price, image, type, _id, cutType } = props;
    const { updateWishlist, updateCart } = useContext( AppContext );

    const addToWishlist = ( id ) =>
    {
        updateWishlist( id, 1 );
    };

    const addToCart = ( id ) =>
    {
        updateCart( id, 1 );
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
                        ₦ { price } per { cutType === "none" ? "gram" : "carat" }
                    </p>
                    <p className={ classes.Type }>{ type }</p>
                </div>

                <div className={ classes.Actions }>
                    <Button
                        font="1rem"
                        margin="0 0 5px 0"
                        color="var(--gold)"
                        bg="#000"
                        pad="5px"
                        onClick={ () => addToCart( _id ) }
                        to={ `/edit-gem/${ _id }` }>
                        <i className="far fa-edit"></i>
                      &nbsp;  Add to cart
                    </Button>

                    <Button
                        color="#fff"
                        bg="var(--err-red)"
                        pad="5px"
                        font="1rem"
                        onClick={ () => addToWishlist( _id ) }>
                        <i className="far fa-trash-alt"></i>
                      &nbsp;   Add to wishlist
                    </Button>

                </div>

                <Button
                    font="1rem"
                    margin="0 0 5px 0"
                    bg="#ccc"
                    as={ Link }
                    to={ `/product/${ _id }` } >
                    Read more...
                 </Button>

            </section >

        </article >
    );
}

export default GemCard;
