import React from "react";
import useMobile from "../../hooks/useMobile";

import "./TableLayer.styles.less";

// 表格容器,在很多地方都有用到
export default function TableLayer({ children, className = '', ...props }) {
  const isMobile = useMobile();
  return (
    <div
      className={"table-layer " + (isMobile ? "mobile " : "") + className}
      {...props}
    >
      <div className="table-layer-block" />
      {children}
      <div className="table-layer-block" />
    </div>
  );
}
