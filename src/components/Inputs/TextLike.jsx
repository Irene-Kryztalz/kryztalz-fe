import React from 'react';

function TextLike ( props ) 
{
    return (
        <div className={ props.classNamesGroup }>
            <label className={ props.classNamesLabel } htmlFor={ props.name }>{ props.label }</label>
            <input
                autoFocus={ props.shouldAutoFocus }
                className={ props.classNamesInput }
                inputMode={ props.control }
                placeholder={ props.placeholder }
                type={ props.control }
                value={ props.value }
                id={ props.name }
                name={ props.name } />
        </div>
    );
}


export default TextLike;
