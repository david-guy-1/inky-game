import ReactDOM from 'react-dom/client'
import App from './App'
import {game_state_initial, game_state_interface} from "./State";
import React from 'react';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <App state={JSON.parse(JSON.stringify(game_state_initial)) as game_state_interface}/>
  )

