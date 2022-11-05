import React from "react";
import QRCode from "qrcode.react";

import "./QrCode.styles.less";

// Blockchain->Address->Contracts下具体合约二维码按钮
export default function QrCode({ value }) {
  return (
    <div className="qr-code">
      <QRCode
        value={value}
        style={{
          height: 148,
          width: 148,
        }}
      />
      <p>{value}</p>
    </div>
  );
}
