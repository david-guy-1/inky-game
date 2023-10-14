import { MouseEvent, ReactElement, useState } from 'react';
import { game_state_interface ,resources, researching, resource_type, contract} from './State';
import dag from './dag';
import _ from 'lodash';
import React from 'react';
import { main_contracts } from './contract_info';

function sign_contract(state : game_state_interface, contract : contract) : void {
    // side contract
    if(main_contracts.indexOf(contract) === -1){
        state.contracts[contract] = "complete";
    } else {
        state.contracts[contract] = "in progress";
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