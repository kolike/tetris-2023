"use client";

import Cell from "./Сell";
import React from "react";
import styled from "styled-components";
import { useSettings } from "./providers/FieldSettingsProvider";

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
  const { fieldSettings } = useSettings();
  const { cellSize, linesCount, columnsCount } = fieldSettings;

  const getFieldSize = (size: number) => {
    return cellSize * size;
  };

  const fieldArr = [];

  for (let i = 0; i < linesCount * columnsCount; i++) {
    fieldArr.push(<Cell key={i} size={cellSize} />);
  }

  return (
    <FieldSpace
      $height={getFieldSize(linesCount)}
      $width={getFieldSize(columnsCount)}>
      {fieldArr}
    </FieldSpace>
  );
};
export default Field;
