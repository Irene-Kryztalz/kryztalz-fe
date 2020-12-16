import React from 'react';
import classes from "./GemCard.module.css";
import Button from "../Button";

function GemCard ( props )
{
    const { name, price, image, type, _id, setActiveGem, cutType, goTo } = props;
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

                        color="var(--gold)"
                        bg="#000"
                        pad="5px"
                        fs="0.9rem"
                        onClick={ ( e ) => { e.stopPropagation(); goTo( _id ); } }
                        to={ `/edit-gem/${ _id }` }>
                        <i className="far fa-edit"></i>
                      &nbsp;  Edit
                    </Button>

                    <Button
                        color="#fff"
                        bg="var(--err-red)"
                        pad="5px"
                        fs="0.9rem"
                        onClick={ ( e ) => { e.stopPropagation(); setActiveGem( e, { image, _id, name, price, type } ); } }>
                        <i className="far fa-trash-alt"></i>
                      &nbsp;   Delete
                    </Button>

                </div>



            </section >

        </article >
    );
}

export default GemCard;
