"use client";

import Cell from "./Сell";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFieldSettings } from "../providers/FieldSettingsProvider";

const FieldSpace = styled.div<{
  $height: number;
  $width: number;
}>`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  height: ${(props) => props.$height}px;
  width: ${(props) => props.$width}px;
  flex-wrap: wrap;
`;

type CellСoordArr = number[][];

const Field = () => {
  const { fieldSettings } = useFieldSettings();
  const { cellSize, linesCount, columnsCount } = fieldSettings;
  const [cellsState, setСellsState] = useState<CellСoordArr>([]);
  const [activeCell, setActiveCell] = useState([1, 1]);

  useEffect(() => {
    const fieldArr: CellСoordArr = [];
    for (let i = 1; i < columnsCount + 1; i++) {
      for (let j = 1; j < linesCount + 1; j++) {
        fieldArr.push([i, j]);
      }
    }

    setСellsState(fieldArr);
  }, [fieldSettings]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          if (activeCell[1] >= 0 && activeCell[1] < linesCount) {
            setActiveCell((prev) => [prev[0], prev[1]++]);
          }
          break;
        case "ArrowUp":
          if (activeCell[1] > 1 && activeCell[1] <= linesCount) {
            setActiveCell((prev) => [prev[0], prev[1]--]);
          }
          break;
        case "ArrowLeft":
          if (activeCell[0] > 1 && activeCell[0] <= columnsCount) {
            setActiveCell((prev) => [prev[0]--, prev[1]]);
          }
          break;
        case "ArrowRight":
          if (activeCell[0] >= 0 && activeCell[0] < columnsCount) {
            setActiveCell((prev) => [prev[0]++, prev[1]]);
          }
          break;
      }
    };

    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [activeCell]);

  return (
    <FieldSpace
      $height={cellSize * linesCount}
      $width={cellSize * columnsCount}>
      {cellsState.map((item, i) => {
        return (
          <Cell
            key={i}
            size={cellSize}
            isFilled={JSON.stringify(item) === JSON.stringify(activeCell)}
          />
        );
      })}
    </FieldSpace>
  );
};

export default Field;
