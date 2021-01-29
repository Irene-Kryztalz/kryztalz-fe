import styled from "styled-components";

const Header = styled.h3`
    text-align:center;
    background:var(--form-bg);
    color:var(--gold);
    width:90%;
    max-width:960px;
    margin: ${ props => props.margin ? props.margin : "10px auto" };
    padding: 10px;
    font-size:1.8rem;

`;

export default Header;
