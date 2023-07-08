type Props = {
  display: string;
  volume: string;
  changeVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Controls = ({ display, volume, changeVolume }: Props) => {
  return (
    <div className="mx-auto">
      {/* display */}
      <p id="display">{display}</p>

      {/* TODO show volume on display panel when changing volume*/}
      {/* volume slider */}
      <input
        value={volume}
        onChange={changeVolume}
        type="range"
        min="0"
        max="1"
        step="0.01"
      />

      {/* bank changer */}
      <select name="bank">
        <option>Select a clip</option>
        <option>Clip1</option>
        <option>Clip2</option>
        <option>Clip3</option>
      </select>

      {/* bank adder (up to 3 bnaks) */}
    </div>
  );
};

export default Controls;
