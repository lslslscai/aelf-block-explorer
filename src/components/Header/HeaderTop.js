import { Menu } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import IconFont from "../IconFont";
import "./HeaderTop.styles.less";
import { CHAIN_ID, NETWORK_TYPE } from "../../../config/config";
import Search from "../Search/Search";
import Svg from "../Svg/Svg";
import useMobile from "../../hooks/useMobile";
import { ELF_REALTIME_PRICE_URL, HISTORY_PRICE } from "../../constants";
import { get } from "../../utils";

const TokenIcon = require("../../assets/images/tokenLogo.png");

const { SubMenu, Item: MenuItem } = Menu;

// 这个影响的是最上面的一栏，包括图标、about之类的内容
export default function HeaderTop({
  headerClass,
  menuMode,
  networkList,
  showSearch,
}) {
  const isMobile = useMobile();
  const [price, setPrice] = useState({ USD: 0 });
  const [previousPrice, setPreviousPrice] = useState({ usd: 0 });

  const range = useMemo(() => { // ==货币价位及其变化
    if (price.USD && previousPrice.usd) {
      return ((price.USD - previousPrice.usd) / previousPrice.usd) * 100;
    }
    return "-";
  }, [price, previousPrice]);

  useEffect(() => { // 显示汇率，咱们可以不要
    if (CHAIN_ID === "AELF" && NETWORK_TYPE === "MAIN" && !isMobile) {
      const d = new Date()
      const day = d.getDate()
      const month = d.getMonth() + 1
      const year = d.getFullYear()
      get(ELF_REALTIME_PRICE_URL, { fsym: 'ELF', tsyms: "USD,BTC,CNY" }).then((res) => setPrice(res));
      get(HISTORY_PRICE, {
        token_id: "aelf",
        vs_currencies: "usd",
        date:
          new Date(`${year}/${month}/${day}`).valueOf() - d.getTimezoneOffset() * 60000 -
          24 * 3600 * 1000,
      }).then((res) => {
        if (!res.message) {
          setPreviousPrice(res);
        }
      });
    }
  }, [isMobile]);

  const menuClick = useCallback((item) => { // 点击事件
    const filter = networkList.filter(
      (network) => network.netWorkType === item.key
    );
    if (filter.length) window.location = filter[0].url;
  }, []);

  return (
    <div
      className={clsx('header-container-top', NETWORK_TYPE === "MAIN" && "header-container-main-top"
      )}
    >
      <div className={headerClass}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* 图标 */}
          <Svg
            icon={NETWORK_TYPE === "MAIN" ? "main_logo" : "test_logo"}
            className='aelf-logo-container'
          />

          {/* 汇率 */}
          {/* {range !== "-" && (
            <div className='price-container'>
              <img src={TokenIcon} alt="elf" />
              <span className='price'>$ {price.USD}</span>
              <span className={`range ${range >= 0 ? "rise" : "fall"}`}>
                {range >= 0 ? "+" : ""}
                {range.toFixed(2)}%
              </span>
            </div>
          )} */}
        </div>

        {/* 右侧的导航栏 */}
        <div className='header-top-content'>
          {showSearch && <Search />}
          <Menu
            className='net-change-menu'
            selectedKeys={[NETWORK_TYPE]}
            mode={menuMode}
            onClick={menuClick}
          >
            {/* <SubMenu
              key='/Explorers'
              popupOffset={[0, -7]}
              popupClassName='common-header-submenu explorers-popup'
              title={
                <span className='submenu-title-wrapper'>
                  Explorers
                  <IconFont className='submenu-arrow' type='Down' />
                </span>
              }
            >
              {networkList.map((item) => (
                <MenuItem key={item.netWorkType}>{item.title}</MenuItem>
              ))}
            </SubMenu> */}


          </Menu>
        </div>
      </div>
    </div>
  );
}
