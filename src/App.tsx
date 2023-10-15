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
  state.day += 1;
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

        {function(){
          if(display === "donequests"){
            var quest = doneQuests[0];
            return  <div>Task completed :  {quest}<br /><span style={{"width" : "700px", display: "inline-block"}}> {postambles[quest]} </span><img src={"top bar/next.png"} style={{position:"absolute", "top" : "0px", "left":"720px"}} onClick={() => { setDoneQuests(doneQuests.slice(0, doneQuests.length-1)) } } /></div>
          }
        }()}
        {display ===  "signing" || display === "donequests" ? null : <>
          <div style={{"position" : "absolute", top:"0px", left:"0px" }}>
          <img src={"top bar/base.png"}  style={{position:"absolute", "top" : "0px", "left":"0px"}}/>
          
          <img src={"top bar/back.png"}  style={{position:"absolute", "top" : "0px", "left":"0px"}} onClick={() => {setDisplay("total");}}/>
          <img src={"top bar/blacksmithing.png"}  style={{position:"absolute", "top" : "0px", "left":"100px"}} onClick={() => {setDisplay("smith");}}/>
          
          <img src={"top bar/hunt.png"}  style={{position:"absolute", "top" : "0px", "left":"200px"}} onClick={() => {setDisplay("hunter");}} />
          <img src={"top bar/research.png"}  style={{position:"absolute", "top" : "0px", "left":"300px"}}  onClick={() => {setDisplay("explorer");}}/>
          <img src={"top bar/contract.png"}  style={{position:"absolute", "top" : "0px", "left":"400px"}} onClick={() => {setDisplay("contract");}}/>
          </div>
        </>}
        <div style={{"position" : "absolute", top:"80px", left:"0px", "width":"800px" }}>
        {function(){
          if(display === "total"){ 
            return (
              <> 
              <img src={"backgrounds/base.png"}  style={{position:"absolute", "top" : "0px", "left":"0px", "zIndex" : -1}}/>
              <div style={{"position" : "absolute", "top" : "80px", "left":"150px"}}>
              {contract_string(state)}
              </div>


              <div style={{"position" : "absolute", "top" : "104px", "left":"134px", "width":"558px"}}>
                {/* 134-692, 129-500 , w558, h371*/}
                <div style={{"position" : "absolute", "top" : "0px", "left":"0px"}}>
                {state.money} gold ({state['research grant']}/day)
                </div>
                <div style={{"position" : "absolute", "top" : "0px", "left":"250px"}}>
                You have
                </div>

                <div style={{"position" : "absolute", "top" : "0px", "left":"350px"}}>
                Sell price
                </div>

                <div style={{"position" : "absolute", "top" : "0px", "left":"450px"}}>
                Day {state.day}
                </div>
                {function(){
                    var lst: ReactElement[]  = [];
                    var i = -1;
                    for(let item of resources){
                        i+=1;
                        lst.push(<>
                          <div style={{"position" : "absolute", top: 19*i+25 + "px"}}>
                            <span style={{"position" : "absolute", left  : "0px", width:"190px"}}>{item}</span>
                            <span style={{"position" : "absolute", left  : "250px"}}>{state.resources[item]} </span>
                            <span style={{"position" : "absolute", left  : "350px"}}>{state['selling prices'][item]} </span>
                            
                            <span style={{"position" : "absolute", left  : "450px"}}>{state.resources[item]> 0 ?   <img src="backgrounds/sell.png" key={item}  onClick={() => {state.resources[item]-=1; state.money += state['selling prices'][item] ;forceUpdate() ; }} />: null} 
                            </span>
                            </div> 
                        </>)
                    }
                    return lst; 
                }()}
              </div>
              <img src="backgrounds/next day.png" style={{"position" : "absolute", left  : "285px", top:"526px"}} onClick={() => {setDoneQuests(nextDay(state)); forceUpdate()}} />
              </>
            )
          }
          if(display === "donequests"){
              var quest = doneQuests[0];
              return <><img src={"quests/" + quest + ".png"}/></>
          }
          if(display === "hunter"){
            return <ProducingCompany state={state} update={forceUpdate} index={0} tag={"Hunting Lodge"} allowed_stuff={["food", "wood", "magic feathers", "fire spirits", "ice crystals", "orbs of darkness", "phoenix eggs", "fairy dust", "dragon skin"]}/>
          }
          if(display === "smith"){
            return <ProducingCompany state={state}  update={forceUpdate}  index={1} tag={"Blacksmithing Guild"} allowed_stuff={["copper swords", "iron swords", "steel swords", "steel arrowheads", "ice swords", "fire swords", "holy swords", "frost bows", "arcane robes", "omni-enchanted swords", "dragonhide armor"]}/>
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
        </div>
    </>
   
  )

}

export default App
