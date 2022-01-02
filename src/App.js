import './App.css';
import React, { useState, useEffect } from 'react';

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
          <img className="long" id="longlowres" src="https://firebasestorage.googleapis.com/v0/b/newsletter-23e70.appspot.com/o/Mashan%20Newsletter%200.8%20long%20highres%20(quality75).webp?alt=media&token=53b15604-9564-45c8-8b44-c794203db870" />
          <img className="long" id="longhighres"
            src="https://firebasestorage.googleapis.com/v0/b/newsletter-23e70.appspot.com/o/Mashan%20Newsletter%200.8%20long%20highres%20(quality75).webp?alt=media&token=53b15604-9564-45c8-8b44-c794203db870" />
        </div>
      
    </div>
  );
}

export default App;
