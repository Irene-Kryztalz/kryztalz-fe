import React from 'react';
import PropTypes from 'prop-types';

function TextLike () 
{
    return (
        <div>

        </div>
    );
}

TextLike.defaultProps =
{
    control: "text",
    mode: "text",
    value: "",
    label: "Field label",
    touched: false


};

TextLike.propTypes =
{
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOf( [ PropTypes.string, PropTypes.number ] ),
    valid: PropTypes.bool,
    validators: PropTypes.arrayOf( PropTypes.func ),
    classNamesInput: PropTypes.string,
    classNamesLabel: PropTypes.string,
    classNamesGroup: PropTypes.string


};

export default TextLike;
