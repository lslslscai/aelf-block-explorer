//Token页面中的列表
import { Skeleton } from "antd";
import React, { useMemo } from "react";
import { useParams } from "react-router";
import AddressLink from "../../../components/AddressLink";
import CopyButton from "../../../components/CopyButton/CopyButton";
import { numberFormatter } from "../../../utils/formater";

export default function Overview({ tokenInfo = {}, price = 0 }) {
  const { symbol } = useParams();
  const overviewList = useMemo(() => {
    const {
      totalSupply = 0,
      supply = 0,
      holders = 0,
      transfers = "0",
      contractAddress = "",
      decimals = 0,
    } = tokenInfo;
    return [
      { title: "Price", value: `$${numberFormatter(price)}` },
      {
        title: "Total Supply",
        value: `${numberFormatter(totalSupply)} ${symbol}`,
      },
      {
        title: "Circulating Supply",
        value: `${numberFormatter(supply)} ${symbol}`,
      },
      {
        title: "Holders",
        value: Number(holders).toLocaleString(),
      },
      {
        title: "Transfers",
        value: Number(transfers).toLocaleString(),
      },
      {
        title: "Contract",
        value: (
          <div>
            <AddressLink
              address={contractAddress}
              suffix={<CopyButton value={contractAddress} />}
            />
          </div>
        ),
      },
      {
        title: "Decimals",
        value: decimals,
      },
    ];
  }, [price, tokenInfo]);
  return (
    <div className="overview">
      <p>Overview</p>
      <div className="content">
        {tokenInfo ? (
          overviewList.map((item) => (
            <div className="row" key={item.title}>
              <span className="label">{item.title}</span>
              <span className="value">{item.value}</span>
            </div>
          ))
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}
