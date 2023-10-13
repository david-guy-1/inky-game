import { game_state_interface ,ores, parts, researching} from './State';

function Computer({state, update} :{state :  game_state_interface, update: Function }) {
    return <>
        Computer Factory <br />Money : {state.money[1]} <br />
        Costs {state['worker wages'][1]} per worker <br />
        {function(){
            var lst = [];
            for(let item of parts){
                lst.push(<> 
                    {item} builders : {state['worker allocation']['computer building'][item]} <button key={item}  onClick={() => {state['worker allocation']['computer building'][item] += 1; update() ; }}>Add worker</button> <br />
                </>)
            }
            return lst; 
        }()}
    </>
}
export default Computer; 