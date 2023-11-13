import { createContext, useContext } from "react";
import type { Settings } from "../page";

type setFieldSettings = (prev: Settings) => {
  cellSize: number;
  linesCount: number;
  columnsCount: number;
};

export type SettingsContext = {
  fieldSettings: {
    cellSize: number;
    linesCount: number;
    columnsCount: number;
  };
  setFieldSettings: (prev: setFieldSettings) => void;
};

export const fieldSettingsContext = createContext<SettingsContext>({
  fieldSettings: {
    cellSize: 0,
    linesCount: 0,
    columnsCount: 0,
  },
  setFieldSettings: () => {},
});

export const UseSettings = () => {
  const useSettingsContext = () => useContext(fieldSettingsContext);
  return useSettingsContext();
};
