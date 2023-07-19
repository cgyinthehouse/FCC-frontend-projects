import { useContext, useState } from "react";
import { KeyContext } from "../context/KeyContext";

export const useKeys = () => {
  const { pressedKey, handleKeyUp, handleKeyDown } = useContext(KeyContext);
  return { pressedKey, handleKeyDown, handleKeyUp };
};

export const useDisplay = () => {
  const { currentDisplay, handleDisplay } = useContext(KeyContext);
  return { currentDisplay, handleDisplay };
};

export const useBanks = () => {
  const { addbank, removebank, banks } = useContext(KeyContext);
  return { addbank, removebank, banks };
};

export const useVolume = (): [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [volume, setVolume] = useState<string>("0.69");
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(e.target.value);
  };

  return [volume, changeVolume];
};
