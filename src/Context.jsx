import React, { Component, createContext } from 'react';

const AppContext = createContext( null );

AppContext.displayName = 'AppContext';

class AppProvider extends Component
{
    state =
        {
            cart: [],
            wishlist: [],
            loading: false,
            currencies: {},
            activeCurr: "",
            isAuth: false,
            baseUrl: ""

        };

    componentDidMount ()
    {
        if ( !this.state.currencies[ "NGN" ] )
        {
            fetch( "./currency-country.json" )
                .then( resp => resp.json() )
                .then( curr =>
                {
                    this.setState(
                        {
                            activeCurr: "ngn",
                            currencies: this.formatData( curr )
                        }
                    );
                } );
        }

        if ( !process.env.NODE_ENV || process.env.NODE_ENV === 'development' )
        {
            this.setState( { baseUrl: "http://localhost:3001" } );

        } else
        {

            this.setState( { baseUrl: process.env.REACT_APP_SERVER } );
        }

    }

    changeCurr = ( curr ) =>
    {
        this.setState( { activeCurr: curr } );
    };


    sendData = async ( { endpoint, formData, method = "GET", headers } ) =>
    {
        this.setState( { loading: true } );
        const response = await fetch( `${ this.state.baseUrl }/${ endpoint }`,
            {
                method,
                headers,
                body: formData
            } );

        if ( response.ok )
        {
            this.setState( { loading: false } );
            return { data: await response.json() };
        }
        else
        {
            this.setState( { loading: false } );
            return {
                code: response.status,
                data: await response.json()
            };
        }

    };

    formatData = ( currencies ) =>
    {
        const formatted = {};
        for ( let cur in currencies ) 
        {
            formatted[ cur.toLowerCase() ] =
            {
                currencySymbol: currencies[ cur ].currencySymbol.toLowerCase(),
                currencyName: currencies[ cur ].currencyName.toLowerCase(),
            };
        }

        return formatted;
    };

    login = ( token ) =>
    {
        localStorage.setItem( 'kryztalz-token', token );
        this.setState( { isAuth: true } );

    };

    logout = () =>
    {
        this.setState( { isAuth: false } );
    };


    render ()
    {
        return (
            <AppContext.Provider value={
                {
                    ...this.state,
                    changeCurr: this.changeCurr,
                    login: this.login,
                    sendData: this.sendData
                } }>
                { this.props.children }
            </AppContext.Provider>
        );
    }

}

export default AppContext;

export { AppProvider };
