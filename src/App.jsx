import React from 'react';
import { AppProvider } from "./Context";
import { Switch, Route } from "react-router-dom";
import LargeNav from "./components/Navigation/LargeNav/LargeNav";
import MobileNav from "./components/Navigation/MobileNav/MobileNav";
import SignUp from "./pages/SignUp";
import './App.css';

function App () 
{
  return (
    <AppProvider>
      <LargeNav />
      <MobileNav />
      <main>
        <SignUp />
      </main>
    </AppProvider>
  );
}

export default App;
