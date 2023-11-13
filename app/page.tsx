"use client";

import Field from "./components/Field";
import FieldSettings from "./components/FieldSettings";
import styled from "styled-components";
import { useState } from "react";
import { fieldSettingsContext } from "./components/FieldSettingsContext";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export type Settings = {
  cellSize: number;
  linesCount: number;
  columnsCount: number;
};

export default function Home() {
  const [fieldSettings, setFieldSettings] = useState<Settings>({
    cellSize: 20,
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
