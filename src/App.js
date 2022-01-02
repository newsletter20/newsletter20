import './App.css';
import React, { useState, useEffect } from 'react';
import longhighres from './images/Nov-Dec-2021/0.8/long highres.webp';
import longlowres from './images/Nov-Dec-2021/0.8/long lowres.webp';
// import coverhighres from './images/Nov-Dec-2021/0.8/cover highres.webp';
// import coverlowres from './images/Nov-Dec-2021/0.8/cover lowres.webp';


function App() {
  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  return (
    <div className="App">
        <div className="cover" id="coverlowres"></div>
        <div className="cover" id="coverhighres"></div>
        <div>
          <img className="long" id="longlowres" src={longlowres} />
          
          
          <img className="long" id="longhighres" src={longhighres} />

        </div>
      
    </div>
  );
}

export default App;
