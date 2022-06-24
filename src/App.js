// import { Devices } from 'bolt-iot-wrapper'
import { useEffect, useState } from 'react'
// import styled from 'styled-components/macro'
import * as React from 'react';
import {Stack, Box, AppBar, Typography, Paper} from '@mui/material';
import Item from './components/Item';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const App = () => {

  const [status, setStatus] = useState("Device is Offline")


  useEffect(() => {
    try {
      axios.get(`https://cloud.boltiot.com/remote/85167ba2-5b69-490a-a05c-586d959c7f5f/isAlive?&deviceName=BOLT13168254`)
        .then(res => {
          setStatus(res.data.value)
        })
        .catch(error => {
          throw new Error(error.message)
        })
    } catch(error) {
      alert(JSON.stringify(error.message))
    }
  }, [])

  const [onFanLoading, setOnFanLoading] = useState(false)
  const [offFanLoading, setOffFanLoading] = useState(false)
  const [fanStatus, setFanStatus] = useState(0)
  const [fanOn, setFanOn] = useState(false)

  const [onLightLoading, setOnLightLoading] = useState(false)
  const [offLightLoading, setOffLightLoading] = useState(false)
  const [lightStatus, setLightStatus] = useState(0)
  const [lightOn, setLightOn] = useState(false)

  const [onS1Loading, setOnS1Loading] = useState(false)
  const [offS1Loading, setOffS1Loading] = useState(false)
  const [s1Status, setS1Status] = useState(0)
  const [s1On, setS1On] = useState(false)

  const [onS2Loading, setOnS2Loading] = useState(false)
  const [offS2Loading, setOffS2Loading] = useState(false)
  const [s2Status, setS2Status] = useState(0)
  const [s2On, setS2On] = useState(false)

  const [onS3Loading, setOnS3Loading] = useState(false)
  const [offS3Loading, setOffS3Loading] = useState(false)
  const [s3Status, setS3Status] = useState(0)
  const [s3On, setS3On] = useState(false)


  const switchDevice = (pin, state, setStatus, setLoading, onStatus, setOn) => {
    setLoading(true)
    try {
      axios.get(`https://cloud.boltiot.com/remote/85167ba2-5b69-490a-a05c-586d959c7f5f/digitalWrite?pin=${pin}&state=${state}&deviceName=BOLT13168254`)
        .then(res => {
          setStatus(res.data.success)
          onStatus ? setOn(true) : setOn(false)
          setLoading(false)
        })
        .catch(error => {
          throw new Error(error.message)
        })
    } catch (error) {
      alert(JSON.stringify(error.message))
      onStatus ? setOn(true) : setOn(false)
      setLoading(false)
    }
  }

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript.toLowerCase() == "fan on") {
      switchDevice(0, 'LOW',setFanStatus, setOffFanLoading, false, setFanOn)
    }
    if (transcript.toLowerCase() == "fan off") {
      switchDevice(0, 'HIGH', setFanStatus, setOnFanLoading, true, setFanOn)
    }
    if (transcript.toLowerCase() == "lights on") {
      switchDevice(1, 'LOW',setLightStatus, setOffLightLoading, false, setLightOn)
    }
    if (transcript.toLowerCase() == "lights off") {
      switchDevice(1, 'HIGH', setLightStatus, setOnLightLoading, true, setLightOn);
    }
    if (transcript.toLowerCase() == "socket 1 on") {
      switchDevice(2, 'LOW',setS1Status, setOffS1Loading, false, setS1On)
    }
    if (transcript.toLowerCase() == "socket 1 off") {
      switchDevice(2, 'HIGH', setS1Status, setOnS1Loading, true, setS1On)
    }
    if (transcript.toLowerCase() == "socket 2 on") {
      switchDevice(3, 'LOW',setS2Status, setOffS2Loading, false, setS2On)
    }
    if (transcript.toLowerCase() == "socket 2 off") {
      switchDevice(3, 'HIGH', setS2Status, setOnS2Loading, true, setS2On);
    }
    if (transcript.toLowerCase() == "socket 3 on") {
      switchDevice(4, 'LOW',setS3Status, setOffS3Loading, false, setS3On)
    }
    if (transcript.toLowerCase() == "socket 3 off") {
      switchDevice(4, 'HIGH', setS3Status, setOnS3Loading, true, setS3On)
    }
  }, [transcript])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Box>
      <AppBar position='static'>
        <Typography sx={{
          textAlign: 'center'
        }} variant='h3'>Smart Home</Typography>
      </AppBar>
      <Stack spacing={2} mt={3} sx={{
        alignItems: 'center'
      }}>
        <Paper>
          <Typography
          sx={{
            padding: '0.5rem 1rem',
            textTransform: 'capitalize'
          }}
          variant='h6' color='secondary'>{status}</Typography>
        </Paper>
        <Paper direction="row"
        sx={{
          borderRadius: '1rem',
          width: '90%'
        }}
        >
         <Item name="Fan" 
          loadingOn={onFanLoading}
          loadingOff={offFanLoading}
          funcOn={() => switchDevice(0, 'HIGH', setFanStatus, setOnFanLoading, true, setFanOn)}
          funcOff={() => switchDevice(0, 'LOW',setFanStatus, setOffFanLoading, false, setFanOn)}
          loadStatus={fanStatus}
          on={fanOn}
         />
         <Item name="Light" 
         loadingOn={onLightLoading}
         loadingOff={offLightLoading}
         funcOn={() => switchDevice(1, 'HIGH', setLightStatus, setOnLightLoading, true, setLightOn)}
         funcOff={() => switchDevice(1, 'LOW',setLightStatus, setOffLightLoading, false, setLightOn)}
         loadStatus={lightStatus}
         on={lightOn}
         />
         <Item name="Socket1" 
         loadingOn={onS1Loading}
         loadingOff={offS1Loading}
         funcOn={() => switchDevice(2, 'HIGH', setS1Status, setOnS1Loading, true, setS1On)}
         funcOff={() => switchDevice(2, 'LOW',setS1Status, setOffS1Loading, false, setS1On)}
         loadStatus={s1Status}
         on={s1On}
         
         />
         <Item name="Socket2" 
         loadingOn={onS2Loading}
         loadingOff={offS2Loading}
         funcOn={() => switchDevice(3, 'HIGH', setS2Status, setOnS2Loading, true, setS2On)}
         funcOff={() => switchDevice(3, 'LOW',setS2Status, setOffS2Loading, false, setS2On)}
         loadStatus={s2Status}
         on={s2On}
         />
         <Item name="Socket3" 
         loadingOn={onS3Loading}
         loadingOff={offS3Loading}
         funcOn={() => switchDevice(4, 'HIGH', setS3Status, setOnS3Loading, true, setS3On)}
         funcOff={() => switchDevice(4, 'LOW',setS3Status, setOffS3Loading, false, setS3On)}
         loadStatus={s3Status}
         on={s3On}
         />
        </Paper>
      </Stack>
      <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
    </Box>
  )
}



// function App() {
//   const [instance, setInstance] = useState()

//   const [devices] = useState([
//     ["light","0"],
//     ["fan","one"],
//     ["socket1","two"],
//     ["socket2","three"],
//     ["socket3","four"],
//   ])

//   useEffect(() => {
//     Devices.add("BOLT13168254", "85167ba2-5b69-490a-a05c-586d959c7f5f")

//     const instance = Devices.read("BOLT13168254", "85167ba2-5b69-490a-a05c-586d959c7f5f")

//     setInstance(instance)
//   }, [])

//   return (
//     <Box>
//       <Header>RNPJ Controller</Header>
//       <DeviceBox>
//         <Device>
//         <SubHeader>Light</SubHeader>
//         <Box
//         style={{
//           flexDirection: "row",
//           marginLeft: "1rem",
//           alignItems: "center",
//         }}
//         >
//         <ButtonOn
//         onClick={() => instance.Digital.write({
//           pin: 0,
//           state: 'HIGH'
//         })}>ON</ButtonOn>
        
//         <ButtonOff
//         onClick={() => instance.Digital.write({
//           pin: 0,
//           state: 'LOW'
//         })}>OFF</ButtonOff>
//         </Box>
//       </Device>
//       </DeviceBox>
//     </Box>
//   )
// }

// const Box = styled.section`
//   display: flex;
//   flex-direction: column;
// `

// const Header = styled.h1`
//   display: flex;
//   justify-content: center;
//   padding: 0.5rem 1rem;
//   background: #889151;
//   color: #e4e4e3
// `

// const SubHeader = styled.div`
//   font-weight: 800;
//   font-size: 1.25rem;
//   display: flex;
//   align-items: center;
//   text-transform: capitalize;
//   width: 50%;
//   min-width: 50px;
// `

// const DeviceBox = styled.section`
//   display: flex;
//   flex-direction: column;
//   height: calc(100vh - 50px);
//   justify-content: center;
//   padding: 1rem;
// `

// const Device = styled.section`
//   display: flex;
//   justify-content: center;
// `

// const ButtonOn = styled.button`
//   padding: 0.5rem 1rem;
//   border-radius: 50px;
//   margin: 0.5rem 1rem;
//   cursor: pointer;
//   background-color: green;
//   color: #fff;

//   &:hover {
//     background-color: #fff;
//     color: green;
//   }
// `

// const ButtonOff = styled.button`
//   padding: 0.5rem 1rem;
//   border-radius: 50px;
//   margin: 0.5rem 1rem;
//   cursor: pointer;
//   background-color: red;
//   color: #fff;

//   &:hover {
//     background-color: #fff;
//     color: red;
//   }
// `

export default App;
