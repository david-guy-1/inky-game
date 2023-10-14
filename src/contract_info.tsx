import dag from "./dag"
import { contract, game_state_interface } from "./State"

var contractDag : dag<contract> = new dag<contract>(["mine and computer" , "computer and research", "grant for technology", "mine and research"], [
    ["mine and computer", "grant for technology"], 
    ["mine and research", "computer and research"],
    ["grant for technology", "mine and research"]
] )

//"mine and computer" | "mine and research" | "computer and research" | "grant for technology"
let contracts : {[key in contract ] : (a : game_state_interface ) => boolean } = {
    "mine and computer" : (state ) =>  state.workers[0] >= 5 && state.money[1] > 5000, 
    "computer and research" : (state) => state.money[1] > 10000  && state['research grant'] >= 2000,
    "grant for technology" : (state ) => state.resources.chips[1] >= 10,
    "mine and research" : (state) => state.money[0] > 15000, 
}
let preambles : {[key in contract] : string} = {
    'mine and computer': 'mine and computer preamble',
    'mine and research': 'mine and research preamble',
    'computer and research': 'computer and research preamble',
    'grant for technology': 'grant for technology preamble'
}
let postambles : {[key in contract] : string} = {
    'mine and computer': 'mine and computer postamble',
    'mine and research': 'mine and research postamble',
    'computer and research': 'computer and research postamble',
    'grant for technology': 'grant for technology postamble'
}
export  {contractDag, contracts, preambles, postambles}