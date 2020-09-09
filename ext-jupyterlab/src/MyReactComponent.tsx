import React from "react";
import { DataCurve, VisCanvas, ScaleType } from "h5web";

function MyReactComponent() {
  const values = [4, 3, 2, 1];
  const showGrid = false;
  const scaleType = ScaleType.Linear;

  return (
    <VisCanvas
      abscissaConfig={{
        indexDomain: [0, values.length - 1],
        showGrid,
      }}
      ordinateConfig={{
        dataDomain: [4, 1],
        showGrid,
        scaleType,
      }}
    >
      <DataCurve values={values} />
    </VisCanvas>
  );
}

export default MyReactComponent;
