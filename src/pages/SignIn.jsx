import React, { useContext } from 'react';
//import { useHistory } from "react-router-dom";
import useForm from "../hooks/useForm";
import AppContext from "../Context";
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
    const [ formState, changeHandler ] = useForm( config );
    const { login, sendData } = useContext( AppContext );



    const handleSubmit = async ( ev ) =>
    {
        ev.preventDefault();
        const formData = extractFormData( formState.state );

        const response = await sendData(
            {
                endpoint: "signin",
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
            login( response.data.user.token );
            console.log( response.data.user );
        }



    };


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
