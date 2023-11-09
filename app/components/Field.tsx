"use client";

import Cell from "./Сell";
import React from "react";
import styled from "styled-components";
import type { Settings } from "../page";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const FieldSpace = styled.div<{ $fieldSettings: Props }>`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  height: ${(props) =>
    props.$fieldSettings.cellWidth * props.$fieldSettings.line}px;
  width: ${(props) =>
    props.$fieldSettings.cellWidth * props.$fieldSettings.column}px;
  flex-wrap: wrap;
`;

type Props = {
  fieldSettings: Settings;
};

const Field = ({ fieldSettings }: Props) => {
  const fieldArr = [];

  for (let i = 0; i < fieldSettings.line * fieldSettings.column; i++) {
    fieldArr.push(<Cell key={i} fieldSettings={fieldSettings} />);
  }
  console.log(fieldSettings.cellWidth * fieldSettings.line);

  return (
    <Container>
      <FieldSpace $fieldSettings={fieldSettings}>{fieldArr}</FieldSpace>
    </Container>
  );
};
export default Field;
