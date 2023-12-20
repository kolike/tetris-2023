"use client";

import Cell from "./Сell";
import React, { useEffect, useState, useMemo } from "react";
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
  result[y][x] = true;

  return result;
}

const Field = () => {
  const { fieldSettings } = useFieldSettings();
  const { cellSize, linesCount, columnsCount } = fieldSettings;
  const [cellsState, setСellsState] = useState<boolean[][]>([]);
  const [activeCellCoords, setActiveCellCoords] = useState({
    y: 0,
    x: 0,
  });

  const isBottom = useMemo(
    () => activeCellCoords.y == linesCount - 1,
    [activeCellCoords]
  );

  useEffect(() => {
    setСellsState(
      createCellsState(
        Math.floor(columnsCount / 2) - 1,
        activeCellCoords.y,
        linesCount,
        columnsCount
      )
    );
    setActiveCellCoords({ x: Math.floor(columnsCount / 2) - 1, y: 0 });
  }, [linesCount, columnsCount]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      let i = activeCellCoords.x;
      let j = activeCellCoords.y;
      if (!isBottom) {
        switch (e.key) {
          case "ArrowDown":
            j++;
            break;
          case "ArrowUp":
            j--;
            break;
          case "ArrowLeft":
            i--;
            break;
          case "ArrowRight":
            i++;
            break;
        }

        if (j >= 0 && j < linesCount && i >= 0 && i < columnsCount) {
          setСellsState(createCellsState(i, j, linesCount, columnsCount));
          setActiveCellCoords({ x: i, y: j });
        }
      }
    };

    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [linesCount, columnsCount, activeCellCoords]);

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
