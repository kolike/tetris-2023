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
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  height: ${(props) => props.$height}px;
  width: ${(props) => props.$width}px;
  flex-wrap: wrap;
`;

type cell = { active: boolean }[];

const Field = () => {
  const { fieldSettings } = useFieldSettings();
  const { cellSize, linesCount, columnsCount } = fieldSettings;
  const [cellsState, setСellsState] = useState<cell>([]);

  useEffect(() => {
    const fieldArr: cell = [];

    for (let i = 0; i < linesCount * columnsCount; i++) {
      if (i === 0) {
        fieldArr.push({
          active: true,
        });
      } else {
        fieldArr.push({
          active: false,
        });
      }
    }
    setСellsState([...fieldArr]);
  }, []);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      let copy = [...cellsState];
      let activeCellId = copy.findIndex((e) => e.active);
      const spareCellId = activeCellId;
      copy[activeCellId].active = false;

      switch (e.keyCode) {
        case 40:
          if ((activeCellId + 1) % linesCount !== 0) {
            activeCellId = activeCellId + 1;
          }
          break;
        case 38:
          if (activeCellId % linesCount !== 0) {
            activeCellId = activeCellId - 1;
          }
          break;
        case 37:
          activeCellId = activeCellId - linesCount;
          break;
        case 39:
          activeCellId = activeCellId + linesCount;
          break;
      }

      if (activeCellId < linesCount * columnsCount && activeCellId >= 0) {
        copy[activeCellId].active = true;
        setСellsState(copy);
      } else {
        copy[spareCellId].active = true;
        setСellsState(copy);
      }
    };
    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [cellsState]);

  return (
    <FieldSpace
      $height={cellSize * linesCount}
      $width={cellSize * columnsCount}>
      {cellsState.map((item, i) => {
        const { active } = item;
        return <Cell key={i} size={cellSize} isFilled={active} />;
      })}
    </FieldSpace>
  );
};

export default Field;
