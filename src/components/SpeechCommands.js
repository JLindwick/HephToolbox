import React,
{
  Component
}
from 'react'
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition'
import './SpeechCommands.css';
import io from 'socket.io-client';
const socket = io('https://fusionpaloalto.elliotsyoung.com');
const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class Dictaphone extends Component
{

  constructor(props)
  {
    super(props);
    this.sendToChatBox = this.sendToChatBox.bind(this);
    this.state = {
      currentHeadPosition: 0
    }
    socket.emit("subscribe",
    {
      room: "pi-client"
    });
    setInterval(() =>
    {
      if (this.props.interimTranscript === "")
      {
        this.props.resetTranscript();
      }
    }, 9000);

  }


  componentDidUpdate()
  {
    this.checkForCommands();
  }
  moveRobotHead()
  {
    let rotationValues = [0, 30, 60, 90, 120, 150, 180];
    rotationValues.splice(rotationValues.indexOf(this.state.currentHeadPosition), 1);
    const newHeadPosition = rotationValues[Math.floor(Math.random() * rotationValues.length)];
    socket.emit("to room",
    {
      room: "pi-client",
      type: "rotate head",
      data: newHeadPosition
    });
    this.setState(
    {
      currentHeadPosition: newHeadPosition
    });
  }
  checkForCommands()
  {
    if (this.props.transcript.indexOf("bb-8") !== -1 || this.props.transcript.indexOf("PBA") !== -1 || this.props.transcript.indexOf("bb 8") !== -1 || this.props.transcript.indexOf("BBA") !== -1 || this.props.transcript.indexOf("BPA") !== -1 || this.props.transcript.indexOf("bb8") !== -1)
    {
      console.log("You said bb-8!");
      socket.emit("to room",
      {
        room: "pi-client",
        type: "robot speak command",
        data: "Hello there!"
      })
      this.moveRobotHead();
      this.props.resetTranscript();
    }
    else if (this.props.transcript.indexOf("introduce yourself") !== -1)
    {
      socket.emit("to room",
      {
        room: "pi-client",
        type: "robot speak command",
        data: "Hello there! My name is BB8 and I'm the teaching assistant for this classroom. Elliot has programmed me to assist in his lessons!"
      });
      this.moveRobotHead();
      this.props.resetTranscript();
    }
    else if (this.props.transcript.indexOf("take a break") !== -1)
    {
      socket.emit("to room",
      {
        room: "pi-client",
        type: "robot speak command",
        data: "Okay! I'll take a nap!"
      })
      this.props.resetTranscript();
      this.props.stopListening();
    }
    else if (this.props.transcript.indexOf("look at me") !== -1)
    {
      socket.emit("to room",
      {
        room: "pi-client",
        type: "robot speak command",
        data: "I'm looking at you, Elliot."
      });
      socket.emit("to room",
      {
        room: "pi-client",
        type: "rotate head",
        data: 0
      });
      this.props.resetTranscript();
    }
  }
  sendToChatBox(event)
  {
    console.log(this.props.finalTranscript);
    event.preventDefault();

    socket.emit("to room",
    {
      room: "pi-client",
      type: "robot speak command",
      data: this.props.finalTranscript
    });

    this.moveRobotHead();
  }
  render()
  {
    const
    {
      transcript,
      resetTranscript,
      browserSupportsSpeechRecognition,
      finalTranscript
    } = this.props;
    if (!browserSupportsSpeechRecognition)
    {
      return null
    }
    return (
      <div className="chatSettings">
        <button onClick={resetTranscript}>Reset</button>
        <span>{transcript}</span>
        <br/>
        <h2>{finalTranscript}</h2>
        <button onClick={this.sendToChatBox}>Send</button>
      </div>
    )
  }
}

Dictaphone.propTypes = propTypes

export default SpeechRecognition(Dictaphone)
