import { Skeleton } from "antd";
import React from "react";

// 子内容股价容器(支持children代表支持下一级路由)
export default function CustomSkeleton({ children, loading }) {
  return (
    <Skeleton active loading={loading}>
      {children}
    </Skeleton>
  );
}
