import { useEffect, useState , useRef, useReducer} from 'react'
import _, { set } from "lodash";
import "phaser";
import Options from './Options'
import { game_state_interface ,ores, parts, researching} from './State';
import Computer from './Computer';
import Research from './Research';
import Mine from './Mine';

type location = "mine" | "computer" | "research" | "total"
// mutates state
function nextDay(state : game_state_interface){
  for(var item of ores){
    state.ores[item][0] += state['worker allocation']["mining"][item];
  }
  for(var item2 of parts) {
    state.parts[item2][1] += state['worker allocation']['computer building'][item2];
  }

}
function App({state} :{state :  game_state_interface}) {
  const [, forceUpdate] = useReducer((x) => !x, false);
  const [display, setDisplay] = useState<location>("total");

  return (
    <>    
        <button onClick={() => {setDisplay("total");}}>Return</button>        
        <button onClick={() => {setDisplay("mine");}}>Mining Camp</button>
        <button onClick={() => {setDisplay("computer");}}>Computer Factory</button>
        <button onClick={() => {setDisplay("research");}}>Research Laboratory</button>
        <br />
        {function(){
          if(display === "total"){ 
            return (
              <> 
              Current game state is  :  {JSON.stringify(state)}
              <br />
              <button onClick={() => {nextDay(state); forceUpdate()}}>Next Day</button>
              </>
            )
          }
          if(display === "computer"){
            return <Computer state={state} />
          }
          if(display === "mine"){
            return <Mine state={state} />
          }
          if(display === "research"){
            return <Research state={state} />
          }

        }()}
    </>
   
  )

}

export default App
