/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import {connect} from 'dva';
import Navigation from './Navigation';
import { Router, Route, Switch } from 'dva/router';
import AdPage from './AdPage'
import SearchPage from './SearchPage'
import './style.css'
class MainPage extends React.Component{
    render(){
        return(
                <div id="colorlib-page">
                    <a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
                    <Navigation history={this.props.history}/>
                    <Switch>
                        <Route path='/' exact component={AdPage}/>
                        <Route path='/SearchPage' component={SearchPage}/>
                    </Switch>
                </div>   
            )
    }
}
export default connect()(MainPage);