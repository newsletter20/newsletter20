import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import longhighres from './images/Nov-Dec-2021/0.8/long highres.webp';
import longlowres from './images/Nov-Dec-2021/0.8/long lowres.webp';
import coverPeople from './images/people1.webp';
import coverCity from './images/city1.webp';
import coverFlags from './images/flags1.webp';
import coverSky from './images/sky3.webp';
import { ReactComponent as Title } from './images/cover title.svg';
// import Parallax from 'parallax-js'


function App() {

  const [isLongLoaded, setIsLongLoaded] = useState(true);
  const [howManyLayersLoaded, setHowManyLayersLoaded] = useState(0);
  const layersCount = 4;

  const [scrollPosition, setScrollPosition] = useState(0);
  const [deviceTiltX, setDeviceTiltX] = useState(0);
  const [deviceTiltY, setDeviceTiltY] = useState(0);
  const [anchorTiltX, setAnchorTiltX] = useState(0);
  const [anchorTiltY, setAnchorTiltY] = useState(0);

  const [OrientationRequestNeeded, setOrientationRequestNeeded] = useState(false);
  const [orientationRequested, setOrientationRequested] = useState(false);

  const handleScroll = () => {
    const position = (document.body.scrollTop / document.body.clientHeight);
    setScrollPosition(position);
  };

  const dof = (zOffset) => {
    const blurStrength = 0.04;
    const fromPoint = -160;
    const toPoint = 300;

    let focusPoint = fromPoint + Math.min(scrollPosition.toPrecision(2) * 3, 1) * Math.abs(toPoint - fromPoint);
    let distanceFromFocusPoint = Math.abs(zOffset - focusPoint);
    let blurAmount = (distanceFromFocusPoint * blurStrength);

    const blurredStyle =
    {
      filter: "blur(" + blurAmount + "px)"
    }
    // return blurredStyle;
    return {};
  }

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
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'default' || permissionState === 'denied') {
              //No permission: show ask permission button
              setOrientationRequestNeeded(true);
            }
            console.log(permissionState);
          })
          .catch(console.error);
      }
      else {
        // Regular non iOS 13+ devices: set listener 
        window.ondeviceorientation = e => handleOrientation(e);
        
      }
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
      setAnchorTiltX(deviceTiltX + 48);
      setAnchorTiltY(deviceTiltY + 48);
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
      // setOrientationRequested(true);
      setOrientationRequestNeeded(false);
      console.log(permissionState);
    }).catch(console.error);
  }

  return (
    <div className="App">
      <div className='loading-container' style={(howManyLayersLoaded == layersCount ? { opacity: 0 } : {})}>
        <Title className="loading-title" />
        <div className="spinner">
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
        </div>
      </div>

      <wrapper className='parallax-wrapper' style={(howManyLayersLoaded == layersCount ? { opacity: 1 } : {})}>
        <div className='parallax'>
          <div className='back-container'>
            <div className='parallaxed sky-container' >
              <img className='sky' src={coverSky} onLoad={() => { setHowManyLayersLoaded(howManyLayersLoaded + 1); }} />
            </div>
            <img src={coverCity} className='parallaxed city' onLoad={() => { setHowManyLayersLoaded(howManyLayersLoaded + 1); }} />
            <img src={coverPeople} className='parallaxed people' style={parallax(-160)} onLoad={() => { setHowManyLayersLoaded(howManyLayersLoaded + 1); }} />
            <Title className="parallaxed title" style={parallax(0)} />
          </div>
          <img src={coverFlags} className='parallaxed flags' style={parallax(300)} onLoad={() => { setHowManyLayersLoaded(howManyLayersLoaded + 1); }} />

          <div className='parallaxed black-bottom' style={parallax(300)}></div>
        </div>
      </wrapper>



      <div className="longContainer" style={(isLongLoaded & howManyLayersLoaded == layersCount ? { height: "auto", animation: "slidein 0.5s 1.5s ease-in-out both" } : {})}
        onClick={() => {
          DeviceMotionEvent.requestPermission();
          // resetOrientation();
        }}>
        <img className="long" id="longlowres" src={longlowres} onLoad={() => { setIsLongLoaded(true) }} />
        <img className="long" id="longhighres" src={longhighres} onLoad={() => { setIsLongLoaded(true) }} />
      </div>

      {/* <div className="cover" id="coverlowres" onLoad={() => {setIsCoverLoaded(true)}}/> */}

      {/* <Controller>
        <Scene duration="100%" triggerHook="onLeave" pin>
          {progress => (
            <div className='lols' style={{ height: "100%" }}>
              {setScrollProgress(progress)}
            </div>
          )}
        </Scene>
      </Controller> */}

      {/* <wrapper className='tilt-wrapper'>
        <Tilt gyroscope={true} tiltReverse={true} trackOnWindow={false} className='tilt'
          onMove={(a, b, tiltAngleXPercentage, tiltAngleYPercentage) => { setTiltX(tiltAngleXPercentage); setTiltY(tiltAngleYPercentage); }}>
        </Tilt>
      </wrapper> */}
      <div className='make-scrollable' style={(isLongLoaded & howManyLayersLoaded == layersCount ? { animation: "maketall 0.5s 1.5s ease-in-out both" } : {})}
        onClick={() => {
          // DeviceMotionEvent.requestPermission(
          resetOrientation();
        }}
      >
        <p style={{ fontSize: 30 }}>
          {"device: " + deviceTiltX + ", " + deviceTiltY + " |  anchor: " + anchorTiltX + ", " + anchorTiltY}
        </p>
        <p style={{ fontSize: 30 }}>
          {
            "result: " + Math.max(Math.min((deviceTiltX - anchorTiltX), 90), -90) + ", " +
            Math.max(Math.min((deviceTiltY - anchorTiltY), 30), -30) + " | initialResetted = " + initialResetted
          }
        </p>
      </div>

    </div>
  );
}

export default App;
