import { MouseEvent, ReactElement, useState } from 'react';
import { game_state_interface ,resources, resource_type, contract, main_contract_type} from './State';
import dag from './dag';
import _ from 'lodash';
import React from 'react';
import { contract_costs, main_contracts } from './contract_info';

function sign_contract(state : game_state_interface, contract : contract) : void {
    // non-main contracts are autocompleted
    if(main_contracts.indexOf(contract as main_contract_type) === -1){
        state.contracts[contract] = "autocomplete";
    } else {
        state.contracts[contract] = "in progress";
    }
}

function ContractSigning({state, update, preamble, contract} :{state :  game_state_interface, update: Function , preamble : string, contract : contract}) {
    var [signed, setSigned] = useState(false);
    if(!signed){
        return  <>  <div style={{"position": "absolute", "top":315, "left":142, "width":331 }}>Sign Contract : <br />
        {preamble} 
        </div>
        <br /> 
        <div style={{"position": "absolute", "top":450, "left":209, "width":331 }}>
        <div style={{"position": "absolute", "top":0, left:0, "backgroundColor":"green", "padding":10}} onClick={() => {sign_contract(state, contract), setSigned(true) }}>Sign</div><div style={{"position": "absolute", "top":0, right:0, "backgroundColor":"red","padding":10}} onClick={()=>update("contract")}>Don't sign</div>
        </div>
        
        </>
    } else {
        let costs = contract_costs[contract];
        for(var item of (Object.keys(costs.resources) as resource_type[])){
            state.resources[item] -= costs.resources[item] as number;
        }
        state.money -= costs.money;
        
        return  <>  <div style={{"position": "absolute", "top":315, "left":142, "width":331 }}>Sign Contract : <br />
        {preamble} 
        </div>
        <br /> 
        <div style={{"position": "absolute", "top":450, "left":209, "width":331 }}>
        {function(){
            if(main_contracts.indexOf(contract as main_contract_type) === -1){
                return <>This contract has been signed and will be completed by end of day. There is no quest associated with this contract.</>
            } else {

                return <>This contract has been signed. You must now complete this quest by assigning workers to it at the Center of Research and Exploration.</>
            }
        }()}
        <div onClick={() => update("contract")} style={{"padding":10, "backgroundColor":"yellowgreen"}}>Go back</div>
        </div>
        
        </>
        
    }
}
export default ContractSigning; 