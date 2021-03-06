import React, { useState } from 'react';
import { InputError } from "../Errors/Errors";

function TextLike ( props ) 
{
    const initialState = props.control;
    const [ showPassword, setShowPassword ] = useState( false );

    const changePtype = ( showP ) =>
    {
        if ( initialState === "password" )
        {
            if ( showP )
            {
                return "text";
            }
            else
            {
                return "password";
            }
        }
    };

    const toggleP = () => setShowPassword( !showPassword );


    return (
        <>
            <div className={ props.classNamesGroup }>
                <label className={ props.classNamesLabel } htmlFor={ props.name }>{ props.label }</label>
                <input
                    onChange={ props.changeHandler }
                    autoFocus={ props.shouldAutoFocus }
                    onKeyPress={ props.keypress }
                    className={ props.classNamesInput }
                    inputMode={ props.control }
                    placeholder={ props.placeholder }
                    data-ispassword={ initialState === "password" ? "password" : null }
                    type={ props.control === "password" ? changePtype( showPassword ) : props.control }
                    value={ props.value }
                    id={ props.name }
                    name={ props.name }
                />
                {
                    initialState === "password" ?
                        <span onClick={ toggleP } >

                            {
                                !showPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>
                            }


                        </span> : null
                }

            </div>


            { props.touched && !props.valid && <InputError message={ props.message } /> }
        </>
    );
}


export default TextLike;
