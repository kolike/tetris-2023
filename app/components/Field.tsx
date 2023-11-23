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

type CellBoolArr = boolean[][];

const Field = () => {
  const { fieldSettings } = useFieldSettings();
  const { cellSize, linesCount, columnsCount } = fieldSettings;
  const [cellsState, setСellsState] = useState<CellBoolArr>([]);

  useEffect(() => {
    setСellsState(createFild(0, 0));
  }, [linesCount, columnsCount]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      let coord = { i: 0, j: 0 };

      for (let i = 0; i < cellsState.length; i++) {
        if (cellsState[i].includes(true)) {
          for (let j = 0; j < cellsState[i].length; j++) {
            if (cellsState[i][j]) {
              coord = { i, j };
            }
          }
        }
      }

      let { i, j } = coord;

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
      setСellsState(createFild(i, j));
    };

    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [cellsState]);

  function createFild(x: number, y: number) {
    const fieldArr: CellBoolArr = [];

    for (let i = 0; i < linesCount; i++) {
      fieldArr[i] = new Array();
    }

    for (let i = 0; i < linesCount; i++) {
      for (let j = 0; j < columnsCount; j++) {
        fieldArr[i][j] = false;
      }
    }
    fieldArr[x][y] = true;

    return fieldArr;
  }

  return (
    <FieldSpace
      $height={cellSize * linesCount}
      $width={cellSize * columnsCount}>
      {cellsState.map((item) => {
        return item.map((newItem, i) => {
          return <Cell key={i} size={cellSize} isFilled={newItem} />;
        });
      })}
    </FieldSpace>
  );
};

export default Field;
