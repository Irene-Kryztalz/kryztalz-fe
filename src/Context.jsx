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
            baseUrl: "",
            gems: [],
            count: 0

        };

    componentDidMount ()
    {

        this.hydrate();
        let base;

        if ( !process.env.NODE_ENV || process.env.NODE_ENV === 'development' )
        {
            base = "http://localhost:7272";

        } else
        {
            base = process.env.REACT_APP_SERVER;
            fetch( `${ base }/` )
                .then( res => res.json() )
                .catch( err => console.error( err ) );
        }
        if ( !this.state.currencies[ "ngn" ] )
        {
            const isAuth = this.checkExpiredToken();
            fetch( "./currency-country.json" )
                .then( resp => resp.json() )
                .then( curr =>
                {
                    this.setState(
                        {
                            isAuth,
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

    sendData = async ( { endpoint, formData, method = "GET", headers, setLoad = true } ) =>
    {
        method = method.toUpperCase();
        if ( setLoad )
        {
            this.setState( { loading: true } );
        }
        headers =
        {
            ...headers,
            Authorization: `Bearer ${ localStorage.getItem( "token" ) }`
        };

        let response,
            url = this.state.baseUrl;

        try 
        {

            if ( method === "GET" )
            {
                response = await Promise.race( [ fetch( `${ url }/${ endpoint }`,
                    {
                        headers
                    } ), new Promise( ( _, reject ) => setTimeout( () => reject( new Error( "Timeout" ) )
                        , 10000 ) ) ] );
            }
            else
            {
                response = await Promise.race( [ fetch( `${ url }/${ endpoint }`,
                    {
                        method,
                        headers,
                        body: formData
                    } ), new Promise( ( _, reject ) => setTimeout( () => reject( new Error( "Timeout" ) )
                        , 10000 ) ) ] );
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

        }
        catch ( err )
        {
            //handle error like server is offline
            //no network
            //or request timeout
            return {
                error: err.message
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

    login = ( { token, cart, wishlist, expires } ) =>
    {
        localStorage.setItem( 'token', token );
        localStorage.setItem( 'cart', JSON.stringify( cart ) );
        localStorage.setItem( 'wishlist', JSON.stringify( wishlist ) );

        localStorage.setItem( 'token-exp', expires );
        this.setState( { isAuth: true, cart, wishlist } );

    };

    logout = () =>
    {
        this.setState( { isAuth: false } );
        localStorage.removeItem( 'token' );
    };

    setGems = ( items ) =>
    {
        if ( !this.state.gems.length && items )
        {
            const { gems, count } = items;
            this.setState( { gems, count } );
            return;
        }

        if ( this.state.gems.length && items.gems.length )
        {
            const allGems = [ ...this.state.gems, ...items.gems ];

            this.setState( { gems: allGems, count: items.count } );
            return;
        }
    };

    hydrate = () =>
    {
        const cart = JSON.parse( localStorage.getItem( "cart" ) );
        const wishlist = JSON.parse( localStorage.getItem( "wishlist" ) );

        if ( cart && wishlist )
        {
            this.setState( { cart, wishlist } );
        }
    };

    checkExpiredToken = () =>
    {
        const now = new Date().getTime();
        const token = localStorage.getItem( "token" );
        const expires = +localStorage.getItem( "token-exp" );
        const diff = ( expires && token ) ? expires - now : 0;
        return diff > 0 ? true : false;
    };

    updateCart = ( gemId, quantity, remove = false ) =>
    {
        if ( remove )
        {

        }
        else
        {
            console.log( gemId );
        }
    };

    updateWishlist = ( gemId, quantity, remove = false ) =>
    {
        if ( remove )
        {

        }
        else
        {
            console.log( gemId );
        }
    };



    render ()
    {
        return (
            <AppContext.Provider value={
                {
                    ...this.state,
                    changeCurr: this.changeCurr,
                    login: this.login,
                    logout: this.logout,
                    sendData: this.sendData,
                    setGems: this.setGems,
                    updateCart: this.updateCart,
                    updateWishlist: this.updateWishlist
                } }>
                { this.props.children }
            </AppContext.Provider>
        );
    }

}

export default AppContext;

export { AppProvider };
