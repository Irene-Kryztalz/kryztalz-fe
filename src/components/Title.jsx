import React from 'react';
import styled from 'styled-components';

const StyledP = styled.p`
    color:var(--gold);
    padding-bottom:5px;
    padding-right:20px;
    border-bottom:2px solid var(--purple);
    text-transform:capitalize;
    display:inline-block;
    font-size:1.8rem;
    font-family: 'Crimson Pro', serif;

`;


function Title ( { content, className } )
{
    return (
        <StyledP className={ className } >
            {content }
        </StyledP>
    );
}

export default Title;
