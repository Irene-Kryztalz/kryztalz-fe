// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import Field from "../Inputs/Field";
import Button from "../Button";
import { joinClasses } from "../../utils/joinClasses";
import classes from "./Auth.module.css";
import logo from "../../assets/images/logo-large.svg";


function Auth ( { fields, ...props } ) 
{

    return (
        <div className={ classes.FormWrap }>
            <form method="post">
                <div className={ classes.Logo }>
                    <img src={ logo } alt="Kryztalz logo" />
                </div>

                {
                    fields.map( ( field, i ) => (
                        <Field
                            key={ field.fieldName }
                            changeHandler={ props.changeHandler }
                            shouldAutoFocus={ i === 0 }
                            classNamesGroup={ classes.Group }
                            classNamesInput={ joinClasses( classes.Input ) }
                            classNamesLabel={ classes.Label }
                            name={ field.fieldName }
                            { ...field }
                        />
                    ) )
                }


                <Button
                    className={ joinClasses( classes.Submit, ( !props.valid ? classes.Disabled : null ) ) }
                    onClick={ props.handleSubmit }
                    pad="10px 40px"
                    type="submit"
                    radius="6px"
                >
                    sign up
                </Button>

            </form>
        </div>

    );
}

Auth.propTypes =
{
    fields: PropTypes.array,
    changeHandler: PropTypes.func,
    handleSubmit: PropTypes.func
};

export default Auth;
