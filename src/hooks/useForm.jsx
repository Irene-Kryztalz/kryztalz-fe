// @ts-nocheck
import { useReducer } from 'react';
import { flattenFormFields } from "../utils/flattenFormFields";

const configureInitState = ( fieldConfig ) =>
{
    const state = {};
    for ( const f in fieldConfig ) 
    {
        state[ f ] =
        {
            control: fieldConfig[ f ].control,
            label: fieldConfig[ f ].label,
            placeholder: fieldConfig[ f ].placeholder,
            value: "",
            required: fieldConfig[ f ].required || true,
            valid: false,
            validators: fieldConfig[ f ].validators
        };
    };

    //so that i can apply some array methods to objects
    state[ Symbol.iterator ] = function ()
    {
        let keys = Object.keys( this );
        let count = 0;
        let isDone = false;

        let next = () =>
        {
            if ( count >= keys.length ) { isDone = true; }

            const flatten = flattenFormFields( state[ keys[ count ] ], keys[ count ] );
            count += 1;
            return (
                {
                    done: isDone,
                    value: flatten
                }
            );
        };

        return { next };
    };

    return state;
};

const reducer = ( state, action ) =>
{
    let formState = { ...state };
    switch ( action.type ) 
    {
        case "change":

            return formState;

        case "submit":
            formState = configureInitState( action.payload );
            return formState;

        default:
            return state;
    }

};

function useForm ( config, endpoint ) 
{
    const [ formState, dispatch ] = useReducer( reducer, configureInitState( config ) );

    const handleSubmit = evt => 
    {

        evt.preventDefault();
        dispatch( { type: "submit", payload: config } );
    };

    const changeHandler = evt => 
    {
        const value = evt.target.value;
        dispatch( { type: "change", payload: value } );
    };

    return [ formState, handleSubmit, changeHandler ];
}

export default useForm;
