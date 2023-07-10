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
    if (pressedKey.toLowerCase() === keyTrigger.toLowerCase()) {
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
          ? "text-rose-300 shadow-teal-300 shadow-xl"
          : "text-teal-300 shadow-fuchsia-300 shadow-md"
      } drum-pad rounded-lg hover:bg-gray-300/30 bg-neutral-400/70 active:text-rose-300 active:shadow-teal-300 active:shadow-xl p-4 w-14 text-center font-semibold font-montserrat`}
      id={clip}
      onClick={play}
    >
      <audio ref={audioRef} src={src} className="clip" id={keyTrigger}></audio>
      {keyTrigger}
    </div>
  );
};

export default Drumpad;
