// @ts-nocheck
import { useReducer } from 'react';
import { flattenFormFields } from "../utils/flattenFormFields";

const configureInitState = ( fieldConfig ) =>
{
    const formState =
    {
        valid: false,
        isSubmitting: false,
        state: {}
    };
    const { state } = formState;

    for ( const f in fieldConfig ) 
    {
        state[ f ] =
        {
            control: fieldConfig[ f ].control,
            label: fieldConfig[ f ].label,
            placeholder: fieldConfig[ f ].placeholder,
            value: "",
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

    return formState;
};

const checkFormCanSubmit = ( formFieldStates ) =>
{
    let canSubmit = true;
    for ( const field of formFieldStates ) 
    {
        canSubmit = canSubmit && field.valid;
    }
    return canSubmit;
};

const reducer = ( state, action ) =>
{
    let formState = { ...state };
    switch ( action.type ) 
    {
        case "change":

            const field = formState.state[ action.payload.name ];
            formState.valid = false;
            field.value = action.payload.value;
            let isValid = true;

            const pwd = formState.state.password ? formState.state.password.value.trim() : null;
            const confirmPwd = formState.state.confirmPassword ? formState.state.confirmPassword.value.trim() : null;

            if ( pwd && confirmPwd )
            {
                isValid = isValid && ( pwd === confirmPwd );
            }

            if ( field.control === "email" )
            {
                field.value = field.value.toLowerCase();
            }

            field.validators.forEach( check => 
            {
                isValid = isValid && check( field.value );
            } );

            field.valid = isValid;

            if ( checkFormCanSubmit( formState.state ) )
            {
                formState.valid = true;
            }

            return formState;

        case "submit":

            formState.valid = false;
            if ( checkFormCanSubmit( formState.state ) )
            {
                formState.valid = true;

                console.log( formState );

                //reset form
                formState = configureInitState( action.payload );
                return formState;
            }
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
        const { value, name } = evt.target;
        dispatch(
            {
                type: "change",
                payload:
                {
                    name,
                    value,
                }
            } );
    };

    return [ formState, handleSubmit, changeHandler ];
}

export default useForm;
