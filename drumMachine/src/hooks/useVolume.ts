import { useState } from "react";

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
