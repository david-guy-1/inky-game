import React, { ReactElement } from 'react';
import { game_state_interface ,resources, researching} from './State';
import contract_string from './contract_string';

function Research({state, update} :{state :  game_state_interface, update: Function }) {
    return  <> Center of Research and Exploration <br /> Money : {state.money} <br />
        {contract_string(state, 2)} <br />
        Costs {state['worker wages'][2]} per worker <br />
        {function(){
            var lst : ReactElement[] = [];
            for(let item of researching){
                lst.push(<> 
                    {item} researchers : {state['worker allocation'].researching[item]} <button key={item} onClick={() => {state['worker allocation'].researching[item] += 1; state.workers[2] += 1; update() ;}}>Add worker</button> <br />
                </>)
            }
            return lst; 
        }()}
        {/* research lab can't sell items, instead  they get government grants */}
    </>
}
export default Research; 