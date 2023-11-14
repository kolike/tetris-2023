import { fieldSettingsContext } from "../providers/FieldSettingsProvider";
import { useContext } from "react";

export const useSettings = () => {
  return useContext(fieldSettingsContext);
};
