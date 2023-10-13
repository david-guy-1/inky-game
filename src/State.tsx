type resource_type = "iron"|"steel"|"circuits"|"chips"|"transistors";
type researching_type = "sonar detection"|"enhanced detection"|"circuit design"|"microchips"|"robotics 1"|"robotics 2"|"rocket design";
var resources : resource_type[]= ["iron", "steel", "circuits", "chips", "transistors"];
var researching : researching_type[] = ["sonar detection", "enhanced detection", "circuit design", "microchips", "robotics 1", "robotics 2", "rocket design"]


interface game_state_interface {
  "money" : [number, number, number],
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
 "sonar detection" : [number,number, number],
 "enhanced detection" : [number,number, number],
 "circuit design" : [number,number, number],
 "microchips" : [number,number, number],
 "robotics 1" : [number,number, number],
 "robotics 2" : [number,number, number],
 "rocket design" : [number,number, number],
 
}, "tech tree completion": {
 "sonar detection" : [boolean,boolean, boolean],
 "enhanced detection" : [boolean,boolean, boolean],
 "circuit design" : [boolean,boolean, boolean],
 "microchips" : [boolean,boolean, boolean],
 "robotics 1" : [boolean,boolean, boolean],
 "robotics 2" : [boolean,boolean, boolean],
 "rocket design" : [boolean,boolean, boolean],
 }
}

var game_state : game_state_interface =  {
  "money" : [0, 0, 0],
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
 "sonar detection" : [0,0, 0],
 "enhanced detection" : [0,0, 0],
 "circuit design" : [0,0, 0],
 "microchips" : [0,0, 0],
 "robotics 1" : [0,0, 0],
 "robotics 2" : [0,0, 0],
 "rocket design" : [0,0, 0],
 
}, "tech tree completion": {
 "sonar detection" : [false,false, false],
 "enhanced detection" : [false,false, false],
 "circuit design" : [false,false, false],
 "microchips" : [false,false, false],
 "robotics 1" : [false,false, false],
 "robotics 2" : [false,false, false],
 "rocket design" : [false,false, false],
 }
}

game_state.money = [1000, 2000, 4000];
game_state['worker wages'] = [1000, 1100, 1200];
game_state["selling prices"] = {"iron": 3000, "steel": 4000, "circuits": 5000, "chips": 6000, "transistors": 7000};
 export {game_state, type game_state_interface, resources, researching,  type resource_type, type researching_type };