"use client";

import Field from "./components/Field";
import FieldSettings from "./components/FieldSettings";
import styled from "styled-components";
import { useState, createContext, useContext } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export type Settings = {
  cellWidth: number;
  linesCount: number;
  columnsCount: number;
};

export type SettingsContext = {
  fieldSettings: {
    cellWidth: number;
    linesCount: number;
    columnsCount: number;
  };
  setFieldSettings: (prev: any) => void;
};

export const fieldSettingsContext = createContext<SettingsContext>({
  fieldSettings: {
    cellWidth: 0,
    linesCount: 0,
    columnsCount: 0,
  },
  setFieldSettings: () => {},
});

export default function Home() {
  const [fieldSettings, setFieldSettings] = useState<Settings>({
    cellWidth: 20,
    linesCount: 20,
    columnsCount: 10,
  });

  return (
    <Container>
      <fieldSettingsContext.Provider
        value={{ fieldSettings, setFieldSettings }}>
        <FieldSettings />
        <Field />
      </fieldSettingsContext.Provider>
    </Container>
  );
}
