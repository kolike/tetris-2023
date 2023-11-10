"use client";

import Cell from "./Сell";
import React, { useContext } from "react";
import styled from "styled-components";
import { fieldSettingsContext } from "../page";

const FieldSpace = styled.div<{
  $height: number;
  $width: number;
  $cellWidth: number;
}>`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  height: ${(props) => props.$cellWidth * props.$height}px;
  width: ${(props) => props.$cellWidth * props.$width}px;
  flex-wrap: wrap;
`;

const Field = () => {
  const useSettingsContext = () => useContext(fieldSettingsContext);
  const { fieldSettings } = useSettingsContext();
  const fieldArr = [];

  for (
    let i = 0;
    i < fieldSettings.linesCount * fieldSettings.columnsCount;
    i++
  ) {
    fieldArr.push(<Cell key={i} cellWidth={fieldSettings.cellWidth} />);
  }

  return (
    <FieldSpace
      $height={fieldSettings.linesCount}
      $width={fieldSettings.columnsCount}
      $cellWidth={fieldSettings.cellWidth}>
      {fieldArr}
    </FieldSpace>
  );
};
export default Field;
