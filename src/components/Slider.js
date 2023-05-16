import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import "../App.css";
import { ToggleButton, ToggleButtonGroup, Form, Image, ButtonGroup } from 'react-bootstrap';

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
  var connectionName ="ws://141.44.50.126:9090";
  // var connectionName ="ws://141.44.228.65:9090";
  var [connection, setConnection] = useState(false);

  var ros = useMemo(() => {
    return new window.ROSLIB.Ros({
      url: ''
    })
  }, []);

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

  function page(pageNumber) {
    var temp = pageNumber;
    clearGUI();
    setIndex(pageNumber);
    refCarousel2.current.style.display = 'flex';
    refMain.current.className = 'AppLarge';
  }

  function back(pageNumber) {
    var temp = pageNumber;
    clearGUI();
    setIndex(pageNumber);
    refCarousel.current.style.display = 'flex';
    refMain.current.className = 'AppSmall';
  }

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
  const [updatedColor, setUpdatedColor] = useState("");

  const handleColorChange = (event) => {
    const color = event.target.value;
    setUpdatedColor(color);
    setSelectedColor(color);

    publishMessage(`eye_color,${color}`);
  };

  return (<div id="main" ref={refMain} className='AppSmall'>

    {/* Start Page start */}
    <div id="carousel" className='carousel' ref={refCarousel} >
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null} >
        <Carousel.Item onClick={() => page(0)} >
          <img
            // className="d-block w-100"
            src="/image1.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Common Task</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item onClick={() => page(1)}>
          <img
            //className="d-block w-100"
            src="/image3.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Personalisation </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item onClick={() => page(2)}>
          <img
            //className="d-block w-100"
            src="/image2.png"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Specific Task</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </div>
    {/* Start Page end */}


    {/* Main Page start */}
    <div id="carousel2" className='carousel' ref={refCarousel2} >
      <div className="tabbar">
        <Button className="tabbarButton" variant="outline-secondary" onClick={() => handleSelect(0)}>Common Task</Button>
        <Button className="tabbarButton" variant="outline-secondary" onClick={() => handleSelect(1)}>Personalisation</Button>
        <Button className="tabbarButton" variant="outline-secondary" onClick={() => handleSelect(2)}>Specific Task</Button>
      </div>
      <Carousel  activeIndex={index2} onSelect={handleSelect2} interval={null} >
        <Carousel.Item >
          <div className='page1'>
            <div >
              <Button className="backbutton" variant="outline-light" size="lg" onClick={() => back(0)} >Back</Button>
            </div>

            <div className='CircularMenu'>
              <CircleMenu startAngle={-90} rotationAngle={360} itemSize={5} radius={8} className={""} onMenuToggle={blabla}
                rotationAngleInclusive={false}>

                <CircleMenuItem onClick={() => publishMessage("look,up")} tooltip="Up" className='boiexp' tooltipPlacement={TooltipPlacement.Right}>
                  <img className="icon" src="/up.png" alt="First slide"
                  />
                </CircleMenuItem>
                <CircleMenuItem onClick={() => publishMessage("look,right")} tooltip="Right">
                  <img className="icon" src="/right.png" alt="First slide" />
                </CircleMenuItem>
                <CircleMenuItem onClick={() => publishMessage("look,down")} tooltip="Down">
                  <img className="icon" src="/down.png" alt="First slide" />
                </CircleMenuItem>
                <CircleMenuItem onClick={() => publishMessage("look,left")} tooltip="Left">
                  <img className="icon" src="/left.png" alt="First slide" />
                </CircleMenuItem>
              </CircleMenu>
            </div>
            <Carousel.Caption>
              <h3>Common Task</h3>
            </Carousel.Caption>
            <h1 className="RightTitle">Play Motion</h1>
            <h1 className="LeftTitle">Look</h1>
            <div className="RightElement">
              <Button variant="light" size="lg" onClick={() => publishMessage("motion,show_left")} >Show Left</Button>
              <br></br>
              <br></br>
              <Button variant="light" size="lg" onClick={() => publishMessage("motion,nod")} >Nod</Button>
              <br></br>
              <br></br>
              <Button variant="light" size="lg" onClick={() => publishMessage("motion,bow")}>Bow</Button>
              <br></br>
              <br></br>
              <Button variant="light" size="lg" onClick={() => publishMessage("motion,dance")} >Dance</Button>
            </div>
          </div>

        </Carousel.Item>
        <Carousel.Item >
          <div className='page2'  >
            <div >
              <Button className="backbutton" variant="outline-light" size="lg" onClick={() => back(1)}  >Back</Button>
            </div>
            <div>
              <div className=''>

                <div className='ToggleGroup1' >
                  <label className='Togglecolor'>
                    <div style={{ width: "100px", height: "100px", backgroundColor: "red", borderRadius: "10%" }}></div>
                    <input type="radio" name="color" value="red" checked={selectedColor === "red"} onChange={handleColorChange} />

                  </label>
                  <label >
                    <div style={{ width: "100px", height: "100px", backgroundColor: "black", borderRadius: "10%" }}></div>
                    <input type="radio" name="color" value="black" checked={selectedColor === "black"} onChange={handleColorChange} />

                  </label>
                </div>

                <div className='ToggleGroup2' >

                  <label className='Togglecolor'>
                    <div style={{ width: "100px", height: "100px", backgroundColor: "blue", borderRadius: "10%" }}></div>
                    <input type="radio" name="color" value="blue" checked={selectedColor === "blue"} onChange={handleColorChange} />

                  </label>
                  <label >
                    <div style={{ width: "100px", height: "100px", backgroundColor: "green", borderRadius: "10%" }}></div>
                    <input type="radio" name="color" value="green" checked={selectedColor === "green"} onChange={handleColorChange} />

                  </label>
                </div>


              </div>
            </div>
            <h1 className="LeftTitle">Eye Color</h1>
            <h1 className="RightTitle">Set Voice</h1>
            <div className="RightElement">
              <Button variant="light" size="lg" onClick={() => publishMessage("voice")} >Voice 1</Button>
              <br></br>
              <br></br>
              <Button variant="light" size="lg" onClick={() => publishMessage("voice")} >Voice 2</Button>
              <br></br>
              <br></br>
              <Button variant="light" size="lg" onClick={() => publishMessage("voice")}>Voice 3</Button>
              <br></br>
              <br></br>
              <Button variant="light" size="lg" onClick={() => publishMessage("voice")} >Voice 4</Button>
            </div>
          </div>

          <Carousel.Caption>
            <h3>Personalisation</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
          <div className='page3'  >
            <div >
              <Button className="backbutton" variant="outline-light" size="lg" onClick={() => back(2)}  >Back</Button>
            </div>
          </div>

          <Carousel.Caption>
            <h3>Specific Task</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </div>
    {/* Main Page end */}

  </div>)
}

export default Slider;