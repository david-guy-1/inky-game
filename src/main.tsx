import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
//import './index.css'

var game_state = {
  "data" : 1, "status" : ["a", "b", 1, true]
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App state={game_state}/>
)
