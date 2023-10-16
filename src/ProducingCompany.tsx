import React, { ReactElement } from 'react';
import { game_state_interface ,resources, resource_type} from './State';
import contract_string from './contract_string';
import { resource_maker, resource_requirements } from './contract_info';
import _ from 'lodash';
import Resource from './Resource';


type ProducingCompanyProps = {state :  game_state_interface, update: Function, tag : string, index : number, allowed_stuff : resource_type[] }
function ProducingCompany({state, update, tag, index, allowed_stuff} : ProducingCompanyProps) {
    return <>
        <div style={{"position":"absolute", "top":"0px", "right":"0px", "backgroundColor":"#ffcccc"}}>
        {tag} <br />Money : {state.money} <br />
        <br />
        Costs {state['worker wages'][index]} per worker <br />
        </div>
        {function(){
            var lst : ReactElement[] = [];
            var i=0; 
            for(let item of allowed_stuff){
                if(! _.every( resource_requirements[item], (s) => state.contracts[s] === "complete")){
                    continue;
                }

                lst.push(<div style={{"position": "absolute", "top":82 *(i%7) + 10, "left" :310 * Math.floor(i/7)  }}><Resource name={item} state={state} index = {index} update={update}/> </div>)
                i+=1;
            }
            return lst; 
        }()}
        <br/>
    </>
}
export default ProducingCompany; 