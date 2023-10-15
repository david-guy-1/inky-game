import { ReactElement } from 'react';
import { game_state_interface ,resources, contract} from './State';
import _ from 'lodash';
import { contract_dag, preambles, postambles, contract_costs, contract_conditions } from './contract_info';
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

function Contract({state, update, goSign} :{state :  game_state_interface, update: Function , goSign : Function}) {
    let valid_contracts = get_valid_contracts(state)
    return  <> 
    <div style={{"position":"absolute", "top" : 102, "left" : 156, "fontSize" : 20, "fontFamily":"Arial", "width": 500}}>
       {function(){
            var out : ReactElement[] = [];
            for(let contract_ of valid_contracts){
                out.push(<>{contract_} <span data-name={contract_} onClick={function(e){
                    var contract_name = e.currentTarget.getAttribute("data-name") as contract;
                    goSign(contract_name + "|" + preambles[contract_name] + "|" + postambles[contract_name]); 
                }} style={{"position":"absolute", "right": 0, "backgroundColor":"green","padding":10}}>Sign contract</span><br /><br /></>)
            }
            if(out.length === 0){
                return [<>There are no contracts available</>]
            }
            return out;
       }()}
       </div>
    </> 
}
export default Contract; 