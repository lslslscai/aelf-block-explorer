import { createFromIconfontCN } from '@ant-design/icons';

const ICON_FONT_URL = 'https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_17168_29.a3c68a67d6e75d15ca3969bd9b1a9448.js';

// 图标字体,从线上加载
const IconFont = createFromIconfontCN({
  scriptUrl: ICON_FONT_URL,
});
export default IconFont;
