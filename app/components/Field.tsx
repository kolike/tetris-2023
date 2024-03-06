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

function getRandomNumberFromZeroToSix() {
  // const rnd = Math.floor(Math.random() * 7);
  const rnd = 0;
  return rnd;
}

function createCellsState(
  linesCount: number,
  columnsCount: number,
  a?: number,
  x?: number,
  y?: number
) {
  const result: boolean[][] = [];
  for (let i = 0; i < linesCount; i++) {
    result[i] = new Array();
    for (let j = 0; j < columnsCount; j++) {
      result[i][j] = false;
    }
  }
  if (a !== undefined && x !== undefined && y !== undefined) {
    switch (a) {
      //задел на будущие тетрамино
      case 0:
        result[y][x] = true;
        result[y][x + 1] = true;
        result[y + 1][x] = true;
        result[y + 1][x + 1] = true;
        break;
      default:
        console.log("ERROR");
        break;
    }
  }

  return result;
}

function createEmptyLine(lineSize: number) {
  const arr = [];
  for (let i = 0; i < lineSize; i++) {
    arr[i] = false;
  }
  return arr;
}

function mergeCellsStates(
  a: boolean[][],
  b: boolean[][],
  linesCount: number,
  columnsCount: number
) {
  let result: boolean[][] = [[]];
  if (a.length === linesCount && b.length === linesCount) {
    for (let i = 0; i < linesCount; i++) {
      result[i] = new Array();
      for (let j = 0; j < columnsCount; j++) {
        result[i][j] = a[i][j] || b[i][j];
      }
    }
  }

  return result;
}

const Field = () => {
  const { fieldSettings } = useFieldSettings();
  const { cellSize, linesCount, columnsCount } = fieldSettings;
  const [activeCellsState, setActiveCellsState] = useState<boolean[][]>([]);
  const [cellsState, setСellsState] = useState<boolean[][]>([]);
  const [activeCellCoords, setActiveCellCoords] = useState({
    y: 0,
    x: Math.floor(columnsCount / 2) - 1,
  });
  const randomIndexTetramino = getRandomNumberFromZeroToSix();

  // Инициаизация начального состояния
  useEffect(() => {
    setActiveCellsState(
      createCellsState(
        linesCount,
        columnsCount,
        randomIndexTetramino,
        activeCellCoords.x,
        activeCellCoords.y
      )
    );
    setСellsState(createCellsState(linesCount, columnsCount));
    setActiveCellCoords({ x: Math.floor(columnsCount / 2) - 1, y: 0 });
  }, [linesCount, columnsCount]);

  // Обработка пользовательского ввода
  useEffect(() => {
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
        default:
          return;
      }

      switch (randomIndexTetramino) {
        //задел на обработку будущих тетрамино
        case 0:
          if (
            cellsState[newY][newX] ||
            cellsState[newY][newX + 1] ||
            cellsState[newY + 1][newX] ||
            cellsState[newY + 1][newX + 1]
          ) {
            return;
          }

          if (
            newY == linesCount - 2 ||
            cellsState[newY + 2][newX] ||
            cellsState[newY + 2][newX + 1]
          ) {
            setActiveCellsState(
              createCellsState(linesCount, columnsCount, randomIndexTetramino)
            );
            setСellsState((prev) => {
              const arr = [...prev];
              arr[newY][newX] = true;
              arr[newY + 1][newX] = true;
              arr[newY][newX + 1] = true;
              arr[newY + 1][newX + 1] = true;
              return arr;
            });
            setActiveCellCoords({ x: Math.floor(columnsCount / 2) - 1, y: 0 });
            return;
          }

          if (
            newY >= 0 &&
            newY + 1 < linesCount &&
            newX >= 0 &&
            newX + 1 < columnsCount
          ) {
            setActiveCellsState((prev) => {
              const arr = [...prev];
              arr[activeCellCoords.y][activeCellCoords.x] = false;
              arr[activeCellCoords.y][activeCellCoords.x + 1] = false;
              arr[activeCellCoords.y + 1][activeCellCoords.x] = false;
              arr[activeCellCoords.y + 1][activeCellCoords.x + 1] = false;
              arr[newY][newX] = true;
              arr[newY + 1][newX] = true;
              arr[newY][newX + 1] = true;
              arr[newY + 1][newX + 1] = true;
              return arr;
            });
            setActiveCellCoords({ x: newX, y: newY });
            return;
          }
          break;

        default:
          break;
      }
    }

    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [
    activeCellsState,
    cellsState,
    activeCellCoords,
    linesCount,
    columnsCount,
  ]);

  // Удаление заполненной строки
  useEffect(() => {
    let newY = activeCellCoords.y;

    if (cellsState.length >= linesCount) {
      for (let i = 0; i < linesCount; i++) {
        if (!cellsState[i].includes(false) && !cellsState[newY + 1][i]) {
          setСellsState((prev) => {
            const arr = [...prev];
            arr.splice(i, 1);
            arr.unshift(createEmptyLine(columnsCount));
            return arr;
          });
          return;
        }
      }
    }
  }, [cellsState]);

  // console.log("activeCellCoords: ", activeCellCoords);
  // console.log("activeCellsState: ", activeCellsState);
  // console.log("cellsState: ", cellsState);

  return (
    <FieldSpace
      $height={cellSize * linesCount}
      $width={cellSize * columnsCount}>
      {mergeCellsStates(
        activeCellsState,
        cellsState,
        linesCount,
        columnsCount
      ).map((row, i) => {
        return row.map((isFilled, j) => {
          return <Cell key={`${i}-${j}`} size={cellSize} isFilled={isFilled} />;
        });
      })}
    </FieldSpace>
  );
};

export default Field;
