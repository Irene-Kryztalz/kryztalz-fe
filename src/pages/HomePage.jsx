import React from 'react';
import styled from "styled-components";
import Hero from "../components/Hero";
import Title from "../components/Title";
import PadContent from "../components/PadContent";
import Carousel from "../components/Carousel";

import Logo from "../assets/images/logo-small.svg";

const Container = styled.div`
    padding-top:20px;

    .logo
    {
        width:50%;
        max-width:300px;
        margin:50px auto 20px;
    }

    .content
    {
        
        color:#fff;
        font-family: 'Crimson Pro', serif;
        font-size:1.3rem;
        line-height:1.5;
        margin-bottom:10px;

        .firstcharacter 
        {
            color: var(--gold);
            float: left;
            font-size: 3.5em;
            line-height: 60px;
            padding-top: 4px;
            padding-right: 8px;
            padding-left: 3px;
        }
    } 
   
   

`
    ;


function HomePage ()
{
    return (
        <>
            <Hero />

            <PadContent>
                <Title content="Popular gems" />
                <Carousel />
                <Title content="about us" />
                <Container>


                    <p className="content">
                        <span className="firstcharacter">L</span>orem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium corporis impedit, laborum, maxime quam, rem obcaecati quas hic minus magnam laudantium. Accusamus labore et tenetur dolores quis temporibus excepturi ad dolore, doloremque officia natus, cum adipisci, esse nobis quo atque.

                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit veritatis, sed deserunt maiores atque reiciendis consectetur eaque quaerat. Impedit, atque?
                    </p>

                    <p className="content">
                        Accusamus labore et tenetur dolores quis temporibus excepturi ad dolore, doloremque officia natus, cum adipisci, esse nobis quo atque.

                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit veritatis, sed deserunt maiores atque reiciendis consectetur eaque quaerat. Impedit, atque?
                    </p>

                    <p className="content">
                        Accusamus labore et tenetur dolores quis temporibus exceptur. Impedit veritatis, sed deserunt maiores atque reiciendis consectetur eaque quaerat. Tu ad dolore, doloremque officia natus, cum adipisci, esse nobis quo atque.

                        Lorem ipsum dolor sit amet consectetur adipisicing elit,Accusamus labore et tenetur dolores quis temporibus excepturi ad dolore, doloremque officia natus, cum adipisci, esse nobis quo atque.. Impedit veritatis, sed deserunt maiores atque reiciendis consectetur eaque quaerat. Impedit, atque?
                    </p>

                    <p className="content">
                        Evorem consectetur adipisicing elit. Perferendis corrupti aliquam necessitatibus placeat pariatur soluta tempora beatae, quo nihil consequatur, eius corporis aliquid libero eveniet recusandae quas, accusamus veniam rem?
                    </p>

                    <p className="content">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum sunt recusandae excepturi reiciendis repudiandae facilis! Maxime numquam doloribus aliquid quis nam voluptatibus fugiat tempora, ratione rem quae, officia ipsum ab vel dolorum earum, at inventore aperiam incidunt fuga enim dolore! Error est dolore eligendi consectetur saepe sapiente temporibus, deleniti aliquam dicta nostrum sequi. Cupiditate tempora cumque veritatis commodi hic vero?
                    </p>

                    <div className="logo">
                        <img src={ Logo } alt="Kryztalz logo" />
                    </div>
                </Container>
            </PadContent>

        </>
    );
}

export default HomePage;
