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
  const [coordX, setCoordX] = useState(0);
  const [coordY, setCoordY] = useState(0);

  const field = useMemo(() => {
    const fieldArr: CellBoolArr = [];
    for (let i = 0; i < linesCount; i++) {
      fieldArr[i] = new Array();
    }
    for (let i = 0; i < linesCount; i++) {
      for (let j = 0; j < columnsCount; j++) {
        fieldArr[i][j] = false;
      }
    }

    return fieldArr;
  }, [linesCount, columnsCount, coordX, coordY]);

  const onKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        if (coordX >= 0 && coordX < linesCount - 1) {
          setCoordX((prev) => prev + 1);
        }
        break;
      case "ArrowUp":
        if (coordX > 0 && coordX <= linesCount) {
          setCoordX((prev) => prev - 1);
        }
        break;
      case "ArrowLeft":
        if (coordY > 0 && coordY <= columnsCount) {
          setCoordY((prev) => prev - 1);
        }
        break;
      case "ArrowRight":
        if (coordY >= 0 && coordY < columnsCount - 1) {
          setCoordY((prev) => prev + 1);
        }
        break;
    }
  };

  useEffect(() => {
    const copyArr = [...field];
    copyArr[coordX][coordY] = true;
    setСellsState(copyArr);

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
