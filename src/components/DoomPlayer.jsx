import { useContext } from "react";
import UseContext from "../Context";
import DoomApp from "./DoomApp";

function DoomPlayer() {

  const { DoomExpand } = useContext(UseContext);

  return (
    <div>
      {DoomExpand.show ? (<DoomApp />) : null}
    </div>
  );
}

export default DoomPlayer;