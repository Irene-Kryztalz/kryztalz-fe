import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Button from "./Button";

import bg from "../assets/images/hero-gems.jpg";

const StyledHero = styled.div`
    height:60vh;
    min-height:200px;
    background: linear-gradient( 
            rgba(109, 106, 106, 0.4),
            rgba(109, 106, 106, 0.4)),
            url(${ bg });
    background-size:cover;
    background-position:center;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;

    .title
    {
        color: var(--gold);
        font-family: 'Revalia', cursive;
        font-size:3rem;

        @media screen and (min-width:768px)
        {
            font-size:3.5rem;
        }
    }

    .motto
    {
        color: var(--gold);
        background: rgba(0, 0, 0, 0.53);
        font-size:1.3rem;
        border: 1px solid var(--gold);
        padding:5px 10px;
        margin: 20px;
        font-family: 'Dancing Script', cursive;
        letter-spacing:2px;

    }

    a
    {
        text-transform:uppercase;
        font-family: 'Croissant One', cursive;
        margin-top:20px;
    }

`
    ;

function Hero ()
{
    return (
        <StyledHero>

            <h1 className="title" >Kryztalz</h1>

            <p className="motto">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

            <Button as={ Link } to="/products"  >
                Start shopping
            </Button>

        </StyledHero>
    );
}

export default Hero;
