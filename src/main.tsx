import ReactDOM from 'react-dom/client'
import App from './App'
import {game_state_initial, game_state_interface} from "./State";
import React from 'react';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <div style={{"backgroundColor":"black", position:"absolute", "width":1200, "height":1200,"zIndex":-2}}><App state={JSON.parse(JSON.stringify(game_state_initial)) as game_state_interface}/></div>
  )

