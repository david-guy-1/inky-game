import { useEffect, useState , useRef, useReducer, ReactElement} from 'react'
import _, { set } from "lodash";
import "phaser";
import Options from './Options'
import { game_state_interface ,resources, contract, main_contract_type} from './State';
import Computer from './ProducingCompany';
import Research from './Research';
import ProducingCompany from './ProducingCompany'
import Contract from './Contract';
import ContractSigning from './ContractSigning';
import React from 'react';
import contract_string from './contract_string';
import { contracts, main_contracts, postambles, quest_length } from './contract_info';

type location = "hunter" | "smith" | "explorer"  |"total" | "contract" | "signing" | "donequests"
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
function nextDay(state : game_state_interface) : contract[]{
  // generate parts
  for(var item of resources){
      state.resources[item] += state['worker allocation']["building"][item];
  }

  // pay wages
  var wages = compute_wages(state);
  for(var i=0; i<3; i++){
    state.money -= wages[1][i];
  }
  state.money += state['research grant'];
  // quest progress
  var done : contract[] = [];
  for(var cont of contracts){
    if(state.contracts[cont] === "autocomplete" ){
      state.contracts[cont] = 'complete';
      done.push(cont);
    }
    // if contract is a main contract, progress it
    if(main_contracts.indexOf(cont as main_contract_type) !== -1){
      state['quest progress'][cont] += state['worker allocation'].main_contract[cont as main_contract_type];
      if(state['quest progress'][cont] >= quest_length[cont] && state.contracts[cont] === "in progress" ){
        state.workers[2] -= state['worker allocation'].main_contract[cont as main_contract_type];
        state['worker allocation'].main_contract[cont as main_contract_type] = 0;
        done.push(cont)
        state.contracts[cont] = "complete"
      }
    }
  }

  return done;
}
function App({state} :{state :  game_state_interface}) {

  const [, forceUpdate] = useReducer((x) => !x, false);
  const [display, setDisplay] = useState<location>("total");
  const [contractData, goSign] = useState("");
  const [doneQuests, setDoneQuests] = useState<contract[]>([]);
  var wages = compute_wages(state); 
  if(display !== "donequests" && doneQuests.length !== 0){
    setDisplay("donequests");
  } else if (display === "donequests" && doneQuests.length === 0){
    setDisplay("total");
  } 
  return (
    <>    
        {display ===  "signing" || display === "donequests" ? null : <>
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
              {contract_string(state)}
              Current game state is  :  {JSON.stringify(state)}
              <br />
              Sell items
              <br/>
              {function(){
                  var lst: ReactElement[]  = [];
                  for(let item of resources){
                      lst.push(<> 
                          {item} : You have {state.resources[item]}, selling price is {state['selling prices'][item]}, {state.resources[item]> 0 ?   <button key={item}  onClick={() => {state.resources[item]-=1; state.money += state['selling prices'][item] ;forceUpdate() ; }}>Sell</button>: null} <br />
                      </>)
                  }
                  return lst; 
              }()}
        
              <button onClick={() => {setDoneQuests(nextDay(state)); forceUpdate()}}>Next Day</button>
              </>
            )
          }
          if(display === "donequests"){
              var quest = doneQuests[0];
              return <><img src={"quests/" + quest + ".png"} style={{"position":"absolute"}}/><div style={{"backgroundColor" : "white"}}>Task completed :  {quest}<br /> {postambles[quest]} <button onClick={() => { setDoneQuests(doneQuests.slice(0, doneQuests.length-1)) } }> Next</button></div></>
          }
          if(display === "hunter"){
            return <ProducingCompany state={state} update={forceUpdate} index={0} tag={"Blacksmithing Guild"} allowed_stuff={["food", "wood", "magic feathers", "fire spirits", "ice crystals", "orbs of darkness", "phoenix eggs", "fairy dust", "dragon skin"]}/>
          }
          if(display === "smith"){
            return <ProducingCompany state={state}  update={forceUpdate}  index={10} tag={"Hunting Lodge"} allowed_stuff={["copper swords", "iron swords", "steel swords", "steel arrowheads", "ice swords", "fire swords", "holy swords", "frost bows", "arcane robes", "omni-enchanted swords", "dragonhide armor"]}/>
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
            return <ContractSigning state={state} update={setDisplay} preamble={preamble}  contract={contract}/>
          }
        }()}
    </>
   
  )

}

export default App
