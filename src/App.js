import React from 'react';
import LargeNav from "./components/Navigation/LargeNav/LargeNav";
import MobileNav from "./components/Navigation/MobileNav/MobileNav";
import './App.css';

function App () 
{

  return (
    <>
      <LargeNav />
      <MobileNav />
    </>
  );
}

export default App;
