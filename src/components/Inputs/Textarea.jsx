import React from 'react';
import { joinClasses } from "../../utils/joinClasses";
import { InputError } from "../Errors/Errors";

function Textarea ( props )
{
    return (
        <div className={ joinClasses( props.classNamesGroup, props.ExtraGroupClass ) }>
            <label className={ props.classNamesLabel } htmlFor={ props.name }>{ props.label }</label>

            <textarea
                className={ props.classNamesInput }
                onChange={ props.changeHandler }
                value={ props.value }
                name={ props.name }
                id={ props.name }
                rows="5"></textarea>

            {props.touched && !props.valid && <InputError message={ props.message } /> }

        </div>
    );
}

export default Textarea;
