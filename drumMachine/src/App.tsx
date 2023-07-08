import PadBank from "./components/PadBank";
import Controls from "./components/Controls";
import clips from "./data/clips.json";
import { useKeys } from "./hooks/useKeys";
import { useVolume } from "./hooks/useVolume";

function App() {
  const { currentDisplay, handleKeyDown, handleKeyUp } = useKeys();
  const [volume, setVolume] = useVolume();

  return (
    <div
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      id="drum-machine"
      className="bg-gray-300 m-auto min-w-[250px] max-w-[650px] flex flex-col gap-y-5 items-center"
    >
      <div>
        <PadBank clip={clips.clip1} volume={volume} />
        <PadBank clip={clips.clip2} volume={volume} />
        {/* <PadBank clip={clips.clip3} /> */}
      </div>
      <Controls
        volume={volume}
        display={currentDisplay}
        changeVolume={setVolume}
      />
    </div>
  );
}

export default App;
