import React, { Suspense } from 'react';
import { AppProvider } from "./Context";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FilteredGems from "./pages/FilteredGems";
import Page404 from "./pages/Page404";
import Logout from './pages/Logout';
import Products from "./pages/Products";

import Main from "./components/Main";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Navigation from "./components/Navigation/Navigation";

import './App.css';

const Cart = React.lazy( () => import( "./pages/Cart" ) );
const Orders = React.lazy( () => import( "./pages/Orders" ) );
const SignUp = React.lazy( () => import( "./pages/SignUp" ) );
const SignIn = React.lazy( () => import( "./pages/SignIn" ) );
const Wishlist = React.lazy( () => import( "./pages/Wishlist" ) );
const SearchPage = React.lazy( () => import( "./pages/SearchPage" ) );
const OrderDetails = React.lazy( () => import( "./pages/OrderDetails" ) );
const ProductDetail = React.lazy( () => import( "./pages/ProductDetail" ) );
const VerifyAccount = React.lazy( () => import( "./pages/VerifyAccount" ) );
const AfterSignUp = React.lazy( () => import( "./components/Mail/AfterSignUp" ) );




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
                <ScrollToTop>
                  <SignUp />
                </ScrollToTop>
              </Route>

              <Route exact path="/sign-in">
                <ScrollToTop >
                  <SignIn />
                </ScrollToTop>
              </Route>

              <Route path="/verify-account">
                <ScrollToTop>
                  <VerifyAccount />
                </ScrollToTop>
              </Route>

              <Route path="/after-reg">
                <ScrollToTop>
                  <AfterSignUp />
                </ScrollToTop>
              </Route>

              <Route path="/logout">
                <ScrollToTop>
                  <Logout />
                </ScrollToTop>
              </Route>

              <Route path="/products/filter">
                <ScrollToTop>
                  <FilteredGems />
                </ScrollToTop>
              </Route>

              <Route exact path="/products/search">
                <ScrollToTop>
                  <SearchPage />
                </ScrollToTop>
              </Route>

              <Route exact path="/products/:id">
                <ScrollToTop>
                  <ProductDetail />
                </ScrollToTop>
              </Route>


              <Route exact path="/products">
                <ScrollToTop>
                  <Products />
                </ScrollToTop>
              </Route>


              <Route exact path="/cart">
                <ProtectedRoute>
                  <ScrollToTop>
                    <Cart />
                  </ScrollToTop>
                </ProtectedRoute>
              </Route>

              <Route exact path="/wishlist">
                <ProtectedRoute>
                  <ScrollToTop>
                    <Wishlist />
                  </ScrollToTop>
                </ProtectedRoute>

              </Route>
              <Route exact path="/order-history">
                <ProtectedRoute>
                  <ScrollToTop>
                    <Orders />
                  </ScrollToTop>
                </ProtectedRoute>
              </Route>

              <Route exact path="/order/:id">
                <ProtectedRoute>
                  <ScrollToTop>
                    <OrderDetails />
                  </ScrollToTop>
                </ProtectedRoute>
              </Route>

              <Route exact path="/">
                <ScrollToTop>
                  <HomePage />
                </ScrollToTop>
              </Route>

              <Route path="*">
                <ScrollToTop>
                  <Page404 />
                </ScrollToTop>
              </Route>
            </Switch>

            <footer>
              <p className="copyright">
                Copyright &copy; { new Date().getFullYear() } &nbsp;&nbsp;
                        <a href="https://github.com/Irene-Kryztalz/kryztalz-fe" target="_blank" rel="noopener noreferrer">
                  Kryztalz </a>
              </p>

              <p className="disclaimer">

                All images and icons displayed on this application belong to their respective owners.

                        <br /><br />

                        Logo design belongs to me however.

                        <br /> <br />

                        Kryztalz and the owners of this site are not liable for anything.

                        <br /><br />

                        All information about gems here was sourced from the internet.

                        <br /><br />

                         This application is simply an intellectual excercise.

                    </p>

              <p className="credit">Icons made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
              </p>
            </footer>

          </Main>

        </ErrorBoundary>
      </AppProvider>
    </Suspense>
  );
}

export default App;
