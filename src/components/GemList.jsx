import React from 'react';
import styled from "styled-components";
import GemCard from "./GemCard/GemCard";

const List = styled.section`
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:center;
    padding: 20px 0;
    max-width:1500px;
    margin:auto;

    article
    {
        margin: 10px;
    }
`;


function GemList ( { items } ) 
{
    return (
        <List>
            {
                items.map( g => <GemCard
                    { ...g }
                    key={ g._id }
                    image={ g.imageUrls[ 0 ] }
                    imageUrls={ g.imageUrls }


                /> )
            }
        </List>
    );
}

export default GemList;
