import React from 'react';
import { AppProvider } from "./Context";
import { Switch, Route } from "react-router-dom";
import LargeNav from "./components/Navigation/LargeNav/LargeNav";
import MobileNav from "./components/Navigation/MobileNav/MobileNav";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import './App.css';

function App () 
{
  return (
    <AppProvider>
      <LargeNav />
      <MobileNav />
      <main>
        <Switch>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
        </Switch>
      </main>
    </AppProvider>
  );
}

export default App;
