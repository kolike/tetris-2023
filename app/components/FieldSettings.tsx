"use client";

import React, { useContext } from "react";
import styled from "styled-components";
import type { Settings } from "../page";
import { fieldSettingsContext } from "../page";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

const FieldSettings = () => {
  const useSettingsContext = () => useContext(fieldSettingsContext);
  const { fieldSettings, setFieldSettings } = useSettingsContext();
  return (
    <Container>
      <label htmlFor="line">Enter number of lines</label>
      <input
        id="line"
        type="text"
        placeholder="Number"
        value={fieldSettings.linesCount}
        onChange={(e) =>
          setFieldSettings((prev: Settings) => ({
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
          setFieldSettings((prev: Settings) => ({
            ...prev,
            columnsCount: +e.target.value,
          }))
        }
      />

      <label htmlFor="cellWidth">Enter cell width</label>
      <input
        id="cellWidth"
        type="text"
        placeholder="Number"
        value={fieldSettings.cellWidth}
        onChange={(e) =>
          setFieldSettings((prev: Settings) => ({
            ...prev,
            cellWidth: +e.target.value,
          }))
        }
      />
    </Container>
  );
};
export default FieldSettings;
