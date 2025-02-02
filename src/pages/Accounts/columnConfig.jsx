import React from "react";
import AddressLink from "../../components/AddressLink";
import { numberFormatter } from "../../utils/formater";

// Blockchain->Address->Top Accounts页面

export default ({ isMobile, preTotal }) => {
  return [
    {
      title: "Rank",
      dataIndex: "id",
      width: isMobile ? 86 : 186,
      render(id, record, index) {
        return preTotal + index + 1;
      },
    },
    {
      title: "Address",
      dataIndex: "owner",
      width: isMobile ? 216 : 320,
      ellipsis: true,
      className: "color-blue",
      render: (address) => <AddressLink address={address} />,
    },
    {
      title: "Balance",
      dataIndex: "balance",
      width: isMobile ? 156 : 300,
      render(balance, record) {
        return `${numberFormatter(balance)} ${record.symbol}`;
      },
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      width: isMobile ? 126 : 182,
    },
    {
      title: "Transfers",
      dataIndex: "count",
      align: "right",
      width: isMobile ? 76 : 100,
    },
  ];
};
