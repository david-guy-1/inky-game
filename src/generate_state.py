import json 
import os
resources = ["food", "wood", "magic feathers", "fire spirits", "ice crystals", "orbs of darkness", "phoenix eggs", "fairy dust", "dragon skin", "copper swords", "iron swords", "steel swords", "steel arrowheads", "ice swords", "fire swords", "holy swords", "frost bows", "arcane robes", "omni-enchanted swords", "dragonhide armor"]
researching = ["explore land in the north","clear out copper mine",  "explore land in the south", "clear out iron mine","explore land in the east","clear out coal mine", "explore land in the west", "research steelmaking", "research fletching","explore magma cave", "research elemental enchantments","explore ice cave", "research holy enchantment", "open a portal to the land of the dead", "research fairy manipulation", "research advanced enchantment techniques", "explore mapped region", "research dragonhide crafting", "research dragon anatomy", "kill dragon"]

contracts = researching + ["grow kingdom", "make deal with witches", "make deal with angels", "deal with famine", "fend off invaders", "fend off magic invaders"]

contract_states = ["not signed", "in progress", "complete"]
intro = "type resource_type = " + "|".join(map(lambda x : "\"" + x + "\"", resources) ) + ";\n"
intro += "type researching_type = " + "|".join(map(lambda x : "\"" + x + "\"", researching)) + ";\n"
intro += "type contract = " + "|".join(map(lambda x : "\"" + x + "\"", contracts)) + ";\n"
intro += "type contract_state = " + "|".join(map(lambda x : "\"" + x + "\"", contract_states)) + ";\n"
intro += "var resources : resource_type[]= " + json.dumps(resources) + ";\n"
intro += "var researching : researching_type[] = " + json.dumps(researching) + "\n"
s = ""
s += """
interface game_state_interface {
  "money" : number,
  "research grant" : number,
  "worker wages" : [number, number, number],
  "workers" :  [number, number, number],
  "selling prices" : """
selling_dict = {}
for item in resources:
    selling_dict[item] = "number"
s += json.dumps(selling_dict).replace("\"number\"", "number")
s += """, 
  "worker allocation" : {
    "building" : {
""" 
for item in resources:
    s += """ "thing" : number,\n""".replace("thing", item)  
s += """},
"researching" : {
"""
for item in researching:
    s += """ "thing": number,\n""".replace("thing", item)
s += """}
  },
  "resources" : {
"""
for item in resources:
    s += """ "thing" :  number,\n""".replace("thing", item)

s += """  },
  "tech tree" : {
"""
for item in researching:
    s += """ "thing" :number,\n""".replace("thing", item)
s += """ 
}, "tech tree completion": {
"""
for item in researching:
    s += """ "thing" : boolean,\n""".replace("thing", item)


s += """ },
"""
s += "contracts :{ "
for item in contracts:
    s += "\"" + item + "\" : contract_state,"
s += """} 
}"""
t = s.replace("interface game_state_interface", "var game_state_initial : game_state_interface = ")
t = t.replace("boolean", "false")
t = t.replace("number", "0")

t = t.replace("contract_state", "\"not signed\"")
variable_setters = """
game_state_initial.money =1000;
game_state_initial['worker wages'] = [1000, 1100, 1200];
 """
result = intro + "\n" + s + "\n" + t + "\n" + variable_setters+"export {game_state_initial, type contract, type game_state_interface, resources, researching,  type resource_type, type researching_type };"
open("State.tsx", "w").write(result)
print("done")
print(os.getcwd())