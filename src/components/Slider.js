import React, { useState, useEffect, useRef } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import "../App.css";

// import Icon from '@material-ui/core/Icon';

// import MailIcon from "@material-ui/icons/Mail";
// import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
// import MapIcon from "@material-ui/icons/Map";

import {
  CircleMenu,
  CircleMenuItem,
  TooltipPlacement,
} from "react-circular-menu";

function Slider() {

  const refCarousel = useRef(null);
  const refpage1 = useRef(null);
  const refpage2 = useRef(null);
  const refpage3 = useRef(null);
  const refMain = useRef(null);

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  function page1() {
    clearGUI();
    refpage1.current.style.display = 'flex';
    refMain.current.className = 'AppLarge';
  }
  function page2() {
    clearGUI();
    refpage2.current.style.display = 'flex';
    refMain.current.className = 'AppLarge';
  }
  function page3() {
    clearGUI();
    refpage3.current.style.display = 'flex';
    refMain.current.className = 'AppLarge';
  }

  function back() {

    clearGUI();
    refCarousel.current.style.display = 'flex';
    refMain.current.className = 'AppSmall';
    //document.getElementById("main").className = "App1";
  }

  useEffect(() => {
    startGUI();
  }, [])

  function clearGUI() {
    refCarousel.current.style.display = 'none';
    refpage1.current.style.display = 'none';
    refpage2.current.style.display = 'none';
    refpage3.current.style.display = 'none';
  }

  function startGUI() {
    refpage1.current.style.display = 'none';
    refpage2.current.style.display = 'none';
    refpage3.current.style.display = 'none';
    refCarousel.current.style.display = 'flex';
  }

  function blabla(){
    console.log("bye");
  }

  return (<div id="main" ref={refMain} className='AppSmall'>

    {/* Main Page start */}
    <div id="carousel" className='carousel' ref={refCarousel} >
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null} >
        <Carousel.Item onClick={page1} >
          <img
            // className="d-block w-100"
            src="/image1.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Common Task</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item onClick={page2}>
          <img
            // className="d-block w-100"
            src="/image2.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Specific Task</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item onClick={page3}>
          <img
            // className="d-block w-100"
            src="/image3.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Personalisation</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </div>
    {/* Main Page end */}

    {/* page 1 start */}
    <div className='page' ref={refpage1}>
      <img
        src="/image1bg.png"
        alt="Third slide"
      />
      <div >
        <Button className="backbutton" variant="outline-light" size="lg" onClick={back} >Back</Button>
      </div>

      <div className='boi'>
      <CircleMenu startAngle={-90} rotationAngle={360} itemSize={5} radius={8} className={""} onMenuToggle={blabla}
        /**
         * rotationAngleInclusive (default true)
         * Whether to include the ending angle in rotation because an
         * item at 360deg is the same as an item at 0deg if inclusive.
         * Leave this prop for angles other than 360deg unless otherwise desired.
         */
        rotationAngleInclusive={false}>

        <CircleMenuItem onClick={() => alert("Clicked the item")} tooltip="Up" tooltipPlacement={TooltipPlacement.Right}>
          {/* <MailIcon /> */}
          {/* <Icon className="fa fa-plus-circle" /> */}

          {/* <img className="icon" src="/up.png" alt="First slide"
          /> */}
        </CircleMenuItem>
        <CircleMenuItem tooltip="Right">
          {/* <HelpOutlineIcon /> */}

          <img className="icon" src="/right.png" alt="First slide"/>

        </CircleMenuItem>
        <CircleMenuItem tooltip="Down">
        <img className="icon" src="/down.png" alt="First slide"/>
          {/* <MapIcon /> */}
        </CircleMenuItem>
        <CircleMenuItem tooltip="Left">
          {/* <InfoIcon /> */}
          <img className="icon" src="/left.png" alt="First slide"/>
        </CircleMenuItem>
      </CircleMenu>
      </div>
    </div>
    {/* page 1 end */}


    {/* page 2 start */}
    <div className='page' ref={refpage2} >
      <img
        src="/image2bg.png"
        alt="Third slide"

      />
      <div >
        <Button className="backbutton" variant="outline-light" size="lg" onClick={back} >Back</Button>
      </div>
    </div>
    {/* page 2 end */}


    {/* page 3 start */}
    <div className='page' ref={refpage3} >
      <img
        src="/image3bg.png"
        alt="Third slide"
        className='page'
      />
      <div >
        <Button className="backbutton" variant="outline-light" size="lg" onClick={back} >Back</Button>
      </div>
    </div>
    {/* page 3 end */}

  </div>)
}

export default Slider;