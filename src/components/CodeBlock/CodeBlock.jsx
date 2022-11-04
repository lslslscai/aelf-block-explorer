import React from "react";

// 代码布局,用于显示json内容
export default function CodeBlock({ value, rows = 8 }) {
  let jsonFormatted = value;
  try {
    jsonFormatted = JSON.stringify(JSON.parse(value), null, 4);
  } catch (e) {}

  return (
    <textarea
      rows={rows}
      value={jsonFormatted}
      className="tx-block-code-like-content"
      disabled
    />
  );
}
