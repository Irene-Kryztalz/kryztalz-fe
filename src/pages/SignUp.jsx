import React from 'react';
import useForm from "../hooks/useForm";
import Auth from "../components/Auth/Auth";

const config =
{
    name:
    {
        label: "Name",
        placeholder: "Enter username...",

    },
    email:
    {
        label: "Email address",
        placeholder: "Enter email...",
        control: "email"

    },
    password:
    {
        label: "Password",
        placeholder: "Enter password...",
        control: "password"

    },
    confirmPassword:
    {
        label: "Retype password",
        placeholder: "Re-enter password...",
        control: "password"

    },

};

function SignUp ()
{
    const [ formState, handleSubmit, changeHandler ] = useForm( config, "" );

    return (
        <Auth fields={ [ ...formState ] } />

    );
}

export default SignUp;
