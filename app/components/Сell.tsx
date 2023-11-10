"use client";

import React, { useState } from "react";
import styled from "styled-components";

const FieldCell = styled.div<{ $isActive?: boolean; $width: number }>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$width}px;
  background-color: ${(props) =>
    props.$isActive ? "rgba(150, 150, 150, 0.9)" : "rgba(0, 0, 0, 0.9)"};
  outline: 1px solid rgba(150, 150, 150, 0.1);
`;

type Props = {
  cellWidth: number;
};

const Cell = ({ cellWidth }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const setActiveCell = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <FieldCell
      $isActive={isActive}
      $width={cellWidth}
      onClick={() => setActiveCell()}></FieldCell>
  );
};
export default Cell;
