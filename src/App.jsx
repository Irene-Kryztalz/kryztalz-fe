import React, { Suspense } from 'react';
import { AppProvider } from "./Context";
import { Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import FilteredGems from "./pages/FilteredGems";
import Logout from './pages/Logout';
import ErrorBoundary from "./components/ErrorBoundary";

import './App.css';

const AfterSignUp = React.lazy( () => import( "./components/Mail/AfterSignUp" ) );
const Navigation = React.lazy( () => import( "./components/Navigation/Navigation" ) );
const SignUp = React.lazy( () => import( "./pages/SignUp" ) );
const SignIn = React.lazy( () => import( "./pages/SignIn" ) );
const Products = React.lazy( () => import( "./pages/Products" ) );
const Cart = React.lazy( () => import( "./pages/Cart" ) );
const Wishlist = React.lazy( () => import( "./pages/Wishlist" ) );
const VerifyAccount = React.lazy( () => import( "./pages/VerifyAccount" ) );
const Orders = React.lazy( () => import( "./pages/Orders" ) );



function App () 
{
  return (
    <Suspense fallback={ <div /> }>
      <AppProvider>
        <ErrorBoundary>
          <Navigation />
          <Main>
            <Switch>
              <Route exact path="/sign-up">
                <SignUp />
              </Route>
              <Route exact path="/sign-in">
                <SignIn />
              </Route>
              <Route path="/verify-account">
                <VerifyAccount />
              </Route>
              <Route path="/after-reg">
                <AfterSignUp />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/products/filter">
                <FilteredGems />
              </Route>
              <Route exact path="/products">
                <Products />
              </Route>

              <Route exact path="/cart">
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              </Route>
              <Route exact path="/wishlist">
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              </Route>
              <Route exact path="/order-history">
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
            </Switch>
          </Main>
        </ErrorBoundary>
      </AppProvider>
    </Suspense>
  );
}

export default App;
