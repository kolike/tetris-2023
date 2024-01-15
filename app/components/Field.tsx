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
  if (x < 0) {
    return result;
  }
  result[y][x] = true;

  return result;
}

const Field = () => {
  const { fieldSettings } = useFieldSettings();
  const { cellSize, linesCount, columnsCount } = fieldSettings;
  const [cellsState, setСellsState] = useState<boolean[][]>([]);
  const [constCellsState, setConstСellsState] = useState<boolean[][]>([]);
  const [activeCellCoords, setActiveCellCoords] = useState({
    y: 0,
    x: 0,
  });

  function fillCellsField() {
    const arr = [];
    for (let i = 0; i < columnsCount; i++) {
      arr[i] = false;
    }
    return arr;
  }

  useEffect(() => {
    setСellsState(
      createCellsState(
        Math.floor(columnsCount / 2),
        0,
        linesCount,
        columnsCount
      )
    );
    setConstСellsState(createCellsState(-1, 0, linesCount, columnsCount));
    setActiveCellCoords({ x: Math.floor(columnsCount / 2), y: 0 });
  }, [linesCount, columnsCount]);

  useEffect(() => {
    let newX = activeCellCoords.x;
    let newY = activeCellCoords.y;
    const timerId = setTimeout(() => {
      newY = newY + 1;
      moveCube(newX, newY);
    }, 1000);

    if (constCellsState.length >= linesCount) {
      for (let i = 0; i < columnsCount; i++) {
        if (
          !constCellsState[i].includes(false) &&
          !constCellsState[newY + 1][i]
        ) {
          setConstСellsState((prev) => {
            const arr = [...prev];
            arr.splice(i, 1);
            arr.unshift(fillCellsField());
            return arr;
          });
          // setActiveCellCoords({ x: Math.floor(columnsCount / 2), y: 0 });
          return;
        }
      }
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [cellsState]);

  function moveCube(newX: number, newY: number) {
    if (constCellsState[newY][newX]) {
      return;
    }
    if (newY == linesCount - 1 || constCellsState[newY + 1][newX]) {
      setСellsState(
        createCellsState(
          Math.floor(columnsCount / 2),
          0,
          linesCount,
          columnsCount
        )
      );
      setConstСellsState((prev) => {
        const arr = [...prev];
        arr[newY][newX] = true;
        return arr;
      });
      setActiveCellCoords({ x: Math.floor(columnsCount / 2), y: 0 });
      return;
    }

    if (newY >= 0 && newY < linesCount && newX >= 0 && newX < columnsCount) {
      setСellsState((prev) => {
        const arr = [...prev];
        arr[activeCellCoords.y][activeCellCoords.x] = false;
        arr[newY][newX] = true;
        return arr;
      });
      setActiveCellCoords({ x: newX, y: newY });
      return;
    }
  }

  function onKeydown(e: KeyboardEvent) {
    let newX = activeCellCoords.x;
    let newY = activeCellCoords.y;
    switch (e.key) {
      case "ArrowDown":
        newY++;
        break;
      case "ArrowLeft":
        newX--;
        break;
      case "ArrowRight":
        newX++;
        break;
    }
    moveCube(newX, newY);
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    console.log("activecoords: ", activeCellCoords);
    console.log("cell: ", cellsState);
    console.log("ConstCell: ", constCellsState);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [linesCount, columnsCount, activeCellCoords]);

  function logicallyMultiplyCells(arr1: boolean[][], arr2: boolean[][]) {
    let result: boolean[][] = [[]];
    if (arr1.length > 2 && arr2.length > 2) {
      for (let i = 0; i < linesCount; i++) {
        result[i] = new Array();
        for (let j = 0; j < columnsCount; j++) {
          result[i][j] = arr1[i][j] || arr2[i][j];
        }
      }
    }

    return result;
  }

  return (
    <FieldSpace
      $height={cellSize * linesCount}
      $width={cellSize * columnsCount}>
      {logicallyMultiplyCells(cellsState, constCellsState).map((row, i) => {
        return row.map((isFilled, j) => {
          return <Cell key={`${i}-${j}`} size={cellSize} isFilled={isFilled} />;
        });
      })}
    </FieldSpace>
  );
};

export default Field;
