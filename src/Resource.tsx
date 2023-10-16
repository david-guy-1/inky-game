import { useReducer } from "react";
import { game_state_interface, main_contracts, main_contract_type, resource_type, resources } from "./State";
import { quest_length } from "./contract_info";

function add(state : game_state_interface, resource :  resource_type | main_contract_type, index : number){
    if(resource_or_quest(resource) === "resource"){
        resource = resource as resource_type;
        state.workers[index] += 1;
        state["worker allocation"].building[resource] += 1;
    } else {
        resource = resource as main_contract_type;
        state.workers[index] += 1;
        state["worker allocation"].main_contract[resource] += 1;
    }
}

function subtract(state : game_state_interface, resource : resource_type | main_contract_type, index : number){
    if(resource_or_quest(resource) === "resource"){
        resource = resource as resource_type;
        if(state["worker allocation"].building[resource] > 0){
            state.workers[index] -= 1;
            state["worker allocation"].building[resource] -= 1;
        }
    } else {
        resource = resource as main_contract_type;
        if(state["worker allocation"].main_contract[resource] > 0){
            state.workers[index] -= 1;
            state["worker allocation"].main_contract[resource] -= 1;
        }
    }
}
function resource_or_quest(item : string) : ("resource"|"quest" | "neither"){
    if(main_contracts.indexOf(item as main_contract_type) !== -1){
        
        return "quest"
    } 
    if(resources.indexOf(item as resource_type) !== -1){
        return "resource"
    }
    return "neither" 
}
function Resource({name, state, index, update} : {name : resource_type | main_contract_type, state : game_state_interface, index : number, update : Function}){
    return <div style={{"position" : "absolute", "width" :300, "height" : 80, backgroundColor:"white"}}>
        <img src={resource_or_quest(name) === "resource" ? "resources/" + name + ".png" : "resources/quest.png"} style={{"position":"absolute", "top":0, "left":0}}/>
        <span style={{"position":"absolute", "top":3, "left":82, width : 190, "overflowWrap": "break-word"}} >{name} : {resource_or_quest(name) === "quest" ? state["quest progress"][name as main_contract_type] + "/" + quest_length[name as main_contract_type]: state.resources[name as resource_type]}</span>
        
        <img src={"icons/person.png"} style={{"position":"absolute", "top":55, "right":62}}/>
        <span style={{"position":"absolute", "top":55, "right":30}} >{resource_or_quest(name) == "quest" ? state["worker allocation"].main_contract[name as main_contract_type] : state["worker allocation"].building[name as resource_type]}</span>
        <img src={"icons/add.png"} style={{"position":"absolute", "top":10, "left":272}} onClick={() => {add(state, name, index), update();}}/>
        <img src={"icons/subtract.png"} style={{"position":"absolute", "top":50, "left":272}}  onClick={() => {subtract(state, name, index); update()}}/>
    </div>
}

export default Resource