// @ts-nocheck
import styled from 'styled-components';

const Button = styled.button`
    color:${ props => props.color || "#000" };
    background:${ props => props.bg || "var(--gold)" }; 
    padding:${ props => props.pad || "10px" };
    font-size:${ props => props.fS || "1.2rem" };
    transform: scale(1);
    transition:transform 0.1s ease-in-out;
    text-transform:${ props => props.case || "capitalize" };
    border-radius:${ props => props.radius || "2px" };

    &:hover 
    {
        transform: scale(1.05);    
    }

`;

export default Button;
