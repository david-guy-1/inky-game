import { useEffect, useState , useRef, useReducer} from 'react'
import _, { set } from "lodash";
import "phaser";
import Options from './Options'
import { game_state_interface ,resources, researching} from './State';
import Computer from './ProducingCompany';
import Research from './Research';
import ProducingCompany from './ProducingCompany';

type location = "mine" | "computer" | "research" | "total"
// mutates state


function compute_wages(state : game_state_interface) : [[number, number, number],[number, number, number]] {
  // total workers each, total cost each
  var workers : [number, number, number] = [0,0,0]
  var costs : [number, number, number] = [0,0,0]
  for(var i = 0; i < 3; i ++ ){
    workers[i] = _.sum(Object.values(state['worker allocation'].building).map((x) => x[i]));
    costs[i] = workers[i] * state['worker wages'][i];
  }
  return [workers, costs];
}
function nextDay(state : game_state_interface){
  // generate parts
  for(var item of resources){
    for(var i=0; i<3; i++){
      state.resources[item][i] += state['worker allocation']["building"][item][i];
    }
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
        <button onClick={() => {setDisplay("mine");}}>Mining Camp </button>({wages[0][0]} workers, cost {wages[1][0]}/day) <br />
        <button onClick={() => {setDisplay("computer");}}>Computer Factory </button>({wages[0][1]} workers, cost {wages[1][1]}/day)  <br />
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
            return <ProducingCompany state={state} update={forceUpdate} index={1} tag={"Computer Factory"} allowed_stuff={["circuits", "chips", "transistors"]}/>
          }
          if(display === "mine"){
            return <ProducingCompany state={state}  update={forceUpdate}  index={0} tag={"Mining Camp"} allowed_stuff={["iron", "steel"]}/>
          }
          if(display === "research"){
            return <Research state={state}  update={forceUpdate}/>
          }

        }()}
    </>
   
  )

}

export default App
