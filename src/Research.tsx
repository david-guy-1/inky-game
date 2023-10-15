import React, { ReactElement } from 'react';
import { game_state_interface ,resources} from './State';
import contract_string from './contract_string';
import { main_contracts } from './contract_info';
import Resource from './Resource';

function Research({state, update} :{state :  game_state_interface, update: Function }) {
    return  <> 
        <div style={{"position":"absolute", "top":"0px", "right":"0px", "backgroundColor":"#ccccff"}}>
        Center of Research and Exploration  <br />Money : {state.money} <br />
        <br />
        Costs {state['worker wages'][2]} per worker <br />
        </div>

        {function(){
            var lst : ReactElement[] = [];
            var i= 0; 
            for(let item of main_contracts){ // you can only work on main contracts
                if(state.contracts[item] !== "in progress"){
                    continue;
                }
                lst.push(<> 
                    <div style={{"position": "absolute", "top":82 *(i%7) + 10, "left" :310 * Math.floor(i/7)  }}><Resource name={item} state={state} index = {2}/> </div>
                    </>)
                i+=1;
            }
            return lst; 
        }()}
        {/* research lab can't sell items, instead  they get government grants */}
    </>
}
export default Research; 