import { game_state_interface ,ores, parts, researching} from './State';

function Mine({state} :{state :  game_state_interface}) {
    return <>
        Mining Camp <br />
        <button onClick={() => {
            state['worker allocation'].mining.iron += 1; 
        }}>Add worker</button>
    </>
}
export default Mine; 