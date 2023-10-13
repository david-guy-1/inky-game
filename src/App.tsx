import { useEffect, useState , useRef} from 'react'
import './App.css'
import _, { set } from "lodash";
import "phaser";
import Options from './Options'



function App({state} : any) {
  const [update, setUpdate] = useState(false);
  return (
    <> 
    this is some text {JSON.stringify(state)}
    <button onClick={() => {state.status.push("abc");setUpdate(!update); }}>click me</button>
    </>
  )
}

export default App
