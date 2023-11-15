"use client";

import Cell from "./Сell";
import React from "react";
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

  const fieldArr = [];

  for (let i = 0; i < linesCount * columnsCount; i++) {
    fieldArr.push(<Cell key={i} size={cellSize} />);
  }

  return (
    <FieldSpace
      $height={cellSize * linesCount}
      $width={cellSize * columnsCount}>
      {fieldArr}
    </FieldSpace>
  );
};

export default Field;
