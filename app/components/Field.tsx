"use client";

import Cell from "./Сell";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  const [isActive, setIsActive] = useState([{ active: false }]);

  const fieldArr: any[] = [];

  for (let i = 0; i < linesCount * columnsCount; i++) {
    fieldArr.push(<Cell key={i} size={cellSize} />);
  }

  useEffect(() => {
    for (let i = 0; i < linesCount * columnsCount; i++) {
      setIsActive((prev) => [...prev, { active: false }]);
    }
  }, []);

  console.log(isActive);

  // useEffect(() => {
  //   const onKeydown = (e: any) => {
  //     if (e.keyCode === 38) {
  //       setGetId((getId) => getId - 1);
  //       active();
  //     } else if (e.keyCode === 40) {
  //       setGetId((getId) => getId + 1);
  //       active();
  //     }
  //   };
  //   document.addEventListener("keydown", onKeydown);
  //   return () => {
  //     document.removeEventListener("keydown", onKeydown);
  //   };
  // }, [getId]);

  return (
    <FieldSpace
      $height={cellSize * linesCount}
      $width={cellSize * columnsCount}>
      {fieldArr}
    </FieldSpace>
  );
};

export default Field;
