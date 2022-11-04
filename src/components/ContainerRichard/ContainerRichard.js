/**
 * @file ContainerRichard.js
 * @author huangzongzhe
 */
import React, { Component } from 'react';

import './ContainerRichard.less';

// 没有地方用到它
export default class ContainerRichard extends Component {
  render() {
    // large | small
    const contentClass = `conri-center-content-${this.props.type || 'large'}`;

    return (
      <div className="conri-container">
        <div className="conri-center">
          <div className={`conri-center-content ${contentClass}`}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
