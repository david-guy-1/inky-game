import { game_state_interface ,resources, researching, resource_type} from './State';
import contract_string from './contract_string';

type ProducingCompanyProps = {state :  game_state_interface, update: Function, tag : string, index : number, allowed_stuff : resource_type[] }
function ProducingCompany({state, update, tag, index, allowed_stuff} : ProducingCompanyProps) {
    return <>
        {tag} <br />Money : {state.money[index]} <br />
        {contract_string(state, index)}<br />
        Costs {state['worker wages'][index]} per worker <br />
        {function(){
            var lst = [];
            for(let item of allowed_stuff){
                lst.push(<> 
                    {item} builders : {state['worker allocation']['building'][item][index]} <button key={item}  onClick={() => {state['worker allocation']['building'][item][index] += 1;state.workers[index]+=1;  update() ; }}>Add worker</button> <br />
                </>)
            }
            return lst; 
        }()}
        <br/>
        Sell items
        <br/>
        {function(){
            var lst = [];
            for(let item of resources){
                lst.push(<> 
                    {item} : You have {state.resources[item][index]}, selling price is {state['selling prices'][item]}, {state.resources[item][index] > 0 ?   <button key={item}  onClick={() => {state.resources[item][index]-=1; state.money[index] += state['selling prices'][item] ;update() ; }}>Sell</button>: null} <br />
                </>)
            }
            return lst; 
        }()}
    </>
}
export default ProducingCompany; 