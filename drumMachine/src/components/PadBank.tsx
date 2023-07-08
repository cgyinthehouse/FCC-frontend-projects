import Drumpad from "./Drumpad";

const defaultKeys = Array.from("ASDFGHJKL");
// TODO: eliminate key conflicts with preset keys in json

type Props = {
  clip: {
    src: string;
    clip: string;
    key?: string;
  }[];
  volume: string;
};

const PadBank = ({ clip, volume }: Props) => {
  return (
    <div className="m-3 p-2 rounded-lg ring-2 ring-cyan-500/50 grid grid-cols-3 lg:grid-cols-9 gap-2 w-max max-w-[210px] lg:max-w-full place-items-center shadow-md">
      {clip.map((n, i) => (
        <Drumpad
          key={n.clip}
          src={n.src}
          clip={n.clip}
          keyTrigger={n.key || defaultKeys[i]}
          vol={volume}
        />
      ))}
    </div>
  );
};

export default PadBank;
