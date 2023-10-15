import React, { ReactElement } from 'react';
import { game_state_interface ,resources} from './State';
import contract_string from './contract_string';
import { main_contracts } from './contract_info';

function Research({state, update} :{state :  game_state_interface, update: Function }) {
    return  <> Center of Research and Exploration <br /> Money : {state.money} <br />
        Costs {state['worker wages'][2]} per worker <br />
        {function(){
            var lst : ReactElement[] = [];
            for(let item of main_contracts){ // you can only work on main contracts
                if(state.contracts[item] !== "in progress"){
                    continue;
                }
                lst.push(<> 
                    {item} researchers : {state['worker allocation'].main_contract[item]} <button key={item} onClick={() => {state['worker allocation'].main_contract[item] += 1; state.workers[2] += 1; update() ;}}>Add worker</button> <br />
                </>)
            }
            return lst; 
        }()}
        {/* research lab can't sell items, instead  they get government grants */}
    </>
}
export default Research; 