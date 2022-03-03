import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import longhighres from './images/Nov-Dec-2021/0.8/long highres.webp';
import longlowres from './images/Nov-Dec-2021/0.8/long lowres.webp';
import coverPeople from './images/people1.webp';
import coverShortBuilding from './images/short building1.webp';
import coverTallBuilding from './images/tall building1.webp';
import coverFlags from './images/flags1.webp';
import coverBlobA from './images/blobA2.webp';
import coverBlobB from './images/blobB2.webp';
import coverBlobC from './images/blobC2.webp';
import coverTitle from './images/title2.webp';
import coverText from './images/text2.webp';
import coverSky from './images/sky3.webp';

import { ReactComponent as Title } from './images/cover title.svg';
// import Parallax from 'parallax-js'


function App() {

  const [isLongLoaded, setIsLongLoaded] = useState(true);
  const [howManyLayersLoaded, setHowManyLayersLoaded] = useState(0);
  const layersCount = 6;

  const [scrollPosition, setScrollPosition] = useState(0);
  const [deviceTiltX, setDeviceTiltX] = useState(0);
  const [deviceTiltY, setDeviceTiltY] = useState(0);
  const [anchorTiltX, setAnchorTiltX] = useState(0);
  const [anchorTiltY, setAnchorTiltY] = useState(0);

  const [orientationRequestNeeded, setOrientationRequestNeeded] = useState(true);
  const [logit, setLogit] = useState("");

  const handleScroll = () => {
    const position = (document.body.scrollTop / document.body.clientHeight);
    setScrollPosition(position.toPrecision(3));
  };

  let count = 0;
  const parallax = (zOffset) => {
    const zOrigin = 600;
    let X = 0;
    let Y = 0;

    let tiltX = Math.max(Math.min((deviceTiltX - anchorTiltX), 90), -90);
    let tiltY = Math.max(Math.min((deviceTiltY - anchorTiltY), 30), -30);

    X += tiltY / 350 * (zOffset + zOrigin)
    Y += -tiltX / 315 * (zOffset + zOrigin)

    Y += Math.min(scrollPosition, 1) * -1 * (zOffset + zOrigin)

    // console.log("X:" + deviceTiltX.toString().substring(0,4) + " - Y:" + deviceTiltY.toString().substring(0,4));
    const transformedStyle =
    {
      transform:
        "translateX(" + X + "px) " +
        "translateY(" + Y + "px)",
    }
    count++;
    console.log(count,X,Y);
    return transformedStyle;
  }

  useEffect(() => {
    // Setting up a --vh css variable for positioning elements ignoring the address bar on mobile
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // handle DeviceOrientationEvent permissions
    if (window.DeviceOrientationEvent) {
      // is supported
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // IOS 13+ devices:
        console.log(3);

        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'default' || permissionState === 'denied') {
                console.log(4);
              //No permission: show ask permission button
              setOrientationRequestNeeded(true);
            }
            console.log(permissionState);
            setLogit(permissionState);
          })
          .catch(console.error);
      }
      else {
        // Regular non iOS 13+ devices: set listener    
        window.ondeviceorientation = e => handleOrientation(e);
        setOrientationRequestNeeded(false);
        console.log(2);
      }
    }
    else
    {
      // not supported
      setOrientationRequestNeeded(false);
      console.log(3);
    }

    // Add scroll event listener
    document.body.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.body.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [initialResetted, setInitialResetted] = useState(false);

  const handleOrientation = (e) => {
    // if (initialResetted == false) {
    //   setAnchorTiltX(Math.trunc(e.beta));
    //   setAnchorTiltY(Math.trunc(e.gamma));
    //   setInitialResetted(true)
    // }

    setDeviceTiltX(Math.trunc(e.beta));
    setDeviceTiltY(Math.trunc(e.gamma));
  };

  useEffect(() => {
    if (initialResetted == false) {
      setAnchorTiltX(deviceTiltX);
      setAnchorTiltY(deviceTiltY);
      setInitialResetted(true)
    }
  }, [initialResetted, anchorTiltX, anchorTiltY, deviceTiltX, deviceTiltY])

  const resetOrientation = () => {
    setAnchorTiltX(deviceTiltX);
    setAnchorTiltY(deviceTiltY);
    console.log("has reset - device=" + deviceTiltX + "anchor=" + anchorTiltX)
  }


  const requestOrientationPermission = () => {
    // setOrientationRequestNeeded(false);
    // return true;
    DeviceOrientationEvent.requestPermission().then(permissionState => {
      if (permissionState === 'granted') {
        window.ondeviceorientation = e => handleOrientation(e);
      }
      // setOrientationRequested(true);
      setOrientationRequestNeeded(false);
      console.log(permissionState);
    }).catch(console.error);
  }

  const incrementLayerCount = () => {
    setHowManyLayersLoaded(howManyLayersLoaded + 1); 
  }

  const finishedLoading = () => {
    return (howManyLayersLoaded == layersCount) && !orientationRequestNeeded;
  }

  return (
    <div className="App">
      <div className='loading-container' style={(finishedLoading() ? { opacity: 0 } : {})}>
        <Title className="loading-title" />
        <div className="enter-button-spinner-container">
          <div className="spinner" style={(orientationRequestNeeded ? {opacity: 0} : {opacity: 1})}>
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube"></div>
              <div className="sk-cube2 sk-cube"></div>
              <div className="sk-cube4 sk-cube"></div>
              <div className="sk-cube3 sk-cube"></div>
            </div>
          </div>
          <button className="enter-button" 
            style={(orientationRequestNeeded ? {opacity: 1} : {opacity: 0})} 
            onClick={requestOrientationPermission}>כניסה</button>
        </div>
      </div>

      <div className='parallax-container' style={(finishedLoading() ? { opacity: 1, pointerEvents: "auto" } : {})}>
        <div className='parallax'>
          <div className='back-container'>
            <div className='parallaxed sky-container' >
              <img className='sky' src={coverSky} onLoad={() => { incrementLayerCount(); }} />
            </div>
            <img src={coverTallBuilding} className='parallaxed tall-building' onLoad={() => { incrementLayerCount(); }} />
            <img src={coverShortBuilding} className='parallaxed short-building' onLoad={() => { incrementLayerCount(); }} />
            <img src={coverPeople} className='parallaxed people' style={parallax(-160)} onLoad={() => { incrementLayerCount(); }} />
            <img src={coverText} className='parallaxed text' style={parallax(0)} onLoad={() => { incrementLayerCount(); }} />
          </div>
          <img src={coverFlags} className='parallaxed flags' style={parallax(500)} onLoad={() => { incrementLayerCount(); }} />
          {/* <div className='parallaxed black-bottom' style={parallax(600)}></div> */}
        </div>
      </div>
      <div className="longContainer" style={(finishedLoading() ? { height: "auto", animation: "slidein 0.5s 1s ease-in-out both" } : {})}
        onClick={() => {
          DeviceMotionEvent.requestPermission();
          // resetOrientation();
        }}>
        <img className="long" id="longlowres" src={longlowres} onLoad={() => { setIsLongLoaded(true) }} />
        <img className="long" id="longhighres" src={longhighres} onLoad={() => { setIsLongLoaded(true) }} />
      </div>

      <div className='make-scrollable' style={(finishedLoading() ? { animation: "maketall 0.5s 1.5s ease-in-out both" } : {})}
        onClick={() => {
          resetOrientation();
        }}
      >
        <p style={{ fontSize: 30 }}>
          {"device: " + deviceTiltX + ", " + deviceTiltY + " |  anchor: " + anchorTiltX + ", " + anchorTiltY}
        </p>
        <p style={{ fontSize: 30 }}>
          {
            "result: " + Math.max(Math.min((deviceTiltX - anchorTiltX), 90), -90) + ", " +
            Math.max(Math.min((deviceTiltY - anchorTiltY), 30), -30) + " | initialResetted = " + initialResetted + " | log: " + logit
          }
        </p>
      </div>

    </div>
  );
}

export default App;
