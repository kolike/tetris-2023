"use client";

import React, { useContext } from "react";
import styled from "styled-components";
import { useSettings } from "./hooks/useSettings";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

const FieldSettings = () => {
  const { fieldSettings, setFieldSettings } = useSettings();
  return (
    <Container>
      <label htmlFor="line">Enter number of lines</label>
      <input
        id="line"
        type="text"
        placeholder="Number"
        value={fieldSettings.linesCount}
        onChange={(e) =>
          setFieldSettings((prev) => ({
            ...prev,
            linesCount: +e.target.value,
          }))
        }
      />
      <label htmlFor="column">Enter number of columns</label>
      <input
        id="column"
        type="text"
        placeholder="Number"
        value={fieldSettings.columnsCount}
        onChange={(e) =>
          setFieldSettings((prev) => ({
            ...prev,
            columnsCount: +e.target.value,
          }))
        }
      />

      <label htmlFor="cellSize">Enter cell width</label>
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
