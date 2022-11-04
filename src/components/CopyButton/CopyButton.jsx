import React from "react";
import copy from "copy-to-clipboard";
import { message } from "antd";
import IconFont from "../IconFont";

// 复制按钮, 点击后可直接复制对应内容.
export default function CopyButton({ value = undefined, onClick = undefined }) {
  const handleCopy = () => {
    try {
      copy(value);
      message.success("Copied Successfully");
    } catch (e) {
      message.error("Copy failed, please copy by yourself.");
    }
  };
  return (
    <IconFont
      className="copy-btn"
      style={{ fontSize: 16 }}
      type="copy"
      onClick={onClick || handleCopy}
    />
  );
}
