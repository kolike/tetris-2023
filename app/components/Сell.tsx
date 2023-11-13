"use client";

import React, { useState } from "react";
import styled from "styled-components";

const FieldCell = styled.div<{ $isActive?: boolean; $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  background-color: ${(props) =>
    props.$isActive ? "rgba(150, 150, 150, 0.9)" : "rgba(0, 0, 0, 0.9)"};
  outline: 1px solid rgba(150, 150, 150, 0.1);
`;

type Props = {
  size: number;
};

const Cell = ({ size }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const setActiveCell = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <FieldCell
      $isActive={isActive}
      $size={size}
      onClick={setActiveCell}></FieldCell>
  );
};
export default Cell;
