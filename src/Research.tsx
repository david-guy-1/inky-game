import { game_state_interface ,ores, parts, researching} from './State';

function Research({state} :{state :  game_state_interface}) {
    return  <> Research Laboratory <br />
        <button onClick={() => {
            state['worker allocation'].researching['circuit design'] += 1; 
        }}>Add worker</button>
    </>
}
export default Research; 