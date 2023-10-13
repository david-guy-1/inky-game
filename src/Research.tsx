import { game_state_interface ,ores, parts, researching} from './State';

function Research({state, update} :{state :  game_state_interface, update: Function }) {
    return  <> Research Laboratory <br /> Money : {state.money[2]} <br />
        Costs {state['worker wages'][2]} per worker <br />
        {function(){
            var lst = [];
            for(let item of researching){
                lst.push(<> 
                    {item} researchers : {state['worker allocation'].researching[item]} <button key={item} onClick={() => {state['worker allocation'].researching[item] += 1; update() ;}}>Add worker</button> <br />
                </>)
            }
            return lst; 
        }()}
    </>
}
export default Research; 