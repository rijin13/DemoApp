import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import "../App.css";
import { ToggleButton, ToggleButtonGroup, Form, Image, ButtonGroup } from 'react-bootstrap';

// import Icon from '@material-ui/core/Icon';

// import MailIcon from "@material-ui/icons/Mail";
// import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
// import MapIcon from "@material-ui/icons/Map";

import {
  CircleMenu,
  CircleMenuItem,
  TooltipPlacement,
} from "react-circular-menu";
import { borderRadius } from '@mui/system';

function Slider() {

  const refCarousel = useRef(null);
  const refCarousel2 = useRef(null);
  const refpage1 = useRef(null);
  const refpage2 = useRef(null);
  const refpage3 = useRef(null);
  const refMain = useRef(null);

  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);


  //var connectionName = "ws://localhost:9090";
  // var connectionName ="ws://141.44.50.126:9090";
  var connectionName ="ws://141.44.228.65:9090";
  var [connection, setConnection] = useState(false);

  useEffect(() => {
    if (!connection) {
      handleConnect();
    }
  }, [connection])

  const handleConnect = () => {
    try {
      ros.connect(connectionName)

      ros.on('connection', () => {
        console.log('Connected to websocket server.');
        setConnection(true);
      })

      ros.on('error', (error) => {
        console.log("Connection error" + error);
      })

      ros.on('close', () => {
        console.log('Connection to websocket server closed.');
        setConnection(false);

        setTimeout(() => {
          try {
            // ros.connect(`ws://141.44.50.126:9090`);
            ros.connect(connectionName);

          }
          catch (error) {
            console.log("connection problem");
          }

        }, 2000);
      });
    } catch (e) {
      console.log("error" + e);
    }
  }

  function publishMessage(inputText) {
    var temp = inputText;

    var publisher = new window.ROSLIB.Topic({
      ros: ros,
      name: '/commander/ari',
      messageType: 'std_msgs/String'
    });

    var message = new window.ROSLIB.Message({
      data: String(temp),
    });

    publisher.publish(message);

  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setIndex2(selectedIndex);
  };

  const handleSelect2 = (selectedIndex2, e) => {
    setIndex2(selectedIndex2);
    setIndex(selectedIndex2);
  };

  function page1() {
    clearGUI();
    setIndex2(0);
    refCarousel2.current.style.display = 'flex';
    refMain.current.className = 'AppLarge';
  }
  function page2() {
    clearGUI();
    setIndex2(1);
    refCarousel2.current.style.display = "flex";
    refMain.current.className = 'AppLarge';
  }
  function page3() {
    clearGUI();
    setIndex2(2);
    refCarousel2.current.style.display = 'flex';
    refMain.current.className = 'AppLarge';
  }

  function back1() {
    clearGUI();
    setIndex(0);
    refCarousel.current.style.display = 'flex';
    refMain.current.className = 'AppSmall';
  }
  function back2() {
    clearGUI();
    setIndex(1);
    refCarousel.current.style.display = 'flex';
    refMain.current.className = 'AppSmall';
  }
  function back3() {
    clearGUI();
    setIndex(2);
    refCarousel.current.style.display = 'flex';
    refMain.current.className = 'AppSmall';
  }

  var ros = useMemo(() => {
    return new window.ROSLIB.Ros({
      url: ''
    })
  }, []);



  useEffect(() => {
    startGUI();
  }, [])

  function clearGUI() {
    refCarousel.current.style.display = 'none';
    refCarousel2.current.style.display = 'none';

  }

  function startGUI() {
    refCarousel2.current.style.display = 'none';
    refCarousel.current.style.display = 'flex';
  }

  function blabla() {
    console.log("bye");
  }
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };


  return (<div id="main" ref={refMain} className='AppSmall'>

    {/* Start Page start */}
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
            //className="d-block w-100"
            src="/image2.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Specific Task</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item onClick={page3}>
          <img
            //className="d-block w-100"
            src="/image3.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Personalisation</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </div>
    {/* Start Page end */}


    {/* Main Page start */}
    <div id="carousel2" className='carousel' ref={refCarousel2} >
      <Carousel activeIndex={index2} onSelect={handleSelect2} interval={null} >
        <Carousel.Item >

          <div className='page'>
            <img
              src="/image1bg.png"
              alt="Third slide"
            />
            <div >
              <Button className="backbutton" variant="outline-light" size="lg" onClick={back1} >Back</Button>
            </div>

            <div className='boi'>
              <CircleMenu startAngle={-90} rotationAngle={360} itemSize={5} radius={8} className={""} onMenuToggle={blabla}
                rotationAngleInclusive={false}>

                <CircleMenuItem onClick={() => publishMessage("look,up")} tooltip="Up" tooltipPlacement={TooltipPlacement.Right}>
                  {/* <MailIcon /> */}
                  {/* <Icon className="fa fa-plus-circle" /> */}

                  <img className="icon" src="/up.png" alt="First slide"
                  />
                </CircleMenuItem>
                <CircleMenuItem onClick={() => publishMessage("look,right")} tooltip="Right">
                  {/* <HelpOutlineIcon /> */}

                  <img className="icon" src="/right.png" alt="First slide" />

                </CircleMenuItem>
                <CircleMenuItem onClick={() => publishMessage("look,down")} tooltip="Down">
                  <img className="icon" src="/down.png" alt="First slide" />
                  {/* <MapIcon /> */}
                </CircleMenuItem>
                <CircleMenuItem onClick={() => publishMessage("look,left")} tooltip="Left">
                  {/* <InfoIcon /> */}
                  <img className="icon" src="/left.png" alt="First slide" />
                </CircleMenuItem>
              </CircleMenu>
            </div>
            <Carousel.Caption>
              <h3>Common Task</h3>
            </Carousel.Caption>
            <h1 className="PlayMotion">Play Motion</h1>
            <h1 className="Look">Look</h1>
            <div className="backbutton2">
              <Button variant="outline-dark" size="lg" onClick={() => publishMessage("motion,show_left")} >Show Left</Button>
              <br></br>
              <Button variant="outline-dark" size="lg" onClick={() => publishMessage("motion,nod")} >Nod</Button>
              <br></br>
              <Button variant="outline-dark" size="lg" onClick={() => publishMessage("motion,bow")}>Bow</Button>
              <br></br>
              <Button variant="outline-dark" size="lg" onClick={() => publishMessage("motion,dance")} >Dance</Button>
            </div>
          </div>

        </Carousel.Item>
        <Carousel.Item >
          <div className='page'  >
            <img
              src="/image2bg.png"
              alt="Third slide"

            />
            <div >
              <Button className="backbutton" variant="outline-light" size="lg" onClick={back2} >Back</Button>
            </div>
            <div className='togglebutton'>
              <div>
                <div className='but1'>
                <label >
                  <div style={{ width: "100px", height: "100px", backgroundColor: "red" , borderRadius:"10%"}}></div>
                  <input type="radio" name="color" value="red" checked={selectedColor === "red"} onChange={handleColorChange} />

                </label>
                <br />
                <label >
                  <div style={{ width: "100px", height: "100px", backgroundColor: "black" , borderRadius:"10%"}}></div>
                  <input type="radio" name="color" value="black" checked={selectedColor === "black"} onChange={handleColorChange} />

                </label>
                </div>
                <div className='but2'>
                {/* <br /> */}
                <label >
                  <div style={{ width: "100px", height: "100px", backgroundColor: "blue" , borderRadius:"10%"}}></div>
                  <input type="radio" name="color" value="blue" checked={selectedColor === "blue"} onChange={handleColorChange} />

                </label>
                <br />
                <label >
                  <div style={{ width: "100px", height: "100px", backgroundColor: "green", borderRadius:"10%"}}></div>
                  <input type="radio" name="color" value="green" checked={selectedColor === "green"} onChange={handleColorChange} />

                </label>
                </div>
                {/* <br /> */}
              </div>
            </div>
            <h1 className="Look">Eye Color</h1>
            <Button onClick={() => publishMessage(`eye_color,${selectedColor}`)} className="setButton">Set</Button>
            <h1 className="PlayMotion">Set Voice</h1>
            <div className="backbutton2">
              <Button variant="outline-dark" size="lg" onClick={() => publishMessage("voice")} >Voice 1</Button>
              <br></br>
              <Button variant="outline-dark" size="lg" onClick={() => publishMessage("voice")} >Voice 2</Button>
              <br></br>
              <Button variant="outline-dark" size="lg" onClick={() => publishMessage("voice")}>Voice 3</Button>
              <br></br>
              <Button variant="outline-dark" size="lg" onClick={() => publishMessage("voice")} >Voice 4</Button>
            </div>
          </div>

          <Carousel.Caption>
            <h3>Specific Task</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
          <div className='page'  >
            <img
              src="/image3bg.png"
              alt="Third slide"
              className='page'
            />
            <div >
              <Button className="backbutton" variant="outline-light" size="lg" onClick={back3} >Back</Button>
            </div>
          </div>

          <Carousel.Caption>
            <h3>Personalisation</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </div>
    {/* Main Page end */}

  </div>)
}

export default Slider;