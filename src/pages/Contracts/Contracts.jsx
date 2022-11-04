import React, { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import { Pagination, Table } from "antd";
import { useDebounce } from "react-use";
import useMobile from "../../hooks/useMobile";
import TableLayer from "../../components/TableLayer/TableLayer";
import { get } from "../../utils";
import getColumn from "./columnConfig";

import "./Contracts.styles.less";
import { VIEWER_CONTRACTS_LIST } from "../../api/url";

// 合约界面
export default function Contracts() {
  const isMobile = useMobile();

  // 定义数据
  const [dataLoading, setDataLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dataSource, setDataSource] = useState(undefined);
  const [actualTotal, setActualTotal] = useState(0);

  // 统计合约数量(如果过多就只显示1000)
  const total = useMemo(() => {
    if (actualTotal > 1000) return 1000;
    return actualTotal;
  });

  // 列布局
  const columns = useMemo(() => {
    return getColumn({
      isMobile,
    });
  }, [isMobile, pageIndex, pageSize]);

  // 获取合约列表
  const fetchContractList = useCallback(async () => {
    setDataSource(false);
    setDataLoading(true);
    const result = await get(VIEWER_CONTRACTS_LIST, {
      pageSize,
      pageNum: pageIndex,
    });
    if (result.code === 0) {
      const { data } = result;
      setActualTotal(data.total);
      setDataSource(data.list);
      setDataLoading(false);
    }
  }, [pageSize, pageIndex]);

  // 处理页面缩放
  const handlePageChange = useCallback(
    (page, size) => {
      setDataSource(false);
      setDataLoading(true);
      setPageIndex(size === pageSize ? page : 1);
      setPageSize(size);
    },
    [pageSize]
  );

  // 处理防抖（fetchContractList执行多次的话，只响应最后一次）
  useDebounce(
    () => {
      fetchContractList();
    },
    1000,
    [pageIndex, pageSize]
  );

  return (
    <div
      className={clsx(
        "contracts-page-container basic-container-new",
        isMobile && "mobile"
      )}
    >
      
      <h2>Contracts</h2>
      <div>
        {/* 主体头部 */}
        <div className="before-table">
          {/* 左侧总计栏 */}
          <div className="left">
            <p>
              A total of {">"} {Number(actualTotal).toLocaleString()} contracts
              found
            </p>
            <p>(Showing the last 1,000 contracts only)</p>
          </div>
          {/* 右侧翻页组件 */}
          <div className="right">
            <Pagination
              showLessItems={isMobile}
              showSizeChanger={false}
              current={pageIndex}
              pageSize={pageSize}
              total={total}
              onChange={handlePageChange}
            />
          </div>
        </div>
        {/* 合约列表 */}
        <TableLayer className="block-table">
          <Table
            loading={dataLoading}
            columns={columns}
            rowKey="owner"
            dataSource={dataSource}
            pagination={false}
          />
        </TableLayer>
        {/* 页脚翻页组件 */}
        <div className="after-table">
          <Pagination
            showLessItems={isMobile}
            showSizeChanger
            current={pageIndex}
            pageSize={pageSize}
            total={total}
            pageSizeOptions={["25", "50", "100"]}
            onChange={handlePageChange}
            onShowSizeChange={(current, size) => handlePageChange(1, size)}
          />
        </div>
      </div>
    </div>
  );
}
