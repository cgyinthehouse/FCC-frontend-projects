import { useRef, useCallback } from "react";
import { useKeys } from "../hooks/useKeys";

type Props = {
  volume: string;
  changeVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Controls = ({ volume, changeVolume }: Props) => {
  const { currentDisplay, handleDisplay, addbank, banks } = useKeys();
  const timeoutRef = useRef<number | undefined>();
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleVolume = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      changeVolume(e);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        handleDisplay && handleDisplay("freecodecamp(🔥)");
      }, 2000);

      handleDisplay && handleDisplay("volume: " + e.target.value);
    },
    [changeVolume, handleDisplay]
  );

  return (
    <div className="mx-auto mb-4 3/4 lg:w-3/5 font-montserrat font-semibold tracking-wide  space-y-4">
      {/* display */}
      <p
        className="whitespace-nowrap mx-auto py-2 rounded-lg w-[90%] h-10 text-base text-center text-emerald-300  bg-neutral-400/30 overflow-auto shadow-md"
        id="display"
      >
        {currentDisplay}
      </p>

      {/* volume slider */}
      <div className="flex justify-center items-center mx-4">
        <p>🔉:</p>
        <input
          className="mx-4 w-[120px] lg:w-[200px]"
          value={volume}
          onChange={handleVolume}
          type="range"
          min="0"
          max="1"
          step="0.01"
        />
      </div>

      <div className="flex justify-center items-center mx-4">
        <p>🎵:</p>
        <select
          ref={selectRef}
          name="bank"
          className="mx-4 w-[120px] lg:w-[200px] text-center bg-transparent text-sky-300 hover:text-violet-300"
        >
          <option value="">Select a clip</option>
          <option disabled={banks.includes("clip2")} value="clip2">
            Clip2
          </option>
          <option disabled={banks.includes("clip3")} value="clip3">
            Clip3
          </option>
        </select>
        <button
          title="add clip"
          className="text-sky-300 hover:text-violet-300 text-lg "
          onClick={() =>
            selectRef.current!.value && addbank!(selectRef.current!.value)
          }
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Controls;
