import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

const BackWrapper = styled.div`
    max-width:250px;
    margin: 20px 6%;
`;


export default function Back () 
{
    return (
        <BackWrapper>
            <Button to="/products" as={ Link } >

                <i className="fas fa-long-arrow-alt-left fa-lg"></i> &nbsp;
                <span>Continue shopping</span>
            </Button>
        </BackWrapper>
    );
}
