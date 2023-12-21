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
  if (linesCount > 0 && columnsCount > 0) {
    for (let i = 0; i < linesCount; i++) {
      result[i] = new Array();
      for (let j = 0; j < columnsCount; j++) {
        result[i][j] = false;
      }
    }

    result[y][x] = true;

    return result;
  } else {
    return [];
  }
}

const Field = () => {
  const { fieldSettings } = useFieldSettings();
  const { cellSize, linesCount, columnsCount } = fieldSettings;
  const [cellsState, setСellsState] = useState<boolean[][]>([]);
  const [activeCellCoords, setActiveCellCoords] = useState({
    y: 0,
    x: Math.floor(columnsCount / 2) - 1,
  });

  const isBottom = useMemo(
    () => activeCellCoords.y === linesCount - 1,
    [activeCellCoords]
  );

  useEffect(() => {
    setСellsState(
      createCellsState(
        activeCellCoords.x,
        activeCellCoords.y,
        linesCount,
        columnsCount
      )
    );
    setActiveCellCoords({ x: Math.floor(columnsCount / 2) - 1, y: 0 });
  }, [linesCount, columnsCount]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      let newX = activeCellCoords.x;
      let newY = activeCellCoords.y;
      if (isBottom) {
        return;
      } else {
        switch (e.key) {
          case "ArrowDown":
            newY++;
            break;
          case "ArrowUp":
            newY--;
            break;
          case "ArrowLeft":
            newX--;
            break;
          case "ArrowRight":
            newX++;
            break;
        }

        if (
          newY >= 0 &&
          newY < linesCount &&
          newX >= 0 &&
          newX < columnsCount
        ) {
          setСellsState(createCellsState(newX, newY, linesCount, columnsCount));
          setActiveCellCoords({ x: newX, y: newY });
        }
      }
    };
    console.log("cellState: ", cellsState);
    console.log("activeCoords: ", activeCellCoords);
    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [linesCount, columnsCount, activeCellCoords, isBottom]);

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
