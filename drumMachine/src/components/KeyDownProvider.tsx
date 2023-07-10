import { ReactNode, KeyboardEvent, useState, createContext } from "react";

interface contextType {
  currentDisplay: string;
  pressedKey: string;
  banks: string[];
  handleKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
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
  const [pressedKey, setPressedKey] = useState<string>("");
  const [currentDisplay, setCurrentDisplay] = useState<string>("");
  const [banks, setBanks] = useState<string[]>(["clip1"]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
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

  const removebank = (bank?: string) => {
    if (bank) setBanks(banks.filter((b) => b !== bank));
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
