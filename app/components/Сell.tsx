"use client";

import React, { useState } from "react";
import styled from "styled-components";
import type { Settings } from "../page";

const FieldCell = styled.div<{ $isActive?: boolean; $fieldSettings: Props }>`
  width: ${(props) => props.$fieldSettings.cellWidth}px;
  height: ${(props) => props.$fieldSettings.cellWidth}px;
  background-color: ${(props) =>
    props.$isActive ? "rgba(150, 150, 150, 0.9)" : "rgba(0, 0, 0, 0.9)"};
  outline: 1px solid rgba(150, 150, 150, 0.1);
`;

type Props = {
  fieldSettings: Settings;
};

const Cell = ({ fieldSettings }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const setActiveCell = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <FieldCell
      $isActive={isActive}
      $fieldSettings={fieldSettings}
      onClick={() => setActiveCell()}></FieldCell>
  );
};
export default Cell;
