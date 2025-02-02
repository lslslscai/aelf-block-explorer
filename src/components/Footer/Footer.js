import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { NETWORK_TYPE } from '../../../config/config';

import './footer.styles.less';

//页脚
const BrowserFooter = () => {
  const { pathname } = useLocation()
  const [isNoFooter, setIsNoFooter] = useState(false)
  const NO_FOOTER_LIST = useMemo(() => ['search-invalid', 'search-failed'], [])
  useEffect(() => {
    const firstPathName = pathname.split('/')[1]
    setIsNoFooter(NO_FOOTER_LIST.includes(firstPathName))

  }, [pathname])

  return (
    isNoFooter
      ? <></>
      : <section className={'footer ' + (NETWORK_TYPE === 'MAIN' ? 'main' : 'test')}>
        <div className='footer-container' >
          <div className='left'>
            <div className='top'>
              <h4>AELF Explorer</h4>
              <p className='description'>Decentralized Cloud Computing Blockchain Network</p>
            </div>
            <div className='bottom'>
              <div className='powered-by'>
                Powered by AELF
              </div>
              <a target='_blank' href='https://aelf.com'>
                aelf.com
              </a>
            </div>
          </div>
          <div className='footer-links-container'>
            <div className='link-list community'>
              <p>Community</p>
              <div className='list'>
                <a target='_blank' href='https://t.me/aelfblockchain'>Telegram</a>
                <a target='_blank' href='https://medium.com/aelfblockchain'>Medium</a>
                <a target='_blank' href='https://twitter.com/aelfblockchain'>Twitter</a>
                <a target='_blank' href='http://www.youtube.com/c/aelfblockchain'>Youtube</a>
                <a target='_blank' href='https://discord.gg/bgysa9xjvD'>Discord</a>
              </div>
            </div>
            <div className='link-list technology'>
              <p>Technology</p>
              <div className='list'>
                <a target='_blank' href='https://docs.aelf.io/en/latest/introduction/introduction.html'>Dev Docs</a>
                <a target='_blank' href='https://github.com/aelfProject'>Github</a>
                <a target='_blank' href='https://chrome.google.com/webstore/detail/aelf-explorer-extension/mlmlhipeonlflbcclinpbmcjdnpnmkpf?hl=zh-CN'>Wallet</a>
              </div>
            </div>
          </div>
        </div>
        <p className='copyright-container'>
          AELF © {new Date().getFullYear()}
        </p>
      </section>
  );
};

export default BrowserFooter;
