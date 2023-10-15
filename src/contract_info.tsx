import dag from "./dag"
import { contract, game_state_interface, main_contract_type, resource_type } from "./State"

let main_contracts : main_contract_type[] = ["explore land in the north","clear out copper mine",  "explore land in the south", "clear out iron mine","explore land in the east", "clear out coal mine", "explore land in the west", "research steelmaking", "research steel fletching","explore magma cave", "grow kingdom","research elemental enchantments","explore ice cave","research holy enchantment", "open a portal to the land of the dead", "make deal with fairies", "research advanced enchantment techniques", "explore mapped region", "research dragonhide crafting", "research dragon anatomy", "kill dragon"]

let contracts : contract[] =["fend off invaders", "fend off magic invaders", "make some food", "make deal with angels", "make deal with witches"]

contracts = contracts.concat(main_contracts);

let edges : [contract, contract][] = []
for(var i=0; i < main_contracts.length-1; i++){
    var predecessor : contract = main_contracts[i];
    if((["research steelmaking", "research steel fletching", "explore land in the west"] as contract[]).indexOf(main_contracts[i+1]) !==  -1){
        predecessor = "clear out coal mine";
    }
    if((["explore ice cave"] as contract[]).indexOf(main_contracts[i+1]) !==  -1){
        predecessor = "explore magma cave";
    }
    if((["clear out coal mine"] as contract[]).indexOf(main_contracts[i+1]) !==  -1){
        predecessor = "explore land in the east";
    }
    if((["make deal with witches"] as contract[]).indexOf(main_contracts[i+1]) !==  -1){
        predecessor = "grow kingdom";
    }
    if((["make deal with fairies"] as contract[]).indexOf(main_contracts[i+1]) !==  -1){
        predecessor = "make deal with angels";
    }
    if((["research dragon anatomy"] as contract[]).indexOf(main_contracts[i+1]) !==  -1){
        predecessor = "explore mapped region";
    }
    edges.push([predecessor, main_contracts[i+1]]); 
}


edges.push(["make some food", "explore land in the north"]);


edges.push(["explore land in the east", "fend off invaders"]);
edges.push(["fend off invaders", "explore land in the west"]);

edges.push(["research advanced enchantment techniques", "fend off magic invaders"]);
edges.push(["fend off magic invaders", "explore mapped region"]);

edges.push(["explore ice cave", "make deal with angels"]);

edges.push(["grow kingdom", "make deal with witches"]);
edges.push(["make deal with witches", "research elemental enchantments"]);
edges.push(["make deal with witches", "make deal with angels"]);
edges.push(["make deal with angels", "research holy enchantment"]);
edges.push(["fend off invaders", "explore land in the west"]);

console.log(edges)
var contract_dag : dag<contract> = new dag<contract>(contracts, edges)

let contract_costs : {[key in contract] : {money : number, resources : Partial<Record<resource_type, number>>}} = {
    "make some food": {
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
    "research steel fletching": {
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
        resources:  {"fire swords" : 10, "food" : 10, "fire spirits" : 5, "arcane robes" : 5}
    },
    "make deal with angels": {
        money: 20000,
        resources:  {"fire spirits" :10, "ice crystals" : 10, "arcane robes" : 10}
    },
    "research holy enchantment": {
        money: 5500,
        resources:  {"fire spirits" : 10, "ice crystals" : 10, "food": 15,  "magic feathers" : 20}
    },
    "open a portal to the land of the dead": { // unlocks orbs of darkness
        money: 6000,
        resources:  {"fire spirits" : 10, "magic feathers" : 20, "holy swords" : 20}
    },
    "make deal with fairies": { // unlcoks fairy dust
        money: 10000,
        resources:  {"fire spirits" : 10, "ice crystals" : 15, "magic feathers" : 20}
    },
    "research advanced enchantment techniques": { // unlocks omni
        money: 15000,
        resources:  {"fire spirits" : 10, "ice crystals" : 15,"fairy dust" : 20}
    },
    "fend off magic invaders": {
        money: 0,
        resources:  {"frost bows" : 10, "fire swords" : 10, "ice swords" :10, "holy swords" : 10, "arcane robes" : 15}
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
    "fairy dust": ["make deal with fairies"],
    "dragon skin": ["explore mapped region"],
    "copper swords": ["clear out copper mine"],
    "iron swords": ["clear out iron mine"],
    "steel swords": ["clear out coal mine", "research steelmaking"],
    "steel arrowheads": ["research steel fletching", "research steelmaking"],
    "ice swords": ["explore ice cave", "research elemental enchantments"],
    "fire swords": ["explore magma cave", "research elemental enchantments"],
    "holy swords": ["make deal with angels", "research holy enchantment"],
    "frost bows": ["explore ice cave"],
    "arcane robes": ["make deal with witches"],
    "omni-enchanted swords": ["research advanced enchantment techniques"],
    "dragonhide armor": ["research dragonhide crafting"]
}

// update dag
for(var item of contracts){
    var costs = contract_costs[item].resources;
    for(var res of Object.keys(costs)){
        var prereqs = resource_requirements[res as resource_type] 
        for(var prereq of prereqs){
            contract_dag.add_edge(prereq, item);
        }
    }
}
contract_dag.add_edge("make some food", "kill dragon");
console.log(contract_dag.output());

let contract_conditions : {[key in contract ] : (a : game_state_interface ) => boolean } = {
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
    "research steel fletching": function (a: game_state_interface): boolean {
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
    "make deal with fairies": function (a: game_state_interface): boolean {
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
    "make some food": function (a: game_state_interface): boolean {
        return true;
    },
    "fend off invaders": function (a: game_state_interface): boolean {
        return true;
    },
    "fend off magic invaders": function (a: game_state_interface): boolean {
        return true;
    }
}
/*
Hunting Lodge(0 workers, cost 0/day)
Blacksmithing Guild(0 workers, cost 0/day)
Center of Research and Exploration (9 
*/
let preambles : {[key in contract] : string} = {
    "explore land in the north": "This contract is between the King and Center of Research and Exploration. It is on the topic of exploration of new lands.",
    "clear out copper mine": "This contract is between the King and Center of Research and Exploration. The copper mine must be cleared of monsters. ",
    "explore land in the south": "This contract is between the King and Center of Research and Exploration. It is on the topic of further exploration of new lands.",
    "clear out iron mine": "This contract is between the King and Center of Research and Exploration. The iron mine must also be cleared of monsters. ",
    "explore land in the east": "This contract is between the King and Center of Research and Exploration. It is on the topic of even further exploration of new lands.",
    "clear out coal mine": "This contract is between the King and Center of Research and Exploration. The coal mine must be cleared of monsters. ",
    "explore land in the west": "This contract is between the King and Center of Research and Exploration. It is the final contract in a series of contracts on the exploration of new lands.",
    "research steelmaking": "This contract is between the King and Center of Research and Exploration. They are to investigate the properties of steel and to make weapons using it. ",
    "research steel fletching": "This contract is between the King and Center of Research and Exploration. They shall devise a process to make bows and arrows using steel.",
    "explore magma cave": "This contract is between the King and Center of Research and Exploration. The magma cave is to be explored and a report is to be written on possible treasures or useful materials in it. ",
    "research elemental enchantments": "This contract is between the King and Center of Research and Exploration. They are to explore the possibility of enchanting our swords with elemental magic.",
    "explore ice cave": "This contract is between the King and Center of Research and Exploration. The ice cave is to be explored in a similar manner to the magma cave.",
    "research holy enchantment": "This contract is between the King and Center of Research and Exploration. They are to explore the possibility of enchanting our swords with holy magic.",
    "open a portal to the land of the dead": "This contract is between the King and Center of Research and Exploration. The undead hold vast treasures and they are to explore ways to access those treasures. ",
    "make deal with fairies": "This contract is between the Center of Research and Exploration and the Fairy Queen. They are to provide us with fairy dust in exchange for various resources. ",
    "research advanced enchantment techniques": "This contract is between the King and Center of Research and Exploration, concerning the investigation of enchanting swords with fairy dust.",
    "explore mapped region": "This contract is between the King and Center of Research and Exploration. They are to explore the regions labelled in the map that the invaders left.",
    "research dragonhide crafting": "This contract is between the King and Center of Research and Exploration. They are to explore the regions labelled in the map that the invaders left.",
    "research dragon anatomy": "This contract is between the King and Center of Research and Exploration. They are to study the inner workings of dragons to learn their weak spots.",
    "kill dragon": "This contract is between the King and the entire kingdom. They are to kill the dragon that has been terrorizing us for years.",
    "grow kingdom": "This contract is between the King and the entire kingdom. They are to build more cities and expand the kingdom to fit our growing population.",
    "make deal with witches": "This contract is between the Center of Research and Exploration and the witch coven. They are to teach us armor-making techniques in exchange for magical items",
    "make deal with angels": "This contract is between the Center of Research and Exploration and the angel choir. They are to reveal the secrets to holy enchantment in exchange for magical items.",
    "make some food": "This contract is between the King and the Hunting Lodge. They are to provide food for the kingdom.",
    "fend off invaders": "This contract is between the King and the military force. They are to fight off monsters that are invading our lands. ",
    "fend off magic invaders": "This contract is between the King and the magic guild. They are to fight off the magical monsters that are invading our lands."
}
let postambles : {[key in contract] : string} = {
    
    "make some food": "We've made some food so people won't go hungry",
    "explore land in the north": "We found a copper mine that's infested with monsters. We need to clear it to mine copper there. ",
    "clear out copper mine": "We've cleared out the copper mine and our miners have begun to work there (You can now make copper swords)",
    "explore land in the south": "We found an iron mine that's infested with monsters. We need to clear it to mine iron there.",
    "clear out iron mine": "We've cleared out the iron mine and our miners have begun to work there (You can now make iron swords)",
    "explore land in the east": "We found a coal mine that's infested with monsters. We need to clear it to mine coal there.\n Also, some of the monsters followed us back to our kingdom.",
    "fend off invaders": "We've fought them all off, now we can continue exploring.",
    "clear out coal mine": "We've cleared out the iron mine and our miners have begun to work there (You might think you can make some new kind of sword, but not yet. You need to do something else first)",
    "explore land in the west": "We've found some kind of bird nest. (You can now hunt magic birds for their feathers)",
    "research steelmaking": "Did you know that steel is made from iron and carbon? Well since you've just read this sentence, you know now! (You can now make steel swords)",
    "research steel fletching": "We've figured out how to attach steel to our arrows. (You can now make steel arrowheads, they might be useful)",
    "explore magma cave": "We've found fire demons that we can hunt for their fire spirits. I heard that witches love them. (You can now hunt for fire spirits)",
    "grow kingdom": "We've built more cities for our people. Although some of our cities are built somewhat close to a witch hideout.",
    "make deal with witches": "The witches accepted our offerings and taught us some stuff about making clothes and enchanting weapons (You can now make arcane robes)",
    "make deal with angels": "The angels are satisfied and have revealed the secret to holy enchantments. We can begin research soon.",
    "research elemental enchantments": "We have learned how to enchant our swords with magic. (You can make new kinds of swords if you have completed the corresponding quest)",
    "explore ice cave": "We've gained a lot of icy treasure from the ice cave! (You can now make frost bows and hunt ice wyverns for crystals)",
    "research holy enchantment": "We've unlocked one of the most powerful enchantments for our sword (maybe there is an even more powerful one? hint hint. You can now make holy swords)",
    "open a portal to the land of the dead": "We've opened a portal! We can now hunt undead monsters! (You can now hunt liches for orbs of darkness)",
    "make deal with fairies": "The fairy queen is pleased. She allows us to collect fairy dust from her kingdom. ",
    "research advanced enchantment techniques": "We've found a way to enchant our sword with all enchantments at once! This is a huge breakthrough! However others will certainly try to steal this knowledge from us. (You can now make omni-enchanted swords)",
    "fend off magic invaders": "The invaders have been defeated! They are no match for our omni-enchanted swords!\n Oh, what's this? One of them left behind a map! We will definitely use this well!",
    "explore mapped region": "We've explored those regions. One of them is a giant cache of phoenix eggs that have been left unguarded. The other is a dragon lair. Maybe the dragon is there! (You can now collect phoenix eggs and dragon skin)",
    "research dragonhide crafting": "Dragon skin is useful for armor. We've developed a new kind of armor using it (You can now make dragonhide armor)",
    "research dragon anatomy": "We've figured out where to best strike the dragon to maximize the chance of killing them.",
    "kill dragon": "We did it! The dragon is no more!",
}

var resource_maker : {[key in resource_type] : string} = {"food": "hunt for food", "wood": "chop trees", "magic feathers": "hunt magic birds", "fire spirits": "kill a fire demon", "ice crystals": "kill an ice wyvern", "orbs of darkness": "kill a lich", "phoenix eggs": "acquire phoenix eggs", "fairy dust": "collect fairy dust", "dragon skin": "collect dragon skin", "copper swords": "make copper sword", "iron swords": "make iron sword", "steel swords": "make steel sword", "steel arrowheads": "make steel arrowheads", "ice swords": "make ice sword", "fire swords": "make fire sword", "holy swords": "make holy sword", "frost bows": "make frost bow", "arcane robes": "make arcane robes", "omni-enchanted swords": "make omni-enchanted sword", "dragonhide armor": "make dragonhide armor"}

let quest_length  : {[key in contract] : number}   = {
    "explore land in the north": 3,
    "clear out copper mine": 3,
    "explore land in the south": 3,
    "clear out iron mine": 4,
    "explore land in the east": 4,
    "clear out coal mine": 4,
    "explore land in the west": 5,
    "research steelmaking": 5,
    "research steel fletching": 7,
    "explore magma cave": 7,
    "research elemental enchantments": 10,
    "explore ice cave": 10,
    "research holy enchantment": 12,
    "open a portal to the land of the dead": 14,
    "make deal with fairies": 15,
    "research advanced enchantment techniques": 20,
    "explore mapped region": 25,
    "research dragonhide crafting": 30,
    "research dragon anatomy": 40,
    "kill dragon": 100,
    "grow kingdom": 8,
    "make deal with witches": 9,
    "make deal with angels": 10,
    "make some food": 2,
    "fend off invaders": 3,
    "fend off magic invaders":25
}

export  {contract_dag, contracts, preambles, postambles , resource_maker, main_contracts, contract_costs, resource_requirements, contract_conditions, quest_length}