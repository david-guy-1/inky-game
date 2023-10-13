import { game_state_interface ,ores, parts, researching} from './State';

function Computer({state} :{state :  game_state_interface}) {
    return <>
        Computer Factory <br />
        <button onClick={() => {
            state['worker allocation']['computer building'].chips += 1; 
        }}>Add worker</button>
    </>
}
export default Computer; 