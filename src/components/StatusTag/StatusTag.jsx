import React, { useMemo } from "react";
import IconFont from "../IconFont/index";

import "./StatusTag.style.less";

// 状态tag,主要用于交易信息
export default function StatusTag({ status }) {
  const statusObj = useMemo(
    () => ({
      MINED: "Success",
      FAILED: "Failed",
      PENDING: "Pending",
    }),
    []
  );
  const iconObj = useMemo(
    () => ({
      MINED: "CircleCorrect",
      FAILED: "Failed",
      PENDING: "Pending",
    }),
    []
  );
  const { [status]: sta = "NotExisted" } = statusObj;
  const { [status]: icon = "CNotExisted" } = iconObj;
  return (
    <p className={`status-tag status-${sta.toLowerCase()}`}>
      <IconFont type={icon} /> {sta}
    </p>
  );
}
