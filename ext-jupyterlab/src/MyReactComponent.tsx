import React, { useState } from "react";
import { ToggleBtn } from "h5web";

function MyReactComponent() {
  const [value, setValue] = useState(false);

  return (
    <ToggleBtn
      label="Toggle me !"
      value={value}
      onChange={() => {
        console.log(value);
        setValue(!value);
      }}
    />
  );
}

export default MyReactComponent;
