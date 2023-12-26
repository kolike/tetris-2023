"use client";

import React from "react";
import styled from "styled-components";
import { useFieldSettings } from "../providers/FieldSettingsProvider";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

const FieldSettings = () => {
  const { fieldSettings, setFieldSettings } = useFieldSettings();
  return (
    <Container>
      <label htmlFor="line">Enter number of lines</label>
      <input
        id="line"
        type="number"
        placeholder="Number"
        value={fieldSettings.linesCount}
        onChange={(e) => {
          if (+e.target.value <= 0 || +e.target.value > 50) {
            setFieldSettings((prev) => ({
              ...prev,
              linesCount: 1,
            }));
          } else {
            setFieldSettings((prev) => ({
              ...prev,
              linesCount: +e.target.value,
            }));
          }
        }}
      />
      <label htmlFor="column">Enter number of columns</label>
      <input
        id="column"
        type="number"
        placeholder="Number"
        value={fieldSettings.columnsCount}
        onChange={(e) => {
          if (+e.target.value <= 0 || +e.target.value > 50) {
            setFieldSettings((prev) => ({
              ...prev,
              columnsCount: 1,
            }));
          } else {
            setFieldSettings((prev) => ({
              ...prev,
              columnsCount: +e.target.value,
            }));
          }
        }}
      />
      <label htmlFor="cellSize">Enter cell size</label>
      <input
        id="cellSize"
        type="text"
        placeholder="Number"
        value={fieldSettings.cellSize}
        onChange={(e) =>
          setFieldSettings((prev) => ({
            ...prev,
            cellSize: +e.target.value,
          }))
        }
      />
    </Container>
  );
};

export default FieldSettings;
