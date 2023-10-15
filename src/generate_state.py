import json 
import os
resources = ["food", "wood", "magic feathers", "fire spirits", "ice crystals", "orbs of darkness", "phoenix eggs", "fairy dust", "dragon skin", "copper swords", "iron swords", "steel swords", "steel arrowheads", "ice swords", "fire swords", "holy swords", "frost bows", "arcane robes", "omni-enchanted swords", "dragonhide armor"]
main_contract = ["explore land in the north","clear out copper mine",  "explore land in the south", "clear out iron mine","explore land in the east","clear out coal mine", "explore land in the west", "research steelmaking", "research steel fletching","explore magma cave", "research elemental enchantments","explore ice cave", "research holy enchantment", "open a portal to the land of the dead", "make deal with fairies", "research advanced enchantment techniques", "explore mapped region", "research dragonhide crafting", "research dragon anatomy", "kill dragon", "grow kingdom", "help the witches", "help the angels", "investigate monsters"]

contracts = main_contract + [ "make deal with witches", "make deal with angels", "make some food", "fend off invaders", "fend off magic invaders", "make trade deal", ]

# to add a new contract:
# add them here, 
# if they are storyline contracts, add their hintstrings
# add them to the dag 
# add costs, conditions, preambles and postambles
# draw postamble art for them .
# if quest contract, set length
# set reward in App.tsx on contract end 

contract_states = ["not signed", "in progress", "autocomplete", "complete"]
intro = "type resource_type = " + "|".join(map(lambda x : "\"" + x + "\"", resources) ) + ";\n"
intro += "type main_contract_type = " + "|".join(map(lambda x : "\"" + x + "\"", main_contract)) + ";\n"
intro += "type contract = " + "|".join(map(lambda x : "\"" + x + "\"", contracts)) + ";\n"
intro += "type contract_state = " + "|".join(map(lambda x : "\"" + x + "\"", contract_states)) + ";\n"
intro += "var resources : resource_type[]= " + json.dumps(resources) + ";\n"
intro += "var main_contracts : main_contract_type[] = " + json.dumps(main_contract) + "\n"
intro += "var contracts : contract[] = " + json.dumps(contracts) + "\n"

s = ""
s += """
interface game_state_interface {
"day":number,
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
"main_contract" : {
"""
for item in main_contract:
    s += """ "thing": number,\n""".replace("thing", item)
s += """}
  },
  "resources" : {
"""
for item in resources:
    s += """ "thing" :  number,\n""".replace("thing", item)
s += """ },
"""
s += "contracts :{ "
for item in contracts:
    s += "\"" + item + "\" : contract_state,"
s += """}, 
"""
s += "\"quest progress\" :{ "
for item in contracts:
    s += "\"" + item + "\" : number,"
s += """} ,
    invader_event : boolean,
    witch_event : boolean,
    angel_event : boolean,
    grow_event : boolean
}"""
t = s.replace("interface game_state_interface", "var game_state_initial : game_state_interface = ")
t = t.replace("boolean", "false")
t = t.replace("number", "0")

t = t.replace("contract_state", "\"not signed\"")
variable_setters = """
game_state_initial.money =10000;
game_state_initial["research grant"] =1000;
game_state_initial['worker wages'] = [1000, 1100, 1200];
game_state_initial["selling prices"] = { "food" : 100,"wood" : 100,"magic feathers" : 150,"fire spirits" : 200,"ice crystals" : 250,"orbs of darkness" : 500,"phoenix eggs" : 1000,"fairy dust" : 1500,"dragon skin" : 2000,"copper swords" : 250,"iron swords" : 280,"steel swords" : 320,"steel arrowheads" : 330,"ice swords" : 440,"fire swords" : 500,"holy swords" : 750,"frost bows" : 420,"arcane robes" : 380,"omni-enchanted swords" : 1500,"dragonhide armor" : 2500,};

"""

result = intro + "\n" + s + "\n" + t + "\n" + variable_setters+"export {game_state_initial, type contract,contracts, type game_state_interface, resources, main_contracts,  type resource_type, type main_contract_type };"
open("State.tsx", "w").write(result)
print("done")
print(os.getcwd())