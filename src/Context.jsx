import React, { Component, createContext } from 'react';

const AppContext = createContext( null );

AppContext.displayName = 'AppContext';

class AppProvider extends Component
{
    state =
        {
            cart: [],
            rates: {},
            wishlist: [],
            loading: true,
            currencies: {},
            activeCurr: "",
            isAuth: false,
            baseUrl: "",
            gems: [],
            count: 0,

        };

    init = () =>
    {
        let base;
        if ( !process.env.NODE_ENV || process.env.NODE_ENV === 'development' )
        {
            base = "http://localhost:7272";
        }
        else
        {
            base = process.env.REACT_APP_SERVER;
        }

        this.setState( { baseUrl: base } );

        fetch( `${ base }/shop/rates` )
            .then( res => res.json() )
            .then( rates => this.setState( { rates } ) )
            .catch( err => console.error( err ) );


    };

    componentDidMount ()
    {
        this.hydrate();
        this.init();


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
                response = await fetch( `${ url }/${ endpoint }`,
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

        }
        catch ( err )
        {
            //handle error like server is offline
            //no network
            //or request timeout
            this.setState( { loading: false } );
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

    updateCart = async ( gem, quantity, remove = false ) =>
    {
        const gemId = gem._id;
        let cart = [ ...this.state.cart ];
        if ( remove )
        {
            cart = cart.filter( g => g.gemId._id !== gemId );
            const { data } = await this.sendData(
                {
                    endpoint: "shop/remove-cart",
                    method: "post",
                    formData: JSON.stringify( { gemId } ),
                    setLoad: false,
                    headers:
                    {
                        "Content-Type": "application/json"
                    }
                }
            );

            if ( data )
            {
                localStorage.setItem( "cart", JSON.stringify( cart ) );
                this.setState( { cart } );
            }

        }
        else
        {
            const index = cart.findIndex( g => g.gemId._id === gemId );

            if ( index > -1 )
            {
                cart[ index ].quantity += quantity;
                if ( cart[ index ].quantity <= 0 )
                {
                    cart = cart.filter( g => g.gemId._id !== gemId );
                }
            }
            else
            {
                cart.push( { gemId: gem, quantity } );
            }

            const { data } = await this.sendData(
                {
                    endpoint: "shop/add-cart",
                    method: "post",
                    formData: JSON.stringify( { gemId, quantity } ),
                    setLoad: false,
                    headers:
                    {
                        "Content-Type": "application/json"
                    }
                }
            );

            if ( data )
            {
                localStorage.setItem( "cart", JSON.stringify( cart ) );
                this.setState( { cart } );
            }

        }
    };

    updateWishlist = async ( gem, remove = false ) =>
    {
        const gemId = gem._id;
        let wishlist = [ ...this.state.wishlist ];
        if ( remove )
        {
            wishlist = wishlist.filter( g => g.gemId._id !== gemId );
        }
        else
        {
            const index = wishlist.findIndex( g => g.gemId._id === gemId );

            if ( index < 0 )
            {
                wishlist.push( { gemId: gem } );
            }

            const { data } = await this.sendData(
                {
                    endpoint: "shop/add-wishlist",
                    method: "post",
                    formData: JSON.stringify( { gemId } ),
                    setLoad: false,
                    headers:
                    {
                        "Content-Type": "application/json"
                    }
                }
            );

            if ( data )
            {

                localStorage.setItem( "wishlist", JSON.stringify( wishlist ) );
                this.setState( { wishlist } );
            }

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
                    updateWishlist: this.updateWishlist,
                    init: this.init
                } }>
                { this.props.children }
            </AppContext.Provider>
        );
    }

}

export default AppContext;

export { AppProvider };
