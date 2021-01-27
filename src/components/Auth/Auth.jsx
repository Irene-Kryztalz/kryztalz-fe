// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Field from "../Inputs/Field";
import Button from "../Button";
import { joinClasses } from "../../utils/joinClasses";
import classes from "./Auth.module.css";
import logo from "../../assets/images/logo-small.svg";

import { PageError } from "../Errors/Errors";

function Auth ( { fields, ...props } ) 
{

    return (
        <div className={ classes.FormWrap }>


            {
                props.error && <PageError message={ props.error } />
            }

            <form onSubmit={ props.handleSubmit } method="post">
                <Button to={ `/${ props.to }` } as={ Link } className={ classes.SwitchForm }>
                    { props.to.replace( "-", " " ) }
                </Button>
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

                <br />

                <Button
                    className={ joinClasses( classes.Submit, ( !props.valid ? classes.Disabled : null ) ) }
                    pad="10px 40px"
                    type="submit"
                    radius="6px"
                >
                    { props.submitText }
                </Button>

            </form>



        </div>

    );
}

Auth.propTypes =
{
    fields: PropTypes.array,
    changeHandler: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitText: PropTypes.string
};

export default Auth;
