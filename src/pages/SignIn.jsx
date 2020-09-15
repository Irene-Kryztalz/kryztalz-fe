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
    email:
    {
        label: "Email address",
        placeholder: "Input email...",
        control: "email",
        validators: [ required, email ]

    },
    password:
    {
        label: "Password",
        placeholder: "Enter password...",
        control: "password",
        validators: [ required, length( { min: 8 } ), alphaNumeric ]
    }

};

function SignIn () 
{
    const [ formState, handleSubmit, changeHandler ] = useForm( config, "" );



    return (
        <Auth
            to="sign-up"
            submitText="sign in"
            valid={ formState.valid }
            handleSubmit={ handleSubmit }
            changeHandler={ changeHandler }
            fields={ [ ...formState.state ] } />

    );
}
export default SignIn;
