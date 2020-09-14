import React from 'react';
import PropTypes from 'prop-types';
import TextLike from "./TextLike";

function Field ( { as, ...props } )
{

    switch ( as.toLowerCase() )
    {
        case "text":
            return <TextLike { ...props } />;

        default:
            break;
    }
}


Field.propTypes =
{
    as: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOf( [ PropTypes.string, PropTypes.number ] ),
    valid: PropTypes.bool,
    validators: PropTypes.arrayOf( PropTypes.func ),
    options: PropTypes.arrayOf( PropTypes.string ),
    classNamesInput: PropTypes.string,
    classNamesLabel: PropTypes.string,
    classNamesGroup: PropTypes.string

};


export default Field;
