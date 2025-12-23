import React from 'react'
import Navbar from './layoutes/Navbar';
import Hero from './layoutes/Hero';
import TopInfoBar from './components/TopInfoBar';

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TopInfoBar />
    </>
  );
}

export default App