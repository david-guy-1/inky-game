import { contract, game_state_interface , resource_type} from "./State";
import { contract_dag, contract_costs, main_contracts } from "./contract_info";

let contract_hints : {[key in contract] : string}  = {
    "explore land in the north": "",
    "clear out copper mine": "",
    "explore land in the south": "",
    "clear out iron mine": "",
    "explore land in the east": "",
    "clear out coal mine": "",
    "explore land in the west": "",
    "research steelmaking": "",
    "research fletching": "",
    "explore magma cave": "",
    "research elemental enchantments": "",
    "explore ice cave": "",
    "research holy enchantment": "",
    "open a portal to the land of the dead": "",
    "research fairy manipulation": "",
    "research advanced enchantment techniques": "",
    "explore mapped region": "",
    "research dragonhide crafting": "",
    "research dragon anatomy": "",
    "kill dragon": "",
    "grow kingdom": "",
    "make deal with witches": "",
    "make deal with angels": "",
    "deal with famine": "",
    "fend off invaders": "",
    "fend off magic invaders": ""
}
function contract_string(state : game_state_interface) : string{ 
    let exposed = contract_dag.get_exposed_vertices(new Set((Object.keys(state.contracts) as contract[]).filter((x) => state.contracts[x] !== "not signed") ));
    for(let item of exposed){
        // don't hint for main contracts
        if(main_contracts.indexOf(item) === -1){
            continue; 
        }
        let hint = contract_hints[item];
        hint += "This will require " 
        let cost = contract_costs[item];

        for(let res  in Object.keys(cost.resources)){
            let costN = cost.resources[res as resource_type] 
            if(costN !== undefined){
                hint += costN.toString() + " " + res + ","
            }
        } 
        if(cost.money !== 0){
            hint += " and " + cost.money.toString() + " gold."
        } else { 
            hint += " and no gold."
        }
        return hint;
    }
    return "Everything is going well";
}

export default contract_string;