"use client";

import { useContext } from "react";
import fieldSettingsCreateContext from "../../layout";

export const useSettings = () => {
  const useSettingsContext = () => useContext(fieldSettingsCreateContext);
  return useSettingsContext();
};
