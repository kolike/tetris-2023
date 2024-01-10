"use client";

import Cell from "./Сell";
import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { useFieldSettings } from "../providers/FieldSettingsProvider";

const FieldSpace = styled.div<{
  $height: number;
  $width: number;
  $color: string;
}>`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  height: ${(props) => props.$height}px;
  width: ${(props) => props.$width}px;
  flex-wrap: wrap;
  background-color: ${(props) => props.$color};
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
  const [gameOver, setGameOver] = useState(false);

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
    setActiveCellCoords({ x: Math.floor(columnsCount / 2), y: 0 });
  }, [linesCount, columnsCount]);

  useEffect(() => {
    if (cellsState.length >= columnsCount) {
      if (cellsState[activeCellCoords.y + 1][activeCellCoords.x]) {
        setGameOver((prev) => !prev);
      }
    }
  }, [cellsState]);

  useEffect(() => {
    if (gameOver) {
      return;
    }
    let newX = activeCellCoords.x;
    let newY = activeCellCoords.y;
    const timerId = setTimeout(() => {
      newY = newY + 1;
      moveCube(newX, newY);
    }, 1000);

    if (cellsState.length > 2) {
      for (let i = 0; i < columnsCount; i++) {
        if (!cellsState[i].includes(false) && !cellsState[newY + 1][i]) {
          setСellsState((prev) => {
            const arr = [...prev];
            arr.splice(i, 1);
            arr.unshift(fillCellsField());
            arr[0][Math.floor(columnsCount / 2)] = true;
            arr[1][Math.floor(columnsCount / 2)] = false;
            return arr;
          });
          setActiveCellCoords({ x: Math.floor(columnsCount / 2), y: 0 });
          return;
        }
      }
    }
    console.log("activecoords: ", activeCellCoords);
    console.log("cell: ", cellsState);

    return () => {
      clearTimeout(timerId);
    };
  }, [cellsState]);

  function moveCube(newX: number, newY: number) {
    if (gameOver) {
      return;
    }
    if (cellsState[newY][newX]) {
      return;
    } else if (newY == linesCount - 1 || cellsState[newY + 1][newX]) {
      setСellsState((prev) => {
        const arr = [...prev];
        arr[activeCellCoords.y][activeCellCoords.x] = false;
        arr[newY][newX] = true;
        arr[0][Math.floor(columnsCount / 2)] = true;
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
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (gameOver) {
      return;
    }
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

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [linesCount, columnsCount, activeCellCoords]);

  return (
    <>
      <FieldSpace
        $height={cellSize * linesCount}
        $width={cellSize * columnsCount}
        $color={gameOver ? "red" : ""}>
        {!gameOver ? (
          cellsState.map((row, i) => {
            return row.map((isFilled, j) => {
              return (
                <Cell key={`${i}-${j}`} size={cellSize} isFilled={isFilled} />
              );
            });
          })
        ) : (
          <div>Game Over!</div>
        )}
      </FieldSpace>
    </>
  );
};

export default Field;
