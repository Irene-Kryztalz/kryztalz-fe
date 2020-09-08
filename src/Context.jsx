import React, { Component, createContext } from 'react';

const AppContext = createContext( null );

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

    }

    getData = url =>
    {

    };

    changeCurr = ( curr ) =>
    {
        this.setState( { activeCurr: curr } );
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


    render ()
    {
        return (
            <AppContext.Provider value={
                {
                    ...this.state,
                    getData: this.getData,
                    changeCurr: this.changeCurr
                } }>
                { this.props.children }
            </AppContext.Provider>
        );
    }

}

export default AppContext;

export { AppProvider };
