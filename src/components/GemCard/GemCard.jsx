import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import classes from "./GemCard.module.css";
import Button from "../Button";
import Rates from "../Rates";
import AppContext from "../../Context";


function GemCard ( props )
{
    const { name, price, image, type, _id, cutType } = props;
    const { updateWishlist, updateCart, isAuth, activeCurr, currencies } = useContext( AppContext );

    const symbol = currencies[ activeCurr ].currencySymbol;

    const addToWishlist = ( gem ) =>
    {
        updateWishlist( gem );
    };

    const addToCart = ( gem ) =>
    {
        updateCart( gem, 1 );
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
                        { symbol } { <Rates price={ price } /> } per { cutType === "none" ? "gram" : "carat" }
                    </p>
                    <p className={ classes.Type }>{ type }</p>
                </div>

                <div className={ classes.Actions }>

                    {
                        isAuth
                            ?
                            <Button
                                font="1rem"
                                border="1px solid #000"
                                margin="0 0 5px 0"
                                pad="5px"
                                onClick={ () => addToCart( { name, price, image, type, _id, cutType } ) }>
                                <i className="far fa-edit"></i>
                      &nbsp;  Add to cart
                    </Button>
                            :
                            <Button
                                font="1rem"
                                border="1px solid #000"
                                margin="0 0 5px 0"
                                pad="5px"
                                as={ Link }
                                to={ `/sign-in` }>
                                <i className="far fa-edit"></i>
                      &nbsp;  Add to cart
                    </Button>
                    }


                    {
                        isAuth
                            ?
                            <Button
                                bg="#000"
                                color="var(--gold)"
                                pad="5px"
                                font="1rem"
                                onClick={ () => addToWishlist( { name, price, image, type, _id, cutType } ) }>
                                <i className="far fa-trash-alt"></i>
                      &nbsp;   Add to wishlist
                    </Button>
                            :
                            <Button
                                bg="#000"
                                color="var(--gold)"
                                pad="5px"
                                font="1rem"
                                as={ Link }
                                to={ `/sign-in` }
                            >
                                <i className="far fa-trash-alt"></i>
                      &nbsp;   Add to wishlist
                    </Button>
                    }



                </div>

                <Button
                    font="1rem"
                    margin="0 0 5px 0"
                    bg="var(--bg)"
                    color="var(--gold)"
                    as={ Link }
                    radius="5px"
                    to={ `/product/${ _id }` } >
                    Read more...
                 </Button>

            </section >

        </article >
    );
}

export default GemCard;
