import React, { Component } from 'react';
import { Layout } from 'antd';

import './container.styles.less';

const { Content } = Layout;

//网页主题容器,不用改
export default class Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <Content className="body-container">
        {children}
      </Content>
    );
  }
}
