import React from 'react';
import Button from "../Button";

import classes from "./LoadMore.module.css";

function LoadMore ( { loading, click } )
{
    return (
        <div className={ classes.LoadWrap }>
            {
                !loading ? <Button onClick={ click }> Load More </Button> : <div className={ classes.loader }>
                </div>
            }
        </div>


    );
}

export default LoadMore;
