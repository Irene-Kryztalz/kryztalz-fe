import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import icon404 from "../assets/images/404.svg";
import Button from "../components/Button";

const NotFound = styled.div`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
    min-height:80%;
    width: 90vw;
    max-width:500px;
    margin:40px auto;
    background:var(--form-bg);
    padding:20px;
    border-radius:10px;
    text-align:center;

    .icon
    {
        max-width: 300px;
        margin:auto
    }

    p
    {
        font-family: 'Revalia', cursive;
        font-size:1.5rem;
        color:var(--gold);
    }
`;

function Page404 ()
{
    return (
        <NotFound>

            <div className="icon">
                <img src={ icon404 } alt="not found icon" />
            </div>

            <p>
                Oops, could not find this page.
                <br />
                <br />

                <Button capitalize="initial" pad="5px" as={ Link } to="/products">
                    <i className="fas fa-long-arrow-alt-left fa-lg"></i> &nbsp; Continue shopping.
                </Button>

            </p>

        </NotFound>
    );
}

export default Page404;
