"use client";

import Field from "./components/Field";
import FieldSettings from "./components/FieldSettings";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export type Settings = { cellWidth: number; line: number; column: number };

export default function Home() {
  const [fieldSettings, setFieldSettings] = useState({
    cellWidth: 20,
    line: 20,
    column: 10,
  });
  console.log(fieldSettings);

  return (
    <>
      <Container>
        <FieldSettings
          fieldSettings={fieldSettings}
          setFieldSettings={setFieldSettings}
        />
        <Field fieldSettings={fieldSettings} />
      </Container>
    </>
  );
}
