import { MouseEvent, ReactElement, useState } from 'react';
import { game_state_interface ,resources, researching, resource_type, contract} from './State';
import dag from './dag';
import _ from 'lodash';

function sign_contract(state : game_state_interface, contract : contract) : void {
    state.contracts[contract] = "complete";
    if(contract == "grant for technology"){
        state['research grant'] += 2000;
        state.resources.chips[1]  -= 10;
    }
}
function ContractSigning({state, update, preamble, postamble, contract} :{state :  game_state_interface, update: Function , preamble : string, postamble : string, contract : contract}) {
    var [signed, setSigned] = useState(false);
    if(!signed){
        return  <>  Sign Contract : <br />
        {preamble} 
        <br /> 
        <button onClick={() => {sign_contract(state, contract), setSigned(true) }}>Sign</button><button onClick={()=>update("contract")}>Don't sign</button>
        </>
    } else {
        return <>  Sign Contract : <br />
        {preamble} 
        <br />
        {postamble} 
        <br />
        <button onClick={() => update("contract")}>Go back</button>
        </>
    }
}
export default ContractSigning; 