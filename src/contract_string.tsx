import { contract, game_state_interface , main_contract_type, resource_type} from "./State";
import { contract_dag, contract_costs, main_contracts } from "./contract_info";

let contract_hints : {[key in contract] : string}  = {
    "make some food": "The king wants us to make some food",
    "explore land in the north": "We should explore the area around our kingdom.",
    "clear out copper mine": "The abandoned copper mine is filled with monsters. Let's get rid of them.",
    "explore land in the south": "We should continue to explore.",
    "clear out iron mine": "The iron mine is ALSO filled with monsters. Stronger monsters.",
    "explore land in the east": "Never stop exploring.",
    "fend off invaders": "We've angered a group of monsters while exploring, they're attacking our kingdom. Let's get rid of them.",
    "clear out coal mine": "The coal mine is also monster-infested. Why are all mines infested?",
    "explore land in the west": "This is the last direction we can go in.",
    "research steelmaking": "With coal we can make steel",
    "research steel fletching": "We should also make a bow and arrows. This could be useful.",
    "grow kingdom": "As our population expands, we need more space.",
    "explore magma cave": "With steel swords and arrows, we can finally explore that magma cave right next to our kingdom.",
    "make deal with witches": "The witches have taken interest in the fire spirits from the magma cave. Let's make a deal with them.",
    "research elemental enchantments": "With elemental enchantments, we can enhance our combat abilities.",
    "explore ice cave": "We have fire swords now, let's test them out in the ice cave.",
    "make deal with angels": "Our exploration skills have caught the attention of angels. Let's make a deal with them too.",
    "research holy enchantment": "The angels have given us the secret to enchanting our swords with holy power. Let's use them.",
    "make deal with fairies": "The fairy queen wants to trade with us. We can get some fairy dust from them.",
    "open a portal to the land of the dead": "With our new holy swords, we can now fight undead creatures and get their treasures. We first need to open a portal.",
    "research advanced enchantment techniques": "Fairy dust has many useful properties, but the most important one is to enchant our swords with multiple enchantments at once. ",
    "fend off magic invaders": "Our research into enchanting swords with fairy dust has caught the attention of magical creatures who want to steal the technology from us. Fight them off!",
    "explore mapped region": "One of the magical creatures that invaded us had a map on them. The labels \"Dragon den\" and \"Phoenix nest\" are on it. Let's explore those areas.",
    "research dragonhide crafting": "If we learn to work with dragonhide, we can make armor with it.",
    "research dragon anatomy": "We need to know where the dragon's weaknesses are.",
    "kill dragon": "Let's get rid of this dragon once and for all."
}


function contract_string(state : game_state_interface) : string{ 
    let exposed = contract_dag.get_exposed_vertices(new Set((Object.keys(state.contracts) as contract[]).filter((x) => state.contracts[x] !== "not signed") ));
    for(let item of exposed){
        // don't hint for main contracts
        if(main_contracts.indexOf(item as main_contract_type) === -1){
            continue; 
        }
        let hint = contract_hints[item];
        hint += "\nThis will require " 
        let cost = contract_costs[item];
        
        for(let res  of Object.keys(cost.resources)){
            let costN = cost.resources[res as resource_type]
            if(costN !== undefined){
                hint += costN.toString() + " " + res + ","
            }
        } 
        if(cost.money !== 0){
            hint += " and " + cost.money.toString() + " gold."
        } else { 
            hint += " and no gold."
        }
        return hint;
    }
    return "Everything is going well";
}

export default contract_string;