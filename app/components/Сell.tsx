import React, { useState } from 'react';
import './cell.css';

const Cell = () => {
  const [active, setActive] = useState(false);
  const clickme = () => {
    setActive((prev) => !prev);
  };
  return <div className={active ? 'cell active' : 'cell'} onClick={() => clickme()}></div>;
};
export default Cell;
