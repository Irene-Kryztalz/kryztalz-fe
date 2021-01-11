import React, { useState } from 'react';
import styled from "styled-components";

const DropDown = styled.div`
    background-color: var(--nav-bg);
    text-align: center;
    border: 1px solid var(--gold);
    border-radius: 5px;
    position:relative;
    color:var(--gold);
    font-size:1.2rem;

    .caret
    {
        padding:10px;
        background:none;
        color:inherit;
        font-size:1.2rem;
        width:100%;
    }

    .list
    {
        width:100%;
        position:absolute;
        max-height: 250px;
        overflow-y: scroll;
        background-color: var(--nav-bg);

        li
        {
            border-bottom: 1px solid var(--gold);
            padding-bottom: 5px;
            margin: 2px 5px 20px;
            word-wrap: break-word;
            text-transform: capitalize;
            cursor: pointer;

        }

        li:first-child
        {
            padding-top:10px;
        }

        .none
        {
            font-size:1.3rem;
        }
    } 

    
    .list::-webkit-scrollbar 
    {
    width: 8px;
    }

    .list::-webkit-scrollbar-track 
    {
    background: transparent;
    }

    .list::-webkit-scrollbar-thumb 
    {
    background: var(--gold);
    border-radius: 3px;
    }

    input
    {
        width:100%;
        padding:5px;
        border:none;
        font-size:1.2rem
    }

`;


function SearchDropDown ( { collection, placeholder, changeHandler, isCut } ) 
{
    const [ term, setTerm ] = useState( "" );
    const [ open, setOpen ] = useState( false );

    const onChange = e =>
    {
        e.preventDefault();
        setTerm( e.target.value );
        if ( e.target.value.trim() )
        {
            setOpen( true );
        }
        else
        {
            setOpen( false );
        }
    };

    const clickHandler = ( ev ) =>
    {
        const value = ev.target.dataset.value;
        setTerm( value );
        setOpen( false );
        changeHandler( value, isCut );
    };

    const toggle = () => setOpen( !open );

    const filtered = collection.filter( item => item.toLowerCase().includes( term.toLowerCase() ) );

    return (
        <DropDown>
            <input placeholder={ placeholder } value={ term } onChange={ onChange } type="text" />


            <button onClick={ toggle } className="caret">
                <i className="fas fa-caret-down" aria-hidden="true"></i>

            </button>
            <ul className="list">

                {
                    open &&
                    (
                        filtered.length
                            ?
                            filtered.map( item =>  
                            {
                                return (
                                    <li onClick={ clickHandler } data-value={ item } key={ item }>
                                        {item }
                                    </li>
                                );
                            } )
                            :
                            <li className="none" >No items found</li>

                    )

                }
            </ul>
        </DropDown>
    );
}

export default SearchDropDown;
