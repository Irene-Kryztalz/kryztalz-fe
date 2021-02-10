import React, { useContext, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import GemCard from "./GemCard/GemCard";
import AppContext from "../Context";
import Button from "./Button";

const getArrangement = ( activeIndex, length ) =>
{
    let arr = [];
    const middle = parseInt( length / 2 );
    const offset = window.innerWidth >= 500 ? 70 : 15;

    arr[ middle ] =
    {
        index: activeIndex,
        style: "translate3d(0,0,0)"
    };

    let c = 1;

    while ( c <= middle ) 
    {
        const pos = ( c + activeIndex ) % length;
        arr.push( {
            index: pos,
            style: `translate3d(${ c * offset }%,0,${ -c * 100 }px)`
        } );
        c++;
    }

    c = middle;
    let i = 0;

    while ( c > 0 ) 
    {
        const pos = ( length - c + activeIndex ) % length;

        arr[ i ] =
        {
            index: pos,
            style: `translate3d(${ -c * offset }%,0,${ -c * 100 }px)`
        };

        c--;
        i++;
    }

    return arr;
};

const getPos = ( i, arr ) =>
{
    const item = arr.find( a => a.index === ( i ) );
    return item.style;
};

const pulse = keyframes`
        0%,100
        {
            opacity:0.3
        }

        50%
        {
            opacity: 0.8
        }
`;

const Loading = styled.h2`
        width:90vw;
        max-width:200px;
        margin:20px auto;
        background:var(--gold);
        color:#000;
        opacity:0.3;
        text-align:center;
        padding:10px;
        animation: ${ pulse } 800ms infinite;



`;


const Slider = styled.div`
    width: 250px;
    height:${ props => props.height ? "100vh" : "80px" };
    max-height:500px;
    margin: auto;
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
    color:#000;
    font-size:1.2rem;

    @media screen and (min-width:500px)
    {
        min-width:300px;
    }   

    .controls
    {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        position: relative;
        top: 100%;  
        width: 200px;
        margin: auto;
        display:none;
    }

    label
    {
        position: absolute;
        left: 0;
        top:0;
        width:100%;
        height:100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate3d(0,0,0);
        transition: transform 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
    }



`;


const SIZE = 3;

function Carousel ()
{

    const { gems, sendData, loading, setGems } = useContext( AppContext );
    const [ checked, setChecked ] = useState( 0 );
    const [ arr, setArr ] = useState( getArrangement( 0, SIZE ) );
    const [ items, setItems ] = useState( [] );
    const [ clicked, setClicked ] = useState( false );


    const change = e =>
    {
        const { id } = e.target;
        const index = +id;
        setChecked( index );
        const arr = getArrangement( index, SIZE );
        setArr( arr );

    };

    useEffect( () =>
    {
        setItems( gems.slice( 0, SIZE ) );

    }, [ gems ] );

    useEffect( () =>
    {
        const resize = () => 
        {
            setArr( getArrangement( 0, SIZE ) );
        };

        window.addEventListener( "resize", resize );

        return () => window.removeEventListener( "resize", resize );
    }, [] );


    const getGems = async () =>
    {

        const { data } = await sendData(
            {
                endpoint: "shop/gems",
                setLoad: false
            }
        );


        setClicked( false );
        setGems( data );
    };

    const toggleClicked = () =>
    {
        if ( !clicked )
        {
            setClicked( !clicked );
            getGems();
        }
    };



    return (
        <Slider height={ items.length }>

            {
                !gems.length && !loading &&
                <>
                    <br />
                    {
                        !clicked ? <Button onClick={ toggleClicked }>
                            Retry
                </Button>
                            : <Loading>Loading gems, please wait</Loading>
                    }

                </>
            }

            {
                items.map( ( gem, index ) => <label
                    key={ gem._id }
                    htmlFor={ index }
                    style={ { transform: getPos( index, arr ) } }
                >
                    <GemCard
                        _id={ gem._id }
                        name={ gem.name }
                        price={ gem.price }
                        image={ gem.imageUrls[ 0 ] }
                        cutType={ gem.cutType }
                        type={ gem.type } />
                </label> )
            }

            <div className="controls">
                {
                    items.map( ( a, index ) => <input key={ a._id }
                        type="radio"
                        onChange={ change }
                        checked={ ( index ) === checked }
                        value={ index }
                        name={ a._id }
                        id={ index } /> )
                }
            </div>

        </Slider>
    );
}

export default Carousel;
