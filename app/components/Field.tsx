'use client';

import { useState } from 'react';
import Cell from './Сell';
import './field.css';
import React from 'react';

const Field = () => {
  const [activeCell, setActiveCell] = useState('0');
  const fieldArr = [];

  for (let i = 0; i < 200; i++) {
    fieldArr.push(<Cell key={i} />);
  }

  return (
    <div className="game-scope">
      <div className="game-space">
        <div className="field">{fieldArr}</div>
      </div>
    </div>
  );
};
export default Field;
