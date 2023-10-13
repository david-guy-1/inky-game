import json 
import os
ores = ["iron", "steel"]
parts = ["circuits", "chips", "transistors"]
researching = ["sonar detection","enhanced detection","circuit design" ,"microchips" ,"robotics 1","robotics 2" ,"rocket design"]

intro = "type ore_type = " + "|".join(map(lambda x : "\"" + x + "\"", ores) ) + ";\n"
intro += "type parts_type = " + "|".join(map(lambda x : "\"" + x + "\"", parts)) + ";\n"
intro += "type researching_type = " + "|".join(map(lambda x : "\"" + x + "\"", researching)) + ";\n"
intro += "var ores : ore_type[]= " + json.dumps(ores) + ";\n"
intro += "var parts  : parts_type[]= " + json.dumps(parts) + ";\n"
intro += "var researching : researching_type[] = " + json.dumps(researching) + "\n"
s = ""
s += """
interface game_state_interface {
  "money" : [number, number, number],
  "workers" :  [number, number, number],
  "worker allocation" : {
    "mining" : {
""" 
for item in ores:
    s += """ "thing" : number,\n""".replace("thing", item)  
s += """},
    "computer building" : { 
"""
for item in parts:
    s += """   "thing" :  number,\n""".replace("thing", item)
s += """}, 
"researching" : {
"""
for item in researching:
    s += """ "thing": number,\n""".replace("thing", item)
s += """}
  },
  "ores" : {
"""
for item in ores:
    s += """ "thing" :  [number, number, number],\n""".replace("thing", item)
s += """  }, 
  "parts" :  {
"""
for item in parts:
    s += """ "thing" :  [number, number, number],\n""".replace("thing", item)
s += """  },
  "tech tree" : {
"""
for item in researching:
    s += """ "thing" : [number,number, number],\n""".replace("thing", item)
s += """ 
}, "tech tree completion": {
"""
for item in researching:
    s += """ "thing" : [boolean,boolean, boolean],\n""".replace("thing", item)


s += """ }
}"""
t = s.replace("interface game_state_interface", "var game_state : game_state_interface = ")
t = t.replace("boolean", "false")
t = t.replace("number", "0")
result = intro + "\n" + s + "\n" + t + "\n" + "export {game_state, type game_state_interface, ores, parts, researching, type ore_type, type parts_type, type researching_type };"
open("State.tsx", "w").write(result)
print("done")
print(os.getcwd())