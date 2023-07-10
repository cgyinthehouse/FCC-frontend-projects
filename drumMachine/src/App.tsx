import PadBank from "./components/PadBank";
import Controls from "./components/Controls";
import clips from "./data/clips.json";
import { useKeys } from "./hooks/useKeys";
import { useVolume } from "./hooks/useVolume";
import { useEffect } from "react";
interface ClipsType {
  [key: string]: {
    src: string;
    clip: string;
    key?: string;
  }[];
}

function App() {
  const { handleKeyDown, handleKeyUp, banks, removebank } = useKeys();
  const [volume, setVolume] = useVolume();
  const CLIPS = clips as ClipsType;

  useEffect(() => {
    const drumMachineDiv = document.getElementById("drum-machine");
    if (drumMachineDiv) {
      drumMachineDiv.focus();
    }
  }, []);

  return (
    <div
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      id="drum-machine"
      className="rounded-xl bg-neutral-400/40 backdrop-blur-md shadow-sky-500/70 shadow-ring m-auto min-w-[250px] max-w-[650px] flex flex-col gap-y-5 items-center"
    >
      <div>
        {banks.map((bank) => (
          <div className="relative">
            <button
              className={`${
                bank == "clip1" ? "hidden" : ""
              } text-blue-700 text-lg text-center absolute -top-3  bg-neutral-100/50 backdrop-blur-md rounded-full px-2 w-7 transition ease  opacity-0 hover:opacity-100`}
              onClick={() => removebank!(bank === "clip1" ? "" : bank)}
            >
              x
            </button>
            <PadBank key={bank} clip={CLIPS[bank]} volume={volume} />
          </div>
        ))}
      </div>
      <Controls volume={volume} changeVolume={setVolume} />
    </div>
  );
}

export default App;
