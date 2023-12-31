"use client";

import React from "react";
import styled from "styled-components";

const FieldCell = styled.div<{ $isFilled?: boolean; $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  background-color: ${(props) =>
    props.$isFilled ? "rgba(150, 150, 150, 0.9)" : "rgba(0, 0, 0, 0.9)"};
  outline: 1px solid rgba(150, 150, 150, 0.1);
`;

type Props = {
  size: number;
  isFilled: boolean;
};

const Cell = ({ size, isFilled }: Props) => {
  return <FieldCell $isFilled={isFilled} $size={size}></FieldCell>;
};

export default Cell;
