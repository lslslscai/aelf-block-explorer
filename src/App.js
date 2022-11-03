/**
 * @file App
 * @author huangzongzhe
 */
import React, { Suspense, useCallback, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import BrowserHeader from "./components/Header/Header";
import HeaderBlank from "./components/Header/HeaderBlank";
import BrowserFooter from "./components/Footer/Footer";
import BrowserBreadcrumb from "./components/Breadcrumb/Breadcrumb";
import Container from "./components/Container/Container";
import { PageRouter } from "./routes/routes";
import { useLocation } from "react-use";

import "./App.less";

function App() {
  const { pathname } = useLocation()

  const back2Top = useCallback(() => {
    const app = document.querySelector('#app')
    if (app) {
      app.scrollIntoView({ block: 'start', behavior: 'auto' })
    }
  }, [])

  useEffect(() => {
    back2Top()
  }, [pathname])

  return (
    <Suspense fallback={null}>  {/* 最终一定是会改成中文的，所有英文去掉 */}
      <div className='App'>
        <BrowserRouter>
          <BrowserHeader />  {/* 网页头，包含图标、导航器和链选项，只用改其中的素材，不要动变量名等代码 */}
          <HeaderBlank />  {/* 填充物，确保网页头不会覆盖下面内容，不改导航栏布局就不用动 */}
          <BrowserBreadcrumb />  {/* 辅助路由的，如果之后不改路由就不用动这里 */}
          <Container>  {/* 网页容器，主要为的是下面的路由 */}
            <PageRouter />  {/* 路由容器，根据路由指向的网页显示对应内容。主题修改内容都在这里 */}
          </Container>
          <BrowserFooter />  {/* 网页页脚，不出意外要删掉，里面和AElf相关的东西太多 */}
        </BrowserRouter>
      </div>
    </Suspense>
  );
}
// if (module.hot) {
//   module.hot.accept();
// }
// export default hot(App);
export default App;
