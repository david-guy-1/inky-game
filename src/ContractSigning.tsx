import { MouseEvent, ReactElement, useState } from 'react';
import { game_state_interface ,resources, resource_type, contract, main_contract_type} from './State';
import dag from './dag';
import _ from 'lodash';
import React from 'react';
import { contract_costs, main_contracts } from './contract_info';

function sign_contract(state : game_state_interface, contract : contract) : void {
    // side contract
    if(main_contracts.indexOf(contract as main_contract_type) === -1){
        state.contracts[contract] = "autocomplete";
    } else {
        state.contracts[contract] = "in progress";
    }
}

function ContractSigning({state, update, preamble, contract} :{state :  game_state_interface, update: Function , preamble : string, contract : contract}) {
    var [signed, setSigned] = useState(false);
    if(!signed){
        return  <>  Sign Contract : <br />
        {preamble} 
        <br /> 
        <button onClick={() => {sign_contract(state, contract), setSigned(true) }}>Sign</button><button onClick={()=>update("contract")}>Don't sign</button>
        </>
    } else {
        let costs = contract_costs[contract];
        for(var item of (Object.keys(costs.resources) as resource_type[])){
            state.resources[item] -= costs.resources[item] as number;
        }
        state.money -= costs.money;
        
        return <>  Sign Contract : <br />
        {preamble} 
        <br />
        {function(){
            if(main_contracts.indexOf(contract as main_contract_type) === -1){
                return <><br />This contract has been signed and will be completed by end of day. There is no quest associated with this contract.</>
            } else {

                return <><br />This contract has been signed. You must now complete this quest by assigning workers to it at the Center of Research and Exploration.</>
            }
        }()}
        <br />
        <button onClick={() => update("contract")}>Go back</button>
        </>
    }
}
export default ContractSigning; 