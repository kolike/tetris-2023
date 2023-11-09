"use client";

import React from "react";
import styled from "styled-components";
import type { Settings } from "../page";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

type Props = {
  fieldSettings: Settings;
  setFieldSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

const FieldSettings = ({ fieldSettings, setFieldSettings }: Props) => {
  return (
    <Form>
      <label htmlFor="line">Enter number of lines</label>
      <input
        id="line"
        type="text"
        placeholder="Number"
        value={fieldSettings.line}
        onChange={(e) =>
          setFieldSettings({ ...fieldSettings, line: +e.target.value })
        }
      />
      <label htmlFor="column">Enter number of columns</label>
      <input
        id="column"
        type="text"
        placeholder="Number"
        value={fieldSettings.column}
        onChange={(e) =>
          setFieldSettings({ ...fieldSettings, column: +e.target.value })
        }
      />

      <label htmlFor="cellWidth">Enter cell width</label>
      <input
        id="cellWidth"
        type="text"
        placeholder="Number"
        value={fieldSettings.cellWidth}
        onChange={(e) =>
          setFieldSettings({ ...fieldSettings, cellWidth: +e.target.value })
        }
      />
    </Form>
  );
};
export default FieldSettings;
