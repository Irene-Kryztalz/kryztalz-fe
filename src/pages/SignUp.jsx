import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import AppContext from "../Context";
import useForm from "../hooks/useForm";
import Auth from "../components/Auth/Auth";

import { extractFormData } from "../utils/extractFormData";
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
        message: "Please type in a name",
        validators: [ required ]

    },
    email:
    {
        label: "Email address",
        placeholder: "Enter email...",
        message: "Please type in a valid email",
        control: "email",
        validators: [ required, email ]

    },
    password:
    {
        label: "Password",
        placeholder: "Enter password...",
        control: "password",
        message: "Password must be at least 8 characters long. Only letters and numbers allowed.",
        validators: [ required, length( { min: 8 } ), alphaNumeric ]
    },
    confirmPassword:
    {
        label: "Retype password",
        placeholder: "Re-enter password...",
        control: "password",
        message: "Passwords must be match.",
        validators: [ required, length( { min: 8 } ), alphaNumeric ]

    },

};

function SignUp ()
{
    const [ formState, changeHandler ] = useForm( config );
    const { sendData } = useContext( AppContext );
    const history = useHistory();

    const handleSubmit = async ev =>
    {
        ev.preventDefault();
        const formData = extractFormData( formState.state );

        const response = await sendData(
            {
                endpoint: "user/signup",
                formData: JSON.stringify( formData ),
                method: "post",
                headers:
                {
                    "Content-Type": "application/json"
                }
            } );


        if ( response.error )
        {
            console.log( response );

        }
        else
        {
            const now = new Date().getTime();

            const oneHr = 60 * 60 * 1000;

            localStorage.setItem( "mail", now + oneHr );
            history.push( {
                pathname: '/after-reg',
                search: `?name=${ formData.name }&email=${ formData.email }`
            } );
        }
    };

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
