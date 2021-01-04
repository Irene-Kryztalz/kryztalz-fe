// @ts-nocheck
import styled from 'styled-components';

const Button = styled.button.attrs( props => (
    {
        type: props.type || "button"
    }
) )`
    color:${ props => props.color || "#000" };
    background:${ props => props.bg || "var(--gold)" }; 
    padding:${ props => props.pad || "10px" };
    font-size:${ props => props.font || "1.2rem" };
    transform: scale(1);
    margin:  ${ props => props.margin || "0" };
    transition:transform 0.1s ease-in-out;
    text-transform:${ props => props.case || "capitalize" };
    border-radius:${ props => props.radius || "2px" };
    border:${ props => props.border || "none" };
    font-family:  'Crimson Pro', serif;

    &:hover 
    {
        transform: scale(1.05);    
    }

    &[disabled]
    {
        transform:none;
        cursor: not-allowed;
        opacity:0.5
    }

`;

export default Button;
