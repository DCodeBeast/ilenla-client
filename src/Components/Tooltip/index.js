import React from "react";
import Tooltip from "@mui/material/Tooltip";

const  TooltipWrapper = ({value, children})  => {

    return (
      <Tooltip
        title={value}
        placement="top"
        id="test"
        arrow
      >
        {children}
      </Tooltip>
    );
  }


export default TooltipWrapper;
