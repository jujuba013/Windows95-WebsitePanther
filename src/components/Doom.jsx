import { useContext } from "react"
import UseContext from "../Context"
import DoomApp from "./DoomApp"
import Draggable from "react-draggable"

function Doom(){

  const { DoomExpand, setDoomExpand } = useContext(UseContext)

  if(!DoomExpand) return null

  return (

    <Draggable>

      <div className="window">

        <div className="title-bar">

          <span>Doom</span>

          <button onClick={()=>setDoomExpand(true)}>X</button>

        </div>

        <div className="window-body" style={{height:"800px"}}>

          <DoomApp/>

        </div>

      </div>

    </Draggable>

  )

}

export default Doom