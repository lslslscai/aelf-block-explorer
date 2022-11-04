/**
 * @file arrow pagination
 * @author atom-yang
 */
import React from 'react';
import {
  Button,
} from 'antd';

const ButtonGroup = Button.Group;

// 由于引用他的老版chain-info没用了,所以也就没用了.看代码似乎是一个换页标签
const Arrow = (props) => {
  const {
    pre,
    next,
    preDisabled = false,
    nextDisabled = false,
  } = props;
  return (
    <ButtonGroup className="arrow-pagination">
      <Button
        size="small"
        icon="left"
        disabled={preDisabled}
        onClick={pre}
      />
      <Button
        size="small"
        icon="right"
        disabled={nextDisabled}
        onClick={next}
      />
    </ButtonGroup>
  );
};

export default Arrow;
