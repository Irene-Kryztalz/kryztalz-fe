import styled from 'styled-components';

const Overlay = styled.div`
   position:fixed;
   top:0;
   left:0;
   z-index:calc( 3 * var(--z) );
   width:100vw;
   min-height:100%;
   background-color: var(--purple-transparent)

`;

export default Overlay;
