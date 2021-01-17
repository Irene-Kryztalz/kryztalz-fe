import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
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
        message: "Please type in a valid email",
        validators: [ required, email ]

    },
    password:
    {
        label: "Password",
        placeholder: "Enter password...",
        control: "password",
        message: "Invalid password. Password is case sensitive and must contain at least 8 alphanumeric characters",
        validators: [ required, length( { min: 8 } ), alphaNumeric ]
    }

};

function SignIn () 
{
    const history = useHistory();
    const { pathname } = useLocation();
    const [ error, setError ] = useState( "" );
    const [ formState, changeHandler ] = useForm( config );
    const { login, sendData } = useContext( AppContext );



    const handleSubmit = async ( ev ) =>
    {
        setError( null );
        ev.preventDefault();
        const formData = extractFormData( formState.state );

        const response = await sendData(
            {
                endpoint: "user/signin",
                formData: JSON.stringify( formData ),
                method: "post",
                headers:
                {
                    "Content-Type": "application/json"
                }
            } );

        if ( response.error )
        {
            if ( typeof response.error === "string" )
            {
                setError( response.error );
                return;
            }

            setError( response.error.error );
        }
        else
        {
            const { token, cart, wishlist, expires } = response.data.user;
            login( { token, cart, wishlist, expires } );

            const path = pathname.includes( "sign" ) ? "/products" : pathname;
            //get redirect data, eg use cart or order, defaut is /products
            history.push( path );
        }



    };


    return (
        <Auth
            to="sign-up"
            error={ error }
            submitText="sign in"
            valid={ formState.valid }
            handleSubmit={ handleSubmit }
            changeHandler={ changeHandler }
            fields={ [ ...formState.state ] } />

    );
}
export default SignIn;
