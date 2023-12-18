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
  const [cubeAtBottom, setCubeAtBottom] = useState(false);
  const [cubeCoord, setCubeCoord] = useState({ y: 0, x: 0 });

  useEffect(() => {
    setСellsState(
      createCellsState(
        0,
        Math.floor(columnsCount / 2) - 1,
        linesCount,
        columnsCount
      )
    );
  }, [fieldSettings]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (!cubeAtBottom) {
        switch (e.key) {
          case "ArrowDown":
            setCubeCoord((prev) => ({
              ...prev,
              y: prev.y + 1 > linesCount - 1 ? linesCount - 1 : prev.y + 1,
            }));
            break;
          case "ArrowUp":
            setCubeCoord((prev) => ({
              ...prev,
              y: prev.y - 1 < 0 ? 0 : prev.y - 1,
            }));
            break;
          case "ArrowLeft":
            setCubeCoord((prev) => ({
              ...prev,
              x: prev.x - 1 < 0 ? 0 : prev.x - 1,
            }));
            break;
          case "ArrowRight":
            setCubeCoord((prev) => ({
              ...prev,
              x: prev.x + 1 > columnsCount - 1 ? columnsCount - 1 : prev.x + 1,
            }));
            break;
        }
      }
    };

    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [cellsState, linesCount, columnsCount]);

  useEffect(() => {
    if (cubeCoord.y >= 19) {
      setCubeAtBottom(true);
    }
  }, [cubeCoord]);

  useEffect(() => {
    if (!cubeAtBottom) {
      setСellsState(
        createCellsState(cubeCoord.y, cubeCoord.x, linesCount, columnsCount)
      );
    }
  }, [cubeCoord]);

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
