import React from 'react';
import { ConfigProvider  } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Router, Route, Switch } from 'dva/router';
import MainPage from './routes/Main';
import routes from './configs/routes';

moment.locale('zh-cn');

//提取path
function exactPathFromRoutes (routes){
  return routes.map((item,index)=>(
    <Route key={index} path={item.path} exact={item.exact} component={item.component} />
  ))
}


function RouterConfig({ history }) {
  return (
    <ConfigProvider   locale={zhCN}>
      <Router history={history}>
        <Switch>
          <MainPage>{exactPathFromRoutes(routes)}</MainPage>
        </Switch>
      </Router>
    </ConfigProvider>
  );
}

export default RouterConfig;
