"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface Props {
  children: JSX.Element | JSX.Element[];
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
    linesCount: 20,
    columnsCount: 10,
  });

  return (
    <fieldSettingsContext.Provider value={{ fieldSettings, setFieldSettings }}>
      {children}
    </fieldSettingsContext.Provider>
  );
};

import { useContext } from "react";

export const useSettings = () => {
  return useContext(fieldSettingsContext);
};
