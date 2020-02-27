/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import {connect} from 'dva';
import Navigation from './Navigation';
import './style.css'
class MainPage extends React.Component{
    sideBar(){
        const path = window.location.pathname;
    return path.includes('DetailPage') || path.includes('RestaurantPage')
    }
    render(){
        return(
                <div id="colorlib-page">
                    {!this.sideBar()?<a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>:null}
                    {!this.sideBar()?<Navigation history={this.props.history}/>:null}
                    {this.props.children}
                </div>   
            )
    }
}
export default connect()(MainPage);