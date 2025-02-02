import { Select } from 'antd';
import React, { useCallback } from 'react';
import './NetSelect.style.less';
import { CHAIN_ID } from '../../../config/config';
import IconFont from '../IconFont';

const { Option } = Select;

// 主网/测试网切换,手机端专用
export default function NetSelect({ chainList }) {
  const selectChange = useCallback((val) => {
    const chainInfo = chainList.find((item) => item.chainId === val);
    if (chainInfo.chainsLink) window.location = chainInfo.chainsLink;
  }, []);
  return (
    <div className="net-select-wrapper">
      <Select
        className="common-select-wrapper net-select-container"
        defaultValue={CHAIN_ID}
        onChange={selectChange}
        closeIcon={<IconFont type="Down" />}
      >
        {chainList.map((item) => (
          <Option
            className="common-select-option-wrapper net-select-option"
            key={item.chainId}
            value={item.chainId}
          >
            {item.chainsLinkName.replace('chain', '')}
          </Option>
        ))}
      </Select>
    </div>
  );
}
