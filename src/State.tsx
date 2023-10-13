type ore_type = "iron"|"steel";
type parts_type = "circuits"|"chips"|"transistors";
type researching_type = "sonar detection"|"enhanced detection"|"circuit design"|"microchips"|"robotics 1"|"robotics 2"|"rocket design";
var ores : ore_type[]= ["iron", "steel"];
var parts  : parts_type[]= ["circuits", "chips", "transistors"];
var researching : researching_type[] = ["sonar detection", "enhanced detection", "circuit design", "microchips", "robotics 1", "robotics 2", "rocket design"]


interface game_state_interface {
  "money" : [number, number, number],
  "workers" :  [number, number, number],
  "worker allocation" : {
    "mining" : {
 "iron" : number,
 "steel" : number,
},
    "computer building" : { 
   "circuits" :  number,
   "chips" :  number,
   "transistors" :  number,
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
  "ores" : {
 "iron" :  [number, number, number],
 "steel" :  [number, number, number],
  }, 
  "parts" :  {
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
  "workers" :  [0, 0, 0],
  "worker allocation" : {
    "mining" : {
 "iron" : 0,
 "steel" : 0,
},
    "computer building" : { 
   "circuits" :  0,
   "chips" :  0,
   "transistors" :  0,
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
  "ores" : {
 "iron" :  [0, 0, 0],
 "steel" :  [0, 0, 0],
  }, 
  "parts" :  {
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
export {game_state, type game_state_interface, ores, parts, researching, type ore_type, type parts_type, type researching_type };