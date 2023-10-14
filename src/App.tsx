import { useEffect, useState , useRef, useReducer} from 'react'
import _, { set } from "lodash";
import "phaser";
import Options from './Options'
import { game_state_interface ,resources, researching, contract} from './State';
import Computer from './ProducingCompany';
import Research from './Research';
import ProducingCompany from './ProducingCompany'
import Contract from './Contract';
import ContractSigning from './ContractSigning';
import React from 'react';

type location = "hunter" | "smith" | "explorer"  |"total" | "contract" | "signing"
// mutates state


function compute_wages(state : game_state_interface) : [[number, number, number],[number, number, number]] {
  // total workers each, total cost each
  var workers : [number, number, number] = state.workers;
  var costs : [number, number, number] = [0,0,0]
  for(var i = 0; i < 3; i ++ ){
    costs[i] = workers[i] * state['worker wages'][i];
  }
  return [workers, costs];
}
function nextDay(state : game_state_interface){
  // generate parts
  for(var item of resources){
    for(var i=0; i<3; i++){
      state.resources[item] += state['worker allocation']["building"][item];
    }
  }

  // pay wages
  var wages = compute_wages(state);
  for(var i=0; i<3; i++){
    state.money -= wages[1][i];
  }
  
}
function App({state} :{state :  game_state_interface}) {

  const [, forceUpdate] = useReducer((x) => !x, false);
  const [display, setDisplay] = useState<location>("total");
  const [contractData, goSign] = useState("");

  var wages = compute_wages(state); 
  return (
    <>    
        {display ===  "signing" ? null : <>
          <button onClick={() => {setDisplay("total");}}>Return</button>   <br />     
          <button onClick={() => {setDisplay("hunter");}}>Hunting Lodge </button>({wages[0][0]} workers, cost {wages[1][0]}/day) <br />
          <button onClick={() => {setDisplay("smith");}}>Blacksmithing Guild </button>({wages[0][1]} workers, cost {wages[1][1]}/day)  <br />
          <button onClick={() => {setDisplay("explorer");}}>Center of Research and Exploration</button> ({wages[0][2]} workers, cost {wages[1][2]}/day) <br />
          <button onClick={() => {setDisplay("contract");}}>Sign contracts</button> <br />
          <br />
        </>}
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
          if(display === "hunter"){
            return <ProducingCompany state={state} update={forceUpdate} index={0} tag={"Blacksmithing Guild"} allowed_stuff={["food", "wood", "magic feathers", "fire spirits", "ice crystals", "orbs of darkness", "phoenix eggs", "fairy dust", "dragon skin"]}/>
          }
          if(display === "smith"){
            return <ProducingCompany state={state}  update={forceUpdate}  index={10} tag={"Hunting Lodge"} allowed_stuff={["copper swords", "iron swords", "steel swords", "steel arrowheads", "ice swords", "fire swords", "holy swords", "frost bows", "arcane robes", "omni-enchanted words", "dragonhide armor"]}/>
          }
          if(display === "explorer"){
            return <Research state={state}  update={forceUpdate}/>
          }
          if(display === "contract"){
            return <Contract state={state}  update={forceUpdate} goSign={(s : string) => {goSign(s); setDisplay("signing") } }/>
          }
          if(display === "signing"){
            var contract : contract = contractData.split("|")[0] as contract
            var preamble = contractData.split("|")[1]
            var postamble = contractData.split("|")[2]
            return <ContractSigning state={state} update={setDisplay} preamble={preamble} postamble={postamble} contract={contract}/>
          }
        }()}
    </>
   
  )

}

export default App
