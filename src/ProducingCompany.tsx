import React, { ReactElement } from 'react';
import { game_state_interface ,resources, resource_type} from './State';
import contract_string from './contract_string';
import { resource_maker, resource_requirements } from './contract_info';
import _ from 'lodash';


type ProducingCompanyProps = {state :  game_state_interface, update: Function, tag : string, index : number, allowed_stuff : resource_type[] }
function ProducingCompany({state, update, tag, index, allowed_stuff} : ProducingCompanyProps) {
    return <>
        {tag} <br />Money : {state.money} <br />
        <br />
        Costs {state['worker wages'][index]} per worker <br />
        {function(){
            var lst : ReactElement[] = [];
            for(let item of allowed_stuff){
                if(! _.every( resource_requirements[item], (s) => state.contracts[s] === "complete")){
                    continue;
                }

                lst.push(<> <img src={`resources/${item}.png`}/>
                    {resource_maker[item]}  : {state['worker allocation']['building'][item]} <button key={item}  onClick={() => {state['worker allocation']['building'][item]+= 1;state.workers[index]+=1;  update() ; }}>Add worker</button> <br />
                </>)
            }
            return lst; 
        }()}
        <br/>
    </>
}
export default ProducingCompany; 