import { contract, game_state_interface } from "./State";
import { contractDag } from "./contract_info";

let contract_hints : {[key in contract] : [string | undefined, string | undefined, string | undefined]}  = {
    'mine and computer' : ["We need more workers, 5 should be enough", "We are running low on money. If we have $5000, we can do something", undefined],
    "computer and research" : [undefined, "We want to trade with the research lab, but they're not funded enough. If they get a fund of more than $2000 per day, and we have $10000 or more, we can work something out", undefined], 
    "grant for technology" : [undefined, "If we produce enough chips, say 10, the research lab can apply for government grants and get more money every day. ", undefined],
    "mine and research" : ["We want to fund some research at the lab. To do so we'd need at least $15000+", undefined, undefined]
}
function contract_string(state : game_state_interface , company : number) : string{ 
    let exposed = contractDag.get_exposed_vertices(new Set((Object.keys(state.contracts) as contract[]).filter((x) => state.contracts[x] !== "not signed") ));
    for(var item of exposed){
        var hint = contract_hints[item][company];
        if(hint !== undefined){
            return hint;
        }
    }
    return "Everything is going well";
}

export default contract_string;