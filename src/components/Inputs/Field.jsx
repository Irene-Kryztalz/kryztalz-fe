import React from 'react';
import PropTypes from 'prop-types';
import TextLike from "./TextLike";

function Field ( props )
{
    console.log( props );

    switch ( props.control.toLowerCase() )
    {
        case "email":
        case "password":
            return <TextLike control={ props.control.toLowerCase() } { ...props } />;

        default:
            return <TextLike { ...props } />;
    }
}

Field.defaultProps =
{
    control: "text"
};


Field.propTypes =
{
    control: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
    valid: PropTypes.bool,
    required: PropTypes.bool,
    validators: PropTypes.arrayOf( PropTypes.func ),
    options: PropTypes.arrayOf( PropTypes.string ),
    classNamesInput: PropTypes.string,
    classNamesLabel: PropTypes.string,
    classNamesGroup: PropTypes.string

};


export default Field;
