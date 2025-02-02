/**
 * @file Svg
 * @author zhouminghui
*/

import React, { PureComponent } from 'react';
// import svgList from '../../assets/svgList';
import svgList from '../../assets/svgs';

// 负责加载svg格式的图标
export default class Svg extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      style: this.props.style,
    };
  }

  render() {
    const { icon } = this.props;
    const svg = svgList[icon];

    return (
      <div
        style={this.state.style}
        className={this.props.className}
        onClick={this.props.click}
        dangerouslySetInnerHTML={{ __html: svg }}
        {...this.props}
      />
    );
  }
}
