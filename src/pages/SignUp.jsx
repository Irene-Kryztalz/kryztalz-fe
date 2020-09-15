import React from 'react';
import useForm from "../hooks/useForm";
import Auth from "../components/Auth/Auth";
import
{
    length,
    required,
    email,
    alphaNumeric
} from "../utils/validators";

const config =
{
    name:
    {
        label: "Name",
        placeholder: "Enter username...",
        validators: [ required ]

    },
    email:
    {
        label: "Email address",
        placeholder: "Enter email...",
        control: "email",
        validators: [ required, email ]

    },
    password:
    {
        label: "Password",
        placeholder: "Enter password...",
        control: "password",
        validators: [ required, length( { min: 8 } ), alphaNumeric ]
    },
    confirmPassword:
    {
        label: "Retype password",
        placeholder: "Re-enter password...",
        control: "password",
        validators: [ required, length( { min: 8 } ), alphaNumeric ]

    },

};

function SignUp ()
{
    const [ formState, handleSubmit, changeHandler ] = useForm( config, "" );



    return (
        <Auth
            to="sign-in"
            submitText="sign up"
            valid={ formState.valid }
            handleSubmit={ handleSubmit }
            changeHandler={ changeHandler }
            fields={ [ ...formState.state ] } />

    );
}

export default SignUp;
