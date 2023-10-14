import { MouseEvent, ReactElement } from 'react';
import { game_state_interface ,resources, researching, resource_type, contract} from './State';
import dag from './dag';
import _ from 'lodash';
import { contractDag, contracts, preambles, postambles } from './contract_info';
let names = ["Mining Camp", "Computer Factory", "Research Laboratory"]


function get_valid_contracts(state : game_state_interface) : contract[]{
    let out : contract[] = [];
    let already_signed : contract[] = (Object.keys(state.contracts) as contract[]).filter((x) => state.contracts[x] !== "not signed" );
    let candidates : Set<contract> = contractDag.get_exposed_vertices(new Set(already_signed));
    for(let contract  of candidates){
        // check already signed
        if(state.contracts[contract] !== "not signed"){
            continue
        }
        // check functional prerequisite
        if(contracts[contract](state) === false){
            continue;
        }
        out.push(contract);
    }
    return out;
}
function sign_contract(state : game_state_interface, contract : contract) : void {
    state.contracts[contract] = "complete";
    if(contract == "grant for technology"){
        state['research grant'] += 2000;
    }
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