import './App.css';
import React, { useState, useEffect } from 'react';
import longfirsthighres from './images/Jan-Feb-2022/long first highres1.webp';
import longfirstlowres from './images/Jan-Feb-2022/long first lowres1.webp';
import longsecondhighres from './images/Jan-Feb-2022/long second highres1.webp';
import longsecondlowres from './images/Jan-Feb-2022/long second lowres1.webp';
import coverPeople from './images/Jan-Feb-2022/people1.webp';
import coverShortBuilding from './images/Jan-Feb-2022/short building1.webp';
import coverTallBuilding from './images/Jan-Feb-2022/tall building1.webp';
import coverFlags from './images/Jan-Feb-2022/flags1.webp';
import coverText from './images/Jan-Feb-2022/text3.webp';
import coverSky from './images/Jan-Feb-2022/sky3.webp';
import { ReactComponent as Title } from './images/Jan-Feb-2022/cover title.svg';

function App() {

  const [isFirstLongLoaded, setIsFirstLongLoaded] = useState(false);
  const [isSecondLongLoaded, setIsSecondLongLoaded] = useState(false);
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
        resetOrientation();
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
    DeviceOrientationEvent.requestPermission().then(permissionState => {
      if (permissionState === 'granted') {
        window.ondeviceorientation = e => handleOrientation(e);
      }
      setOrientationRequestNeeded(false);
      console.log(permissionState);
    }).catch(console.error);
  }

  const incrementLayerCount = () => {
    setHowManyLayersLoaded(howManyLayersLoaded + 1); 
    resetOrientation();
  }

  const coverFinishedLoading = () => {
    return (howManyLayersLoaded == layersCount) && !orientationRequestNeeded;
  }

  const longFinishedLoading = () => {
    return isFirstLongLoaded && isSecondLongLoaded;
  }

  return (
    <div className="App">
      <div className='loading-container' style={(coverFinishedLoading() ? { opacity: 0 } : {})}>
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

      <div className='parallax-container' style={(coverFinishedLoading() ? { opacity: 1, pointerEvents: "auto" } : {})}>
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

      <div className="long-container" style={(coverFinishedLoading() && longFinishedLoading() ? { height: "auto", animation: "slidein 0.5s 1s ease-in-out both" } : {})}>
          <img className="long-first" src={longfirstlowres} onLoad={() => { setIsFirstLongLoaded(true) }} />\
          <img className="long-first" src={longfirsthighres} onLoad={() => { setIsFirstLongLoaded(true) }} />
          <img className="long-second" src={longsecondlowres} onLoad={() => { setIsSecondLongLoaded(true) }} />
         <img className="long-second" src={longsecondhighres} onLoad={() => { setIsSecondLongLoaded(true) }} />

      </div>

      <div className='make-scrollable' style={(coverFinishedLoading() ? { animation: "maketall 0.5s 1.5s ease-in-out both" } : {})}>
        {/* <p style={{ fontSize: 30 }}>
          {"device: " + deviceTiltX + ", " + deviceTiltY + " |  anchor: " + anchorTiltX + ", " + anchorTiltY}
        </p>
        <p style={{ fontSize: 30 }}>
          {
            "result: " + Math.max(Math.min((deviceTiltX - anchorTiltX), 90), -90) + ", " +
            Math.max(Math.min((deviceTiltY - anchorTiltY), 30), -30) + " | initialResetted = " + initialResetted + " | log: " + logit
          }
        </p> */}
      </div>

    </div>
  );
}

export default App;
