import './App.css';
import React, { useState, useEffect } from 'react';
import longhighres from './images/Nov-Dec-2021/0.8/long highres.webp';
import longlowres from './images/Nov-Dec-2021/0.8/long lowres.webp';
import covernotitle from './images/cover background+content.png';
import {ReactComponent as Title} from './images/cover title.svg';


function App() {

  const [isCoverLoaded, setIsCoverLoaded] = useState(false);
  const [isLongLoaded, setIsLongLoaded] = useState(true);

  
  useEffect(() => {
    // Setting up a --vh css variable for positioning elements ignoring the address bar on mobile
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  return (
    <div className="App">
        <div className="coverContainer" style={(isCoverLoaded ? {animation: "fadein 0.5s ease-in-out both"} : {})}>
          {/* <div className="cover" id="coverlowres" onLoad={() => {setIsCoverLoaded(true)}}/> */}
          <img className="coverN" src={covernotitle} onLoad={() => {setIsCoverLoaded(true)}}/>
        </div>
        <Title className="title"/>
        <div className="longContainer" style={(isLongLoaded ? {animation: "slidein 0.5s 0.5s ease-in-out both"} : {})}>
          <img className="long" id="longlowres" src={longlowres} onLoad={() => {setIsLongLoaded(true)}} />  
          <img className="long" id="longhighres" src={longhighres} onLoad={() => {setIsLongLoaded(true)}} />
        </div>
        
       
    </div>
  );
}

export default App;
