import { MouseEvent, ReactElement } from 'react';
import { game_state_interface ,resources, researching, resource_type} from './State';
let names = ["Mining Camp", "Computer Factory", "Research Laboratory"]

function buy_resource(e : MouseEvent<HTMLElement>, state : game_state_interface, ){
    var thing : any = e.currentTarget.getAttribute("name")?.split(" ");
    thing[1] = parseInt(thing[1]); // buyer
    thing[2] = parseInt(thing[2]); // seller
    thing[3] = parseInt(thing[3]); // price
    var thing2 = thing as [resource_type, number,number, number];
    state.resources[thing2[0]][thing[2]] -= 1;
    state.resources[thing2[0]][thing[1]] += 1;

    state.money[thing[2]] += thing[3];
    state.money[thing[1]] -= thing[3];
}
function Trade({state, update} :{state :  game_state_interface, update: Function }) {
    return  <> Trade between companies <br /> 
        {function(){
            let lst : ReactElement[]= [];
            for(let i=0; i < 3; i++){
                let company_name = names[i];
                var trade_between = [false, false, false];
                if(i === 0){
                    if(state.contracts['mine and computer'] === "complete"){
                        trade_between[1] = true;
                    }
                    if(state.contracts['mine and research'] === "complete"){
                        trade_between[2] = true;
                    }
                }
                if(i === 1){
                    if(state.contracts['mine and computer'] === "complete"){
                        trade_between[0] = true;
                    }
                    if(state.contracts['computer and research'] === "complete"){
                        trade_between[2] = true;
                    }
                }
                if(i === 2){
                    if(state.contracts['mine and research'] === "complete"){
                        trade_between[0] = true;
                    }
                    if(state.contracts['computer and research'] === "complete"){
                        trade_between[1] = true;
                    }
                }
                lst.push( <>
                    {company_name} {state.money[i]}:  <br />
                    {function(){
                        let lst2 : ReactElement[] = [];
                        for(let item of resources){
                            // here we see if we can buy and if so, at what price.
                            lst2.push(<>
                                {item} : {state.resources[item][i] }  {
                                    function(){
                                        let lst3 : ReactElement[] = [];
                                        let price = 1000 ; // TODO: select a price somehow
                                        for(let j=0; j<3; j++){
                                            if(trade_between[j] === false){
                                                lst3.push(<>"sign a contract first"</>); 
                                            }
                                            else if(state.resources[item][j] === 0){
                                                lst3.push(<>"seller doesn't have it"  </>);
                                            }else { 
                                                lst3.push(<button name={item + " " + i + " " + j + " " + price} onClick={(e) =>{ buy_resource(e, state); update();}}>Buy from {names[j]}</button>);
                                            }
                                        }
                                        return lst3; 
                                    }()  
                                }<br /> 
                            </>)
                        }
                        return lst2; 
                    }()}
                </>)
            }
            return lst; 
        }()}
    </>
}
export default Trade; 