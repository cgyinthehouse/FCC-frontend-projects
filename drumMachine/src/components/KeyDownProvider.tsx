import { ReactNode, KeyboardEvent, useState, createContext } from "react";

interface contextType {
  currentDisplay: string;
  pressedKey: string;
  handleKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  handleKeyUp?: () => void;
  handleDisplay?: (d: string) => void;
}

export const KeyContext = createContext<contextType>({
  currentDisplay: "",
  pressedKey: "",
});

export default function KeyDownProvider({ children }: { children: ReactNode }) {
  const [pressedKey, setPressedKey] = useState<string>("");
  const [currentDisplay, setCurrentDisplay] = useState<string>("");

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    setPressedKey(e.key);
  };
  const handleKeyUp = () => {
    setPressedKey("");
  };

  const handleDisplay = (d: string) => {
    setCurrentDisplay(d);
  };

  return (
    <KeyContext.Provider
      value={{
        currentDisplay,
        pressedKey,
        handleKeyDown,
        handleKeyUp,
        handleDisplay,
      }}
    >
      {children}
    </KeyContext.Provider>
  );
}
