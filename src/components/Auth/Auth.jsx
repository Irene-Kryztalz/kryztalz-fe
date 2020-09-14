import React from 'react';
import PropTypes from 'prop-types';
import Field from "../Inputs/Field";
import Button from "../Button";
import { joinClasses } from "../../utils/joinClasses";
import classes from "./Auth.module.css";
import logo from "../../assets/images/logo-large.svg";



function Auth ( { fields, ...props } ) 
{
    window.g = fields;

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
                    pad="10px 40px"
                    radius="6px"
                    className={ joinClasses( classes.Submit, classes.Disabled ) }>
                    sign up
                </Button>

            </form>
        </div>

    );
}

Auth.propTypes =
{
    fields: PropTypes.array
};

export default Auth;
