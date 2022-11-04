/**
 * @file total
 * @author atom-yang
 */
import React from 'react';

// Total统计,一般用于页脚翻页附近
const Total = (total) => (
  <span>
    Total
    <span>{total}</span>
    {' '}
    Items
  </span>
);

export default Total;
