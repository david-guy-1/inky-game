import { game_state_interface ,ores, parts, researching} from './State';

function Mine({state, update} :{state :  game_state_interface, update: Function }) {
    return <>
        Mining Camp <br />Money : {state.money[0]} <br />
        Costs {state['worker wages'][0]} per worker <br />
        {function(){
            var lst = [];
            for(let item of ores){
                lst.push(<> 
                    {item} miners : {state['worker allocation'].mining[item]} <button key={item}  onClick={(e) => {state['worker allocation'].mining[item] += 1;update() ; console.log()}}>Add worker</button> <br />
                </>)
            }
            return lst; 
        }()}
    </>
}
export default Mine; 