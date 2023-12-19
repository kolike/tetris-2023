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
  result[x][y] = true;

  return result;
}

const Field = () => {
  const { fieldSettings } = useFieldSettings();
  const { cellSize, linesCount, columnsCount } = fieldSettings;
  const [cellsState, setСellsState] = useState<boolean[][]>([]);
  const [activeCellCoords, setActiveCellCoords] = useState({
    x: 0,
    y: Math.floor(columnsCount / 2) - 1,
  });
  const isBottom = useMemo(
    () => activeCellCoords.x == linesCount - 1,
    [activeCellCoords]
  );

  useEffect(() => {
    setСellsState(
      createCellsState(
        0,
        Math.floor(columnsCount / 2) - 1,
        linesCount,
        columnsCount
      )
    );
  }, []);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (!isBottom) {
        switch (e.key) {
          case "ArrowDown":
            if (activeCellCoords.x < linesCount - 1) {
              moveBlock(1, 0);
            }
            break;
          case "ArrowUp":
            if (activeCellCoords.x > 0) {
              moveBlock(-1, 0);
            }
            break;
          case "ArrowLeft":
            if (activeCellCoords.y > 0) {
              moveBlock(0, -1);
            }
            break;
          case "ArrowRight":
            if (activeCellCoords.y < columnsCount - 1) {
              moveBlock(0, 1);
            }
            break;
        }
      }
    };

    setСellsState(
      createCellsState(
        activeCellCoords.x,
        activeCellCoords.y,
        linesCount,
        columnsCount
      )
    );

    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [linesCount, columnsCount, activeCellCoords]);

  const moveBlock = (i: number, j: number) => {
    if (!isBottom) {
      setActiveCellCoords((prev) => ({
        x: prev.x + i,
        y: prev.y + j,
      }));
    }
  };

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
