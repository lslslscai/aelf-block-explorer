import { Skeleton, Steps } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { CHAIN_ID } from "../../../../constants";

import "./History.styles.less";

const EventMap = {
  CodeUpdated: "Code Updated",
  AuthorChanged: "Author Changed",
  ContractDeployed: "Contract Deployed",
};
// Blockchain->Address->Contracts下具体合约History页面
export default function History({ history }) {
  const StepDescription = (props) => {
    const { address, author, codeHash, txId, version, blockHeight, isLast } =
      props;
    console.log(">>isLast", isLast, version);
    return (
      <>
        <div className="description-item">
          <span>Author: </span>
          <Link to={`/address/${author}`}>{`ELF_${author}_${CHAIN_ID}`}</Link>
        </div>
        <div className="description-item">
          <span>Code Hash: </span>
          <Link to={`/address/${address}${isLast ? "" : `/${codeHash}`}`}>
            {codeHash}
          </Link>
        </div>
        <div className="description-item">
          <span>Version: </span>
          <Link to={`/address/${address}${isLast ? "" : `/${codeHash}`}`}>
            {version}
          </Link>
        </div>
        <div className="description-item">
          <span>Transaction Hash: </span>
          <Link to={`/tx/${txId}`}>{txId}</Link>
        </div>
        <div className="description-item">
          <span>Block: </span>
          <Link to={`/block/${blockHeight}`}>{blockHeight}</Link>
        </div>
      </>
    );
  };

  return (
    <div className="history-pane">
      {history ? (
        <Steps progressDot current={0} direction="vertical">
          {history.map((v, index) => (
            <Steps.Step
              key={v.txId}
              title={EventMap[v.event]}
              subTitle={moment(v.updateTime).format("YYYY/MM/DD HH:mm:ss")}
              description={StepDescription({ ...v, isLast: index === 0 })}
            />
          ))}
        </Steps>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}
