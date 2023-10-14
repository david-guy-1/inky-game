import dag from "./dag"
import { contract, game_state_interface, resource_type } from "./State"

let main_contracts : contract[] = [ "deal with famine", "explore land in the north","clear out copper mine",  "explore land in the south", "clear out iron mine","explore land in the east","fend off invaders", "clear out coal mine", "explore land in the west","grow kingdom", "research steelmaking", "research fletching","explore magma cave", "make deal with witches", "research elemental enchantments","explore ice cave", "make deal with angels","research holy enchantment", "open a portal to the land of the dead", "research fairy manipulation", "research advanced enchantment techniques","fend off magic invaders", "explore mapped region", "research dragonhide crafting", "research dragon anatomy", "kill dragon"]

let edges : [contract, contract][] = []
for(var i=0; i < main_contracts.length-1; i++){
    var predecessor = main_contracts[i];
    if((["research steelmaking", "research fletching", "explore land in the west"] as contract[]).indexOf(main_contracts[i+1]) !==  -1){
        predecessor = "clear out coal mine";
    }
    if((["explore ice cave"] as contract[]).indexOf(main_contracts[i+1]) !==  -1){
        predecessor = "explore magma cave";
    }
    edges.push([predecessor, main_contracts[i+1]]); 
}

var contract_dag : dag<contract> = new dag<contract>(main_contracts, edges)


let contract_costs : {[key in contract] : {money : number, resources : Partial<Record<resource_type, number>>}} = {
    "deal with famine": {
        money: 0,
        resources:  {"food" : 4}
    },
    "explore land in the north": {
        money: 1000,
        resources: {"food" : 4}
    },
    "clear out copper mine": {
        money: 1000,
        resources:  {"food": 4, "wood":3}
    },
    "explore land in the south": {
        money: 1500,
        resources:  {"food": 4}
    },
    "clear out iron mine": {
        money: 1500,
        resources:  {"copper swords" : 3, "food" : 5}
    },
    "explore land in the east": {
        money: 1500,
        resources:  {"food": 3}
    },
    "fend off invaders": {
        money: 0,
        resources:  {"iron swords" : 3}
    },
    "clear out coal mine": {
        money: 1700,
        resources:  {"iron swords" : 4, "food" : 3}
    },
    "explore land in the west": { // unlocks magic feathers
        money: 2000,
        resources:  {"food" : 3}
    },
    "grow kingdom": {
        money: 6000,
        resources:  {"wood": 10, "food" : 10}
    },
    "research steelmaking": {
        money: 1000,
        resources:  {"food" : 4, "wood" : 5, "iron swords" : 3}
    },
    "research fletching": {
        money: 1500,
        resources:  {"wood": 10}
    },
    "explore magma cave": {
        money: 3000,
        resources:  {"steel swords" : 5, "steel arrowheads" : 5}
    },
    "make deal with witches": {
        money: 10000,
        resources:  {"fire spirits" : 7, "magic feathers" : 4}
    },
    "research elemental enchantments": {
        money: 4000,
        resources:  {"food" : 10, "wood" : 10, "fire spirits" : 10,  "magic feathers" : 6}
    },
    "explore ice cave": {
        money: 5000,
        resources:  {"fire swords" : 10, "food" : 10, "fire spirits" : 5}
    },
    "make deal with angels": {
        money: 20000,
        resources:  {"fire spirits" :10, "ice crystals" : 10}
    },
    "research holy enchantment": {
        money: 5500,
        resources:  {"fire spirits" : 10, "ice crystals" : 10, "food": 15,  "magic feathers" : 20}
    },
    "open a portal to the land of the dead": { // unlocks orbs of darkness
        money: 6000,
        resources:  {"fire spirits" : 10, "magic feathers" : 20, "holy swords" : 20}
    },
    "research fairy manipulation": { // unlcoks fairy dust
        money: 10000,
        resources:  {"fire spirits" : 10, "ice crystals" : 15, "magic feathers" : 20}
    },
    "research advanced enchantment techniques": { // unlocks omni
        money: 15000,
        resources:  {"fire spirits" : 10, "ice crystals" : 15,"fairy dust" : 20}
    },
    "fend off magic invaders": {
        money: 0,
        resources:  {"frost bows" : 10, "fire swords" : 10, "ice swords" :10, "holy swords" : 10}
    },
    "explore mapped region": { // unlocks dragon and phoenix stuff
        money: 30000,
        resources:  {"frost bows" : 20, "holy swords" : 20}
    },
    "research dragonhide crafting": {
        money: 40000,
        resources:  {"orbs of darkness" : 10, "phoenix eggs" : 10, "fairy dust" : 10}
    },
    "research dragon anatomy": {
        money: 50000,
        resources:  {"dragon skin" : 10, "phoenix eggs" : 20}
    },
    "kill dragon": {
        money: 100000,
        resources:  {"fire swords" : 50, "ice swords" : 50, "holy swords" : 100, "frost bows" : 100, "dragonhide armor" : 200, "omni-enchanted swords" : 200}
    },
    
}
let resource_requirements : Record<resource_type, contract[]> = {
    food: [],
    wood: [],
    "magic feathers": ["explore land in the west"],
    "fire spirits": ["explore magma cave"],
    "ice crystals": ["explore ice cave"],
    "orbs of darkness": ["open a portal to the land of the dead"],
    "phoenix eggs": ["explore mapped region"],
    "fairy dust": ["research fairy manipulation"],
    "dragon skin": ["explore mapped region"],
    "copper swords": ["clear out copper mine"],
    "iron swords": ["clear out iron mine"],
    "steel swords": ["clear out coal mine", "research steelmaking"],
    "steel arrowheads": ["clear out coal mine", "research steelmaking"],
    "ice swords": ["explore ice cave"],
    "fire swords": ["explore magma cave"],
    "holy swords": ["make deal with angels"],
    "frost bows": ["explore ice cave"],
    "arcane robes": ["make deal with witches"],
    "omni-enchanted swords": ["research advanced enchantment techniques"],
    "dragonhide armor": ["research dragonhide crafting"]
}

// update dag
for(var item of main_contracts){
    var costs = contract_costs[item].resources;
    for(var res of Object.keys(costs)){
        var prereqs = resource_requirements[res as resource_type] 
        for(var prereq of prereqs){
            contract_dag.add_edge(prereq, item);
        }
    }
}

console.log(contract_dag.output());

let contracts : {[key in contract ] : (a : game_state_interface ) => boolean } = {
    "explore land in the north": function (a: game_state_interface): boolean {
        return true;
    },
    "clear out copper mine": function (a: game_state_interface): boolean {
        return true;
    },
    "explore land in the south": function (a: game_state_interface): boolean {
        return true;
    },
    "clear out iron mine": function (a: game_state_interface): boolean {
        return true;
    },
    "explore land in the east": function (a: game_state_interface): boolean {
        return true;
    },
    "clear out coal mine": function (a: game_state_interface): boolean {
        return true;
    },
    "explore land in the west": function (a: game_state_interface): boolean {
        return true;
    },
    "research steelmaking": function (a: game_state_interface): boolean {
        return true;
    },
    "research fletching": function (a: game_state_interface): boolean {
        return true;
    },
    "explore magma cave": function (a: game_state_interface): boolean {
        return true;
    },
    "research elemental enchantments": function (a: game_state_interface): boolean {
        return true;
    },
    "explore ice cave": function (a: game_state_interface): boolean {
        return true;
    },
    "research holy enchantment": function (a: game_state_interface): boolean {
        return true;
    },
    "open a portal to the land of the dead": function (a: game_state_interface): boolean {
        return true;
    },
    "research fairy manipulation": function (a: game_state_interface): boolean {
        return true;
    },
    "research advanced enchantment techniques": function (a: game_state_interface): boolean {
        return true;
    },
    "explore mapped region": function (a: game_state_interface): boolean {
        return true;
    },
    "research dragonhide crafting": function (a: game_state_interface): boolean {
        return true;
    },
    "research dragon anatomy": function (a: game_state_interface): boolean {
        return true;
    },
    "kill dragon": function (a: game_state_interface): boolean {
        return true;
    },
    "grow kingdom": function (a: game_state_interface): boolean {
        return true;
    },
    "make deal with witches": function (a: game_state_interface): boolean {
        return true;
    },
    "make deal with angels": function (a: game_state_interface): boolean {
        return true;
    },
    "deal with famine": function (a: game_state_interface): boolean {
        return true;
    },
    "fend off invaders": function (a: game_state_interface): boolean {
        return true;
    },
    "fend off magic invaders": function (a: game_state_interface): boolean {
        return true;
    }
}
let preambles : {[key in contract] : string} = {
    "explore land in the north": "",
    "clear out copper mine": "",
    "explore land in the south": "",
    "clear out iron mine": "",
    "explore land in the east": "",
    "clear out coal mine": "",
    "explore land in the west": "",
    "research steelmaking": "",
    "research fletching": "",
    "explore magma cave": "",
    "research elemental enchantments": "",
    "explore ice cave": "",
    "research holy enchantment": "",
    "open a portal to the land of the dead": "",
    "research fairy manipulation": "",
    "research advanced enchantment techniques": "",
    "explore mapped region": "",
    "research dragonhide crafting": "",
    "research dragon anatomy": "",
    "kill dragon": "",
    "grow kingdom": "",
    "make deal with witches": "",
    "make deal with angels": "",
    "deal with famine": "",
    "fend off invaders": "",
    "fend off magic invaders": ""
}
let postambles : {[key in contract] : string} = {
    "explore land in the north": "",
    "clear out copper mine": "",
    "explore land in the south": "",
    "clear out iron mine": "",
    "explore land in the east": "",
    "clear out coal mine": "",
    "explore land in the west": "",
    "research steelmaking": "",
    "research fletching": "",
    "explore magma cave": "",
    "research elemental enchantments": "",
    "explore ice cave": "",
    "research holy enchantment": "",
    "open a portal to the land of the dead": "",
    "research fairy manipulation": "",
    "research advanced enchantment techniques": "",
    "explore mapped region": "",
    "research dragonhide crafting": "",
    "research dragon anatomy": "",
    "kill dragon": "",
    "grow kingdom": "",
    "make deal with witches": "",
    "make deal with angels": "",
    "deal with famine": "",
    "fend off invaders": "",
    "fend off magic invaders": ""
}

var resource_maker : {[key in resource_type] : string} = {"food": "hunt for food", "wood": "chop trees", "magic feathers": "hunt magic birds", "fire spirits": "kill a fire demon", "ice crystals": "kill an ice wyvern", "orbs of darkness": "kill a lich", "phoenix eggs": "acquire phoenix eggs", "fairy dust": "acquire fairy dust", "dragon skin": "acquire dragon skin", "copper swords": "make copper sword", "iron swords": "make iron sword", "steel swords": "make steel sword", "steel arrowheads": "make steel arrowheads", "ice swords": "make ice sword", "fire swords": "make fire sword", "holy swords": "make holy sword", "frost bows": "make frost bow", "arcane robes": "make arcane robes", "omni-enchanted swords": "make omni-enchanted sword", "dragonhide armor": "make dragonhide armor"}

export  {contract_dag, contracts, preambles, postambles , resource_maker, main_contracts, contract_costs}