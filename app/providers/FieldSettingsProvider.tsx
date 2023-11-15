"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useContext,
} from "react";

interface Props {
  children: React.ReactNode;
}

type Settings = {
  cellSize: number;
  linesCount: number;
  columnsCount: number;
};

interface SettingsContext {
  fieldSettings: Settings;
  setFieldSettings: Dispatch<SetStateAction<Settings>>;
}

const fieldSettingsContext = createContext<SettingsContext>({
  fieldSettings: {
    cellSize: 0,
    linesCount: 0,
    columnsCount: 0,
  },
  setFieldSettings: () => {},
});

export const FieldSettingsProvider = ({ children }: Props) => {
  const [fieldSettings, setFieldSettings] = useState<Settings>({
    cellSize: 20,
    linesCount: 1,
    columnsCount: 2,
  });

  return (
    <fieldSettingsContext.Provider value={{ fieldSettings, setFieldSettings }}>
      {children}
    </fieldSettingsContext.Provider>
  );
};

export const useFieldSettings = () => {
  return useContext(fieldSettingsContext);
};
