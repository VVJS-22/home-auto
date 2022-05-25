import { Devices } from 'bolt-iot-wrapper'
import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'


function App() {
  const [instance, setInstance] = useState()

  const [devices] = useState([
    ["light","zero"],
    ["fan","one"],
    ["socket1","two"],
    ["socket2","three"],
    ["socket3","four"],
  ])

  useEffect(() => {
    Devices.add("BOLT13168254", "85167ba2-5b69-490a-a05c-586d959c7f5f")

    const instance = Devices.read("BOLT13168254", "85167ba2-5b69-490a-a05c-586d959c7f5f")

    setInstance(instance)
  }, [])

  return (
    <Box>
      <Header>RNPJ Controller</Header>
      <DeviceBox>
      {devices.map(([name, pin], index) => (
        <Device key={index}>
        <SubHeader>{name}</SubHeader>
        <Box
        style={{
          flexDirection: "row",
          marginLeft: "1rem",
          alignItems: "center",
        }}
        >
        <ButtonOn
        onClick={() => instance.Digital.write({
          pin: {pin},
          state: 'HIGH'
        })}>ON</ButtonOn>
        
        <ButtonOff
        onClick={() => instance.Digital.write({
          pin: {pin},
          state: 'LOW'
        })}>OFF</ButtonOff>
        </Box>
      </Device>
      ))}
      </DeviceBox>
    </Box>
  )
}

const Box = styled.section`
  display: flex;
  flex-direction: column;
`

const Header = styled.h1`
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: #889151;
  color: #e4e4e3
`

const SubHeader = styled.div`
  font-weight: 800;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  width: 50%;
  min-width: 50px;
`

const DeviceBox = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  justify-content: center;
  padding: 1rem;
`

const Device = styled.section`
  display: flex;
  justify-content: center;
`

const ButtonOn = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 50px;
  margin: 0.5rem 1rem;
  cursor: pointer;
  background-color: green;
  color: #fff;

  &:hover {
    background-color: #fff;
    color: green;
  }
`

const ButtonOff = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 50px;
  margin: 0.5rem 1rem;
  cursor: pointer;
  background-color: red;
  color: #fff;

  &:hover {
    background-color: #fff;
    color: red;
  }
`

export default App;
