import { useEffect, useRef, useState, useCallback } from "react";
import { useKeys } from "../hooks/useKeys";

type Props = {
  keyTrigger: string;
  src: string;
  clip: string;
  vol: string;
};
const Drumpad = ({ keyTrigger, src, clip, vol }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { pressedKey, handleDisplay } = useKeys();
  const [pressed, setPressed] = useState<boolean>(false);

  const play = useCallback(() => {
    if (handleDisplay) handleDisplay(clip);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [handleDisplay, clip]);

  useEffect(() => {
    if (pressedKey === keyTrigger.toLowerCase()) {
      setPressed(true);
      play();
    }
    audioRef!.current!.volume = Number(vol);
    return () => setPressed(false);
  }, [pressed, pressedKey, keyTrigger, play, vol]);

  return (
    <div
      className={`${
        pressed
          ? "bg-violet-500/50 text-green-400 shadow-teal-300 shadow-xl"
          : "text-slate-700 shadow-fuchsia-300 shadow-md"
      } drum-pad rounded-lg hover:bg-opacity-50 bg-neutral-400 active:bg-violet-500/50 active:text-green-400 active:shadow-teal-300 active:shadow-xl p-4 w-14 text-center font-semibold`}
      onClick={play}
    >
      <audio ref={audioRef} src={src} className="clip" id={keyTrigger}></audio>
      {keyTrigger}
    </div>
  );
};

export default Drumpad;
