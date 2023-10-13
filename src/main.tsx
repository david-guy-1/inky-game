import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {game_state, game_state_interface} from "./State.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <App state={JSON.parse(JSON.stringify(game_state)) as game_state_interface}/>
  )

