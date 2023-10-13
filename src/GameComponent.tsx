import { useEffect, useState , useRef} from 'react'
import './App.css'
import _ from "lodash";
import "phaser";



function preload (this:Phaser.Scene)
{
  this.load.image('brook', 'src/assets/brook.jpg');
  this.load.image('player', 'src/assets/player.jpg');
}

function create (this:Phaser.Scene)
{ 
  console.log("create called");
  this.add.image(400, 300, 'brook');
  let cursors = (this.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin ).createCursorKeys() ;
  let keys = (this.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin ).addKeys(_.toArray("abcdefghijklmnopqrstuvwxyz").join(",")) ;
  let player : Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = this.physics.add.sprite(100, 450, 'player');
  this.data.set("cursors", cursors);
  this.data.set("keys", keys);
  this.data.set("player", player);
}

function update (this:Phaser.Scene)
{
  let cursors : Phaser.Types.Input.Keyboard.CursorKeys = this.data.get("cursors");
  let keys : {[key : string] : Phaser.Input.Keyboard.Key} = this.data.get("keys");
  let player : Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = this.data.get("player");
  if (cursors.left.isDown || keys["a"].isDown)
  {
      player.setVelocityX(-160);

  }
  else if (cursors.right.isDown || keys["d"].isDown )
  {
      player.setVelocityX(160);

  }

  if (cursors.up.isDown || keys["w"].isDown)
  {
      player.setVelocityY(-330);
  }
  if (cursors.down.isDown || keys["s"].isDown)
  {
      player.setVelocityY(330);
  }
  if (cursors.space.isDown)
  {
      player.setVelocity(0, 0);
  }
}



function start (parent : HTMLElement){
    console.log("start called");
  var config : Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics : {
      default : "arcade",
      arcade: {
        debug: false,
      },
    },
    parent : parent,
    render: {
      antialiasGL: false,
      pixelArt: true,
    }

  };

  
  var game = new Phaser.Game(config);
  (window as object).game = game;
}
  


function GameComponent({ data} : { data : number | string}) {
    console.log("render called");
  const [loaded, setLoaded] = useState<boolean | string>(false);
    
  useEffect(function(){
    if(loaded === false){
        var parent = ref.current;
        start(parent as HTMLDivElement); 
        setLoaded("ready");
    }
  })
  const ref = useRef<HTMLDivElement>(null)
  return (
    <> 
    this is some text {typeof(data) == "number" ? data + 1 : data.length.toString() +  " " + data}
       <div ref={ref}> </div>
    </>
  )
}

export default GameComponent
