import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import "../App.css";
import { ToggleButton, ToggleButtonGroup, Form, Image, ButtonGroup } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

import {
  CircleMenu,
  CircleMenuItem,
  TooltipPlacement,
} from "react-circular-menu";
import { borderRadius } from '@mui/system';

function Ari() {

  const [language, setLanguage] = useState('german');

  const texts = {
    english: {
      commonTask: "Common Task",
      personalisation: "Personalisation",
      specificTask: "Specific Tasks",
      look: "Look",
      playMotion: "Play Motion",
      height: "Height",
      voice_male: "Voice (male): ",
      voice_famle: "Voice (female): ",
      eye_color: "Eye Color",

      showLeft: "Show Left",
      nod:"Nod",
      dance:"Dance",
      bow:"Bow",
      moveTheCube: "MOVE THE CUBE",
      pressSource: "Press Source Positon",
      pressDestination: "Press Destination Position",
      clearAll:"Clear All",
      connected: "Connected",
      disconnected:"Disconnected",
      pleaseWait:"Please Wait Robot is Moving"
    },
    german: {
      commonTask: "Funktionen",
      personalisation: "Personalisierung",
      specificTask: "Würfel",
      look: "Sehen",
      playMotion: "Bewegung",
      height: "Höhe",
      voice_male: "Stimme (männlich) :",
      voice_famle: "Stimme (weiblich) :",
      eye_color: "Augen Farbe",

      showLeft: "Links",
      nod:"Nicken",
      dance:"Tanzen",
      bow:"Verbeugen",
      moveTheCube: "Bewege den Würfel",
      pressSource: "Position wählen",
      pressDestination: "Position wählen",
      clearAll:"Aufräumen",
      connected: "Verbunden",
      disconnected:"Getrennt",
      pleaseWait:"Bitte warten, der Roboter bewegt sich"
    }
  };

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
    setActiveTab(selectedIndex);
   
  };

  const handleSelect2 = (selectedIndex2, e) => {
    setIndex2(selectedIndex2);
    setIndex(selectedIndex2);
    setActiveTab(selectedIndex2);
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
    refCarousel2.current.style.display = 'flex';
   // refCarousel.current.style.display = 'flex';
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

  const [activeTab, setActiveTab] = useState(0);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    if (tab === 0) {
      handleSelect(0);
    } else if (tab === 1) {
      handleSelect(1);
    } else if (tab === 2) {
      handleSelect(2);
    }
  }

  const handleToggle = () => {
    setLanguage(prevLanguage => (prevLanguage === 'german' ? 'english' : 'german'));
  };


  return (<div id="main" ref={refMain} className='AppLarge'>

    {/* Start Page start */}
    {/* <div id="carousel" className='carousel' ref={refCarousel} >
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

    </div> */}
    {/* Start Page end */}


    {/* Main Page start */}
    <div id="carousel2" className='carousel' ref={refCarousel2} >
      <div className="tabbar">
        {/* <Button className="tabbarButton" variant="outline-secondary" onClick={() => handleSelect(0)}>Common Task</Button>
        <Button className="tabbarButton" variant="outline-secondary" onClick={() => handleSelect(1)}>Personalisation</Button>
        <Button className="tabbarButton" variant="outline-secondary" onClick={() => handleSelect(2)}>Specific Task</Button> */}
            <Nav variant="tabs" className="justify-content-center">
      <Nav.Item>
        <Nav.Link
          eventKey={0}
          onClick={() => handleTabSelect(0)}
          active={activeTab === 0}
        >
          {texts[language].commonTask}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey={1}
          onClick={() => handleTabSelect(1)}
          active={activeTab === 1}
        >
          {texts[language].personalisation}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey={2}
          onClick={() => handleTabSelect(2)}
          active={activeTab === 2}
        >
          {texts[language].specificTask}
        </Nav.Link>
      </Nav.Item>
    </Nav>
      </div>
      <Carousel  activeIndex={index2} onSelect={handleSelect2} interval={null} >
        <Carousel.Item >
          <div className='page1'>
            {/* <div >
              <Button className="backbutton" variant="outline-light" size="lg" onClick={() => back(0)} >Back</Button>
            </div> */}

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
            {texts[language].commonTask}
            </Carousel.Caption>
            <h1 className="RightTitle">{texts[language].playMotion}</h1>
            <h1 className="LeftTitle">{texts[language].look}</h1>
            <div className="RightElement">
              <Button variant="light" size="lg" onClick={() => publishMessage("motion,show_left")} >{texts[language].showLeft}</Button>
              <br></br>
              <br></br>
              <Button variant="light" size="lg" onClick={() => publishMessage("motion,nod")} >{texts[language].nod}</Button>
              <br></br>
              <br></br>
              <Button variant="light" size="lg" onClick={() => publishMessage("motion,bow")}>{texts[language].bow}</Button>
              <br></br>
              <br></br>
              <Button variant="light" size="lg" onClick={() => publishMessage("motion,dance")} >{texts[language].dance}</Button>
            </div>
          </div>

        </Carousel.Item>
        <Carousel.Item >
          <div className='page2'  >
            {/* <div >
              <Button className="backbutton" variant="outline-light" size="lg" onClick={() => back(1)}  >Back</Button>
            </div> */}
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
            <h1 className="LeftTitle"> {texts[language].eye_color}</h1>
            <h1 className="RightTitle">{texts[language].voice}</h1>

            <div  className="toggle-switch-container">
              <Form.Check
              type="switch"
              id="toggle-switch"
              label={language === 'german' ? 'DE' : 'EN'}
              checked={language === 'german'}
              onChange={handleToggle}/>
             </div>
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
          {texts[language].personalisation}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
          <div className='page3'  >
            {/* <div >
              <Button className="backbutton" variant="outline-light" size="lg" onClick={() => back(2)}  >Back</Button>
            </div> */}
          </div>

          <Carousel.Caption>
          {texts[language].specificTask}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </div>
    {/* Main Page end */}

  </div>)
}

export default Ari;