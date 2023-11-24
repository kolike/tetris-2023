"use client";

import Cell from "./Сell";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useFieldSettings } from "../providers/FieldSettingsProvider";

const FieldSpace = styled.div<{
  $height: number;
  $width: number;
}>`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  height: ${(props) => props.$height}px;
  width: ${(props) => props.$width}px;
  flex-wrap: wrap;
`;

function createCellsState(
  x: number,
  y: number,
  linesCount: number,
  columnsCount: number
) {
  const result: boolean[][] = [];

  for (let i = 0; i < linesCount; i++) {
    result[i] = new Array();
    for (let j = 0; j < columnsCount; j++) {
      result[i][j] = false;
    }
  }
  result[x][y] = true;

  return result;
}

const Field = () => {
  const { fieldSettings } = useFieldSettings();
  const { cellSize, linesCount, columnsCount } = fieldSettings;
  const [cellsState, setСellsState] = useState<boolean[][]>([]);

  useEffect(() => {
    setСellsState(createCellsState(0, 0, linesCount, columnsCount));
  }, [linesCount, columnsCount]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      let indices = { i: 0, j: 0 };

      for (let i = 0; i < cellsState.length; i++) {
        if (cellsState[i].includes(true)) {
          for (let j = 0; j < cellsState[i].length; j++) {
            if (cellsState[i][j]) {
              indices = { i, j };
            }
          }
        }
      }

      let { i, j } = indices;

      switch (e.key) {
        case "ArrowDown":
          i++;
          break;
        case "ArrowUp":
          i--;
          break;
        case "ArrowLeft":
          j--;
          break;
        case "ArrowRight":
          j++;
          break;
      }
      if (i >= 0 && i <= linesCount - 1 && j >= 0 && j <= columnsCount - 1) {
        setСellsState(createCellsState(i, j, linesCount, columnsCount));
      }
    };

    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [cellsState, linesCount, columnsCount]);

  return (
    <FieldSpace
      $height={cellSize * linesCount}
      $width={cellSize * columnsCount}>
      {cellsState.map((row, i) => {
        return row.map((isFilled, j) => {
          return <Cell key={`${i}-${j}`} size={cellSize} isFilled={isFilled} />;
        });
      })}
    </FieldSpace>
  );
};

export default Field;
