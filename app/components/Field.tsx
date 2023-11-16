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

const Field = () => {
  const { fieldSettings } = useFieldSettings();
  const { cellSize, linesCount, columnsCount } = fieldSettings;
  const [isActive, setIsActive] = useState<any[]>([]);
  const cellCount = linesCount * columnsCount;

  const fieldArr: any[] = [];

  for (let i = 0; i < linesCount * columnsCount; i++) {
    if (i === 0) {
      fieldArr.push({
        id: i,
        size: cellSize,
        active: true,
      });
    } else {
      fieldArr.push({
        id: i,
        size: cellSize,
        active: false,
      });
    }
  }

  useEffect(() => {
    setIsActive([...fieldArr]);
  }, []);

  const elements = isActive.map((item, i) => {
    const { size, active } = item;
    return <Cell key={i} size={size} active={active} />;
  });

  console.log("isactve", isActive);

  useEffect(() => {
    const onKeydown = (e: any) => {
      let copy = [...isActive];
      let activeCellId = copy.find((obj) => obj.active === true).id;
      const spareCellId = activeCellId;
      copy[activeCellId].active = false;
      switch (e.keyCode) {
        case 40:
          activeCellId = activeCellId + 1;
          break;
        case 38:
          activeCellId = activeCellId - 1;
          break;
        case 37:
          activeCellId = activeCellId - linesCount;
          break;
        case 39:
          activeCellId = activeCellId + linesCount;
          break;
      }

      if (activeCellId < cellCount && activeCellId >= 0) {
        copy[activeCellId].active = true;
        setIsActive(copy);
      } else {
        copy[spareCellId].active = true;
        setIsActive(copy);
      }
    };
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [isActive]);

  return (
    <FieldSpace
      $height={cellSize * linesCount}
      $width={cellSize * columnsCount}>
      {elements}
    </FieldSpace>
  );
};

export default Field;
