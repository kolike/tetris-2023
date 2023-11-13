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
  return (
    <Container>
      <FieldSettings />
      <Field />
    </Container>
  );
}
