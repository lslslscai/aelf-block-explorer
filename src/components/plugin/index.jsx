import React from 'react';
import { Row, Col } from 'antd';
import './index.less';

/* eslint-disable max-len */

// 组件下载,作用和DownLoadPlugin一样(文本有所不同),在proposal里面使用
const Plugin = () => (
  <div className="DownloadPlugins">
    <div className="Tips">
      Please download and install NightElf browser extension.
      Please don’t forget to refresh the page : )
    </div>
    <div className="step">
      <Row>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <div className="Step-con">
            1.Install the extension
            <a
              className="download-button"
              target="_blank"
              rel="noreferrer noopener"
              href="https://chrome.google.com/webstore/detail/aelf-explorer-extension-d/mlmlhipeonlflbcclinpbmcjdnpnmkpf"
            >
              Download
            </a>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <div className="Step-con">
            2. Create a common wallet
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <div className="Step-con">
            3. Take a try!
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

export default Plugin;
