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

type CellBoolArr = boolean[][];

const Field = () => {
  const { fieldSettings } = useFieldSettings();
  const { cellSize, linesCount, columnsCount } = fieldSettings;
  const [cellsState, setСellsState] = useState<CellBoolArr>([]);
  const [coordX, setCoordX] = useState(1);
  const [coordY, setCoordY] = useState(1);

  useEffect(() => {
    const fieldArr: CellBoolArr = [];
    for (let i = 0; i < linesCount; i++) {
      fieldArr[i] = new Array();
    }
    for (let i = 0; i < linesCount; i++) {
      for (let j = 0; j < columnsCount; j++) {
        fieldArr[i][j] = false;
      }
    }
    fieldArr[coordX][coordY] = true;
    setСellsState(fieldArr);
  }, [fieldSettings]);

  useEffect(() => {
    const copyArr = [...cellsState];
    const onKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          setCoordX((prev) => prev + 1);
          copyArr[coordX][coordY] = true;

          break;
        case "ArrowUp":
          setCoordX((prev) => prev - 1);
          copyArr[coordX][coordY] = true;

          break;
        case "ArrowLeft":
          setCoordY((prev) => prev - 1);
          copyArr[coordX][coordY] = true;

          break;
        case "ArrowRight":
          setCoordY((prev) => prev + 1);
          copyArr[coordX][coordY] = true;
      }
    };
    setСellsState(copyArr);
    console.log(coordX);

    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [coordX, coordY]);

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
