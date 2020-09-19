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
        let base;

        if ( !process.env.NODE_ENV || process.env.NODE_ENV === 'development' )
        {
            base = "http://localhost:3001/user";

        } else
        {
            base = process.env.REACT_APP_SERVER;
        }
        if ( !this.state.currencies[ "NGN" ] )
        {
            fetch( "./currency-country.json" )
                .then( resp => resp.json() )
                .then( curr =>
                {
                    this.setState(
                        {
                            activeCurr: "ngn",
                            baseUrl: base,
                            currencies: this.formatData( curr )
                        }
                    );
                } );
        }

    }

    changeCurr = ( curr ) =>
    {
        this.setState( { activeCurr: curr } );
    };

    sendData = async ( { endpoint, formData, method = "GET", headers } ) =>
    {
        this.setState( { loading: true } );
        let response;
        if ( method === "GET" )
        {
            response = await fetch( `${ this.state.baseUrl }/${ endpoint }` );
        }
        else
        {
            response = await fetch( `${ this.state.baseUrl }/${ endpoint }`,
                {
                    method,
                    headers,
                    body: formData
                } );
        }


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
                error: await response.json()
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
