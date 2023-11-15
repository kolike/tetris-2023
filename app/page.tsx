"use client";

import Field from "./components/Field";
import FieldSettings from "./components/FieldSettings";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Home() {
  return (
    <Container>
      <FieldSettings />
      <Field />
    </Container>
  );
}
