import { useEffect, useRef } from "react";

function DoomApp() {

  const dosboxRef = useRef(null);

  useEffect(() => {

    if (!window.Dosbox) {
      console.error("Dosbox não carregado");
      return;
    }

    const dosbox = new window.Dosbox({
      id: "dosbox",
      onload: function (instance) {

        dosboxRef.current = instance;

        instance.run(
          "/game/DOOM-@evilution.zip",
          "./DOOM/DOOM.EXE"
        );

      }
    });





    // 🔴 quando o componente desmontar
    return () => {

      console.log("Destruindo Doom");

      if (dosboxRef.current) {
        dosboxRef.current.exit();
      }

      const el = document.getElementById("dosbox");
      if (el) el.innerHTML = "";

    };

  }, []);

  return (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden"
    }}
  >
    <div
      id="dosbox"
      style={{
        width: "100%",
        height: "100%"
      }}
    ></div>
  </div>
);
}

export default DoomApp;