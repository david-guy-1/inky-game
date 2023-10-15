import { MouseEvent, ReactElement } from 'react';
import { game_state_interface ,resources, resource_type, contract} from './State';
import dag from './dag';
import _ from 'lodash';
import { contract_dag, contracts, preambles, postambles, main_contracts, contract_costs, contract_conditions } from './contract_info';
import React from 'react';
let names = ["Hunting Lodge", "Blacksmithing Guild", "Center of Research and Exploration"]

function check_costs(state : game_state_interface, contract : contract) : boolean {
    var cost = contract_costs[contract];
    if(state.money < cost.money) {
        return false;
    }
    for(var resource of resources){
        if(cost["resources"][resource] !== undefined && state.resources[resource] < (cost["resources"][resource] as number)){
            return false;
        }
    }
    return true;

}
function get_valid_contracts(state : game_state_interface) : contract[]{
    let out : contract[] = [];
    let already_signed : contract[] = (Object.keys(state.contracts) as contract[]).filter((x) => state.contracts[x] !== "not signed" );
    let candidates : Set<contract> = contract_dag.get_exposed_vertices(new Set(already_signed));
    for(let contract  of candidates){
        // check already signed
        if(state.contracts[contract] !== "not signed"){
            continue
        }
        // check costs
        if(!check_costs(state, contract)){
            continue;
        }
        // check functional prerequisite
        if(contract_conditions[contract](state) === false){
            continue;
        }
        out.push(contract);
    }
    return out;
}

function Contract({state, update, goSign} :{state :  game_state_interface, update: Function , goSign : Function}) {
    let valid_contracts = get_valid_contracts(state)
    return  <> Sign Contracts <br /> 
       {function(){
            var out : ReactElement[] = [];
            for(let contract_ of valid_contracts){
                out.push(<>{contract_} <button name={contract_} onClick={function(e){
                    var contract_name = e.currentTarget.getAttribute("name") as contract;
                    goSign(contract_name + "|" + preambles[contract_name] + "|" + postambles[contract_name]); 
                }}>Sign contract</button><br /></>)
            }
            return out;
       }()}
    </> 
}
export default Contract; 