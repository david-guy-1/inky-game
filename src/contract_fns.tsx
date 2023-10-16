import { game_state_interface, resources, contract } from "./State";
import { contract_costs, contract_dag, contract_conditions } from "./contract_info";

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
    let already_signed : contract[] = (Object.keys(state.contracts) as contract[]).filter((x) => state.contracts[x] === "complete" );
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
export {check_costs, get_valid_contracts}