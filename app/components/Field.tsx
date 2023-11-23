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
  lines: number,
  columns: number
) {
  const result: boolean[][] = [];

  for (let i = 0; i < lines; i++) {
    result[i] = new Array();
    for (let j = 0; j < columns; j++) {
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
          if (i >= 0 && i < linesCount - 1) {
            i++;
          }
          break;
        case "ArrowUp":
          if (i > 0 && i <= linesCount) {
            i--;
          }
          break;
        case "ArrowLeft":
          if (j > 0 && j <= columnsCount) {
            j--;
          }
          break;
        case "ArrowRight":
          if (j >= 0 && j < columnsCount - 1) {
            j++;
          }
          break;
      }
      setСellsState(createCellsState(i, j, linesCount, columnsCount));
    };

    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [cellsState]);

  return (
    <FieldSpace
      $height={cellSize * linesCount}
      $width={cellSize * columnsCount}>
      {cellsState.map((row) => {
        return row.map((isFilled, i) => {
          return <Cell key={i} size={cellSize} isFilled={isFilled} />;
        });
      })}
    </FieldSpace>
  );
};

export default Field;
