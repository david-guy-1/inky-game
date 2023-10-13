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


function compute_wages(state : game_state_interface) : [[number, number, number],[number, number, number]] {
  // total workers each, total cost each
  var miners = _.sum(Object.values(state['worker allocation'].mining))
  var computer_builders = _.sum(Object.values(state['worker allocation']['computer building']))
  var researchers= _.sum(Object.values(state['worker allocation'].researching));
  var money : [number, number, number] = [0,0,0]
  money[0]  = miners * state['worker wages'][0];
  money[1] = computer_builders * state['worker wages'][1];
  money[2] = researchers * state['worker wages'][2];
  return [[miners, computer_builders, researchers], money];
}
function nextDay(state : game_state_interface){
  // generate parts
  for(var item of ores){
    state.ores[item][0] += state['worker allocation']["mining"][item];
  }
  for(var item2 of parts) {
    state.parts[item2][1] += state['worker allocation']['computer building'][item2];
  }
  // pay wages
  var wages = compute_wages(state);
  for(var i=0; i<3; i++){
    state.money[i] -= wages[1][i];
  }
  
}
function App({state} :{state :  game_state_interface}) {
  const [, forceUpdate] = useReducer((x) => !x, false);
  const [display, setDisplay] = useState<location>("total");
  var wages = compute_wages(state); 
  return (
    <>    
        <button onClick={() => {setDisplay("total");}}>Return</button>   <br />     
        <button onClick={() => {setDisplay("mine");}}>Mining Camp </button>({wages[0][0]} workers, cost {wages[1][0]}) <br />
        <button onClick={() => {setDisplay("computer");}}>Computer Factory </button>({wages[0][1]} workers, cost {wages[1][1]})  <br />
        <button onClick={() => {setDisplay("research");}}>Research Laboratory</button> ({wages[0][2]} workers, cost {wages[1][2]}) <br />
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
            return <Computer state={state} update={forceUpdate}/>
          }
          if(display === "mine"){
            return <Mine state={state}  update={forceUpdate}/>
          }
          if(display === "research"){
            return <Research state={state}  update={forceUpdate}/>
          }

        }()}
    </>
   
  )

}

export default App
