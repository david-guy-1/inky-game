import json 
import os
resources = ["iron", "steel","circuits", "chips", "transistors"]
researching = ["sonar detection","enhanced detection","circuit design" ,"microchips" ,"robotics 1","robotics 2" ,"rocket design"]
contracts = ["mine and computer", "mine and research", "computer and research", "grant for technology"]
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
  "money" : [number, number, number],
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
    s += """ "thing" : [number, number, number],\n""".replace("thing", item)  
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
    s += """ "thing" :  [number, number, number],\n""".replace("thing", item)

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
game_state_initial.money = [1000, 2000, 4000];
game_state_initial['worker wages'] = [1000, 1100, 1200];
game_state_initial["selling prices"] = {"iron": 3000, "steel": 4000, "circuits": 5000, "chips": 6000, "transistors": 7000};
 """
result = intro + "\n" + s + "\n" + t + "\n" + variable_setters+"export {game_state_initial, type contract, type game_state_interface, resources, researching,  type resource_type, type researching_type };"
open("State.tsx", "w").write(result)
print("done")
print(os.getcwd())