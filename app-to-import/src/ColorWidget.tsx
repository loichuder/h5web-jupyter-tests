import React, { ReactElement } from "react";
import styles from "./ColorWidget.module.css";

function ColorWidget(): ReactElement {
  return <div className={styles.reddish} style={{ width: 300, height: 300 }} />;
}

export default ColorWidget;
