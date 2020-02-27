import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
import MainPage from './routes/MainPage'
// import SeachPage from './routes/MainPage/SearchPage'
import routes from './configs/routes'
//提取path
function exactPathFromRoutes (routes){
  return routes.map((item,index)=>(
    <Route key={index} path={item.path} exact={item.exact} component={item.component} />
  ))
}

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <MainPage>
          {exactPathFromRoutes(routes)}
        </MainPage>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
