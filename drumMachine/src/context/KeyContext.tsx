import { ReactNode, createContext, useState } from "react";

interface contextType {
  currentDisplay: string;
  pressedKey: string;
  banks: string[];
  handleKeyDown?: (e: KeyboardEvent) => void;
  handleKeyUp?: () => void;
  handleDisplay?: (d: string) => void;
  addbank?: (bank: string) => void;
  removebank?: (bank: string) => void;
}

export const KeyContext = createContext<contextType>({
  currentDisplay: "",
  pressedKey: "",
  banks: ["clip1"],
});

export default function KeyDownProvider({ children }: { children: ReactNode }) {
  const [pressedKey, setPressedKey] = useState("");
  const [currentDisplay, setCurrentDisplay] = useState("");
  const [banks, setBanks] = useState<string[]>(["clip1"]);
  const handleKeyDown = (e: KeyboardEvent) => {
    setPressedKey(e.key);
  };
  const handleKeyUp = () => {
    setPressedKey("");
  };

  const handleDisplay = (d: string) => {
    setCurrentDisplay(d);
  };

  const addbank = (bank: string) => {
    if (banks.includes(bank)) return;
    setBanks([...banks, bank]);
  };

  const removebank = (bank: string) => {
    setBanks(banks.filter((b) => b !== bank));
  };

  return (
    <KeyContext.Provider
      value={{
        currentDisplay,
        pressedKey,
        banks,
        addbank,
        removebank,
        handleKeyDown,
        handleKeyUp,
        handleDisplay,
      }}
    >
      {children}
    </KeyContext.Provider>
  );
}
