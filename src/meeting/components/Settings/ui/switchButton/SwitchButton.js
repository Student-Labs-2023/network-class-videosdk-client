import React, { useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

const SwitchButton = () => {
  const [selected, setSelected] = useState(true);

  function changeSelected() {
    selected ? setSelected(false) : setSelected(true);
  }

  return (
    <div
      className={classNames(styles.switchBtn, selected ? styles.switchOn : "")}
      onClick={changeSelected}
    ></div>
  );
};

export default SwitchButton;