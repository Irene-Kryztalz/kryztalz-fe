import React from 'react';
import { AppProvider } from "./Context";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import './App.css';

function App () 
{
  return (
    <AppProvider>
      <Navigation />
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
