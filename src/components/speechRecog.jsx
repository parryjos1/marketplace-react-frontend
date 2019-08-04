'use strict'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

//-----------------SPEECH RECOGNITION SETUP---------------------

const SpeechRecognition = window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

//------------------------COMPONENT-----------------------------

class Speech extends Component {

  constructor() {
    super()
    this.state = {
      listening: false,
      speech: ''
    }
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
  }

  componentDidMount(){
    this.voiceCommands()
  }

  toggleListen() {
    this.setState({
      listening: !this.state.listening
    }, this.handleListen)
  }

  handleListen(){
    // handle speech recognition here
    if (this.state.listening) recognition.start()

   let finalTranscript = ''
   recognition.onresult = event => {
     let interimTranscript = ''

     for (let i = event.resultIndex; i < event.results.length; i++) {
       const transcript = event.results[i][0].transcript;
       if (event.results[i].isFinal) finalTranscript += transcript + ' ';
       else interimTranscript += transcript;
     }
     document.getElementById('interim').innerHTML = interimTranscript
     document.getElementById('final').innerHTML = finalTranscript

     // console.log('Final transcript, ', finalTranscript);
     this.setState({speech: finalTranscript})
     this.voiceCommands()

    }

  }

  voiceCommands(){
    let command = this.state.speech
    let compareCommand = command.trim()
    const firstCommandment = "take me to home page"
    console.log(`The first commandment is ${firstCommandment}`);
    if (compareCommand == firstCommandment ) {
      console.log('we have a match!');
      this.props.history.push('/');


    } else {
      console.log('no bueno');
    }
  }

  render() {
    return (
      <div style={container}>
        <button id='microphone-btn' style={button} onClick={this.toggleListen} />
        <div id='interim' style={interim}></div>
        <div id='final' style={final}></div>
      </div>
    )
  }
}

export default Speech


//-------------------------CSS------------------------------------

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  button: {
    width: '60px',
    height: '60px',
    background: 'lightblue',
    borderRadius: '50%',
    margin: '6em 0 2em 0'
  },
  interim: {
    color: 'gray',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px'
  },
  final: {
    color: 'black',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px'
  }
}

const { container, button, interim, final } = styles

// import React, { Component } from "react";
//
// import { ReactMic } from 'react-mic';
//
// export class Example extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       record: false
//     }
//
//   }
//
//   startRecording = () => {
//     this.setState({
//       record: true
//     });
//   }
//
//   stopRecording = () => {
//     this.setState({
//       record: false
//     });
//   }
//
//   onData(recordedBlob) {
//     console.log('chunk of real-time data is: ', recordedBlob);
//   }
//
//   onStop(recordedBlob) {
//     console.log('recordedBlob is: ', recordedBlob);
//   }
//
//   render() {
//     return (
//       <div>
//         <ReactMic
//           record={this.state.record}
//           className="sound-wave"
//           onStop={this.onStop}
//           onData={this.onData}
//           strokeColor="#000000"
//           backgroundColor="#FF4081" />
//         <button onTouchTap={this.startRecording} type="button">Start</button>
//         <button onTouchTap={this.stopRecording} type="button">Stop</button>
//       </div>
//     );
//   }
// }
//
// export default Example
//
//
//
//
// // import PropTypes from "prop-types";
// // import SpeechRecognition from "react-speech-recognition";
// //
// // const propTypes = {
// //   // Props injected by SpeechRecognition
// //   transcript: PropTypes.string,
// //   resetTranscript: PropTypes.func,
// //   browserSupportsSpeechRecognition: PropTypes.bool
// // };
// //
// // const Dictaphone = ({
// //   transcript,
// //   resetTranscript,
// //   browserSupportsSpeechRecognition
// // }) => {
// //   if (!browserSupportsSpeechRecognition) {
// //     return null;
// //   }
// //
// //   return (
// //     <div>
// //       <button onClick={resetTranscript}>Reset</button>
// //       <span>{transcript}</span>
// //     </div>
// //   );
// // };
// //
// // Dictaphone.propTypes = propTypes;
// //
// // export default SpeechRecognition(Dictaphone);
//
//
//
//
// // import React, { Component } from 'react';
// //
// // import PropTypes from "prop-types";
// // import SpeechRecognition from "react-speech-recognition";
// //
// //
// //
// // class Speech extends Component {
// //
// //   const propTypes = {
// //     // Props injected by SpeechRecognition
// //     transcript: PropTypes.string,
// //     resetTranscript: PropTypes.func,
// //     browserSupportsSpeechRecognition: PropTypes.bool
// //   };
// //
// //   const Dictaphone = ({
// //     transcript,
// //     resetTranscript,
// //     browserSupportsSpeechRecognition
// //   }) => {
// //     if (!browserSupportsSpeechRecognition) {
// //       return null;
// //     }
// //
// //   render(){
// //
// //     return(
// //       <div>
// //         <h3>Welcome to the speech </h3>
// //           <div>
// //        <button onClick={resetTranscript}>Reset</button>
// //        <span>{transcript}</span>
// //      </div>
// //       </div>
// //     )
// //   }
// // }
// //
// // export default Speech
