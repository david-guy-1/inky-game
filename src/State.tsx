type resource_type = "iron"|"steel"|"circuits"|"chips"|"transistors";
type researching_type = "sonar detection"|"enhanced detection"|"circuit design"|"microchips"|"robotics 1"|"robotics 2"|"rocket design";
type contract = "mine and computer"|"mine and research"|"computer and research"|"grant for technology";
type contract_state = "not signed"|"in progress"|"complete";
var resources : resource_type[]= ["iron", "steel", "circuits", "chips", "transistors"];
var researching : researching_type[] = ["sonar detection", "enhanced detection", "circuit design", "microchips", "robotics 1", "robotics 2", "rocket design"]


interface game_state_interface {
  "money" : [number, number, number],
  "research grant" : number,
  "worker wages" : [number, number, number],
  "workers" :  [number, number, number],
  "selling prices" : {"iron": number, "steel": number, "circuits": number, "chips": number, "transistors": number}, 
  "worker allocation" : {
    "building" : {
 "iron" : [number, number, number],
 "steel" : [number, number, number],
 "circuits" : [number, number, number],
 "chips" : [number, number, number],
 "transistors" : [number, number, number],
},
"researching" : {
 "sonar detection": number,
 "enhanced detection": number,
 "circuit design": number,
 "microchips": number,
 "robotics 1": number,
 "robotics 2": number,
 "rocket design": number,
}
  },
  "resources" : {
 "iron" :  [number, number, number],
 "steel" :  [number, number, number],
 "circuits" :  [number, number, number],
 "chips" :  [number, number, number],
 "transistors" :  [number, number, number],
  },
  "tech tree" : {
 "sonar detection" :number,
 "enhanced detection" :number,
 "circuit design" :number,
 "microchips" :number,
 "robotics 1" :number,
 "robotics 2" :number,
 "rocket design" :number,
 
}, "tech tree completion": {
 "sonar detection" : boolean,
 "enhanced detection" : boolean,
 "circuit design" : boolean,
 "microchips" : boolean,
 "robotics 1" : boolean,
 "robotics 2" : boolean,
 "rocket design" : boolean,
 },
contracts :{ "mine and computer" : contract_state,"mine and research" : contract_state,"computer and research" : contract_state,"grant for technology" : contract_state,} 
}

var game_state_initial : game_state_interface =  {
  "money" : [0, 0, 0],
  "research grant" : 0,
  "worker wages" : [0, 0, 0],
  "workers" :  [0, 0, 0],
  "selling prices" : {"iron": 0, "steel": 0, "circuits": 0, "chips": 0, "transistors": 0}, 
  "worker allocation" : {
    "building" : {
 "iron" : [0, 0, 0],
 "steel" : [0, 0, 0],
 "circuits" : [0, 0, 0],
 "chips" : [0, 0, 0],
 "transistors" : [0, 0, 0],
},
"researching" : {
 "sonar detection": 0,
 "enhanced detection": 0,
 "circuit design": 0,
 "microchips": 0,
 "robotics 1": 0,
 "robotics 2": 0,
 "rocket design": 0,
}
  },
  "resources" : {
 "iron" :  [0, 0, 0],
 "steel" :  [0, 0, 0],
 "circuits" :  [0, 0, 0],
 "chips" :  [0, 0, 0],
 "transistors" :  [0, 0, 0],
  },
  "tech tree" : {
 "sonar detection" :0,
 "enhanced detection" :0,
 "circuit design" :0,
 "microchips" :0,
 "robotics 1" :0,
 "robotics 2" :0,
 "rocket design" :0,
 
}, "tech tree completion": {
 "sonar detection" : false,
 "enhanced detection" : false,
 "circuit design" : false,
 "microchips" : false,
 "robotics 1" : false,
 "robotics 2" : false,
 "rocket design" : false,
 },
contracts :{ "mine and computer" : "not signed","mine and research" : "not signed","computer and research" : "not signed","grant for technology" : "not signed",} 
}

game_state_initial.money = [1000, 2000, 4000];
game_state_initial['worker wages'] = [1000, 1100, 1200];
game_state_initial["selling prices"] = {"iron": 3000, "steel": 4000, "circuits": 5000, "chips": 6000, "transistors": 7000};
 export {game_state_initial, type contract, type game_state_interface, resources, researching,  type resource_type, type researching_type };