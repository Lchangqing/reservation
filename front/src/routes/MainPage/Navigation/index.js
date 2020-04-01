/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-has-content */ 
import React from 'react';
import {connect} from 'dva';
import { Link } from "dva/router";
class Navigation extends React.Component{
   render(){
       return(
		<aside id="colorlib-aside" role="complementary" className="js-fullheight img" style={{'backgroundImage':'url(images2/insta-1.jpg)'}}>
			<h1 id="colorlib-logo" className="mb-4" style={{color:'white'}}>预约吧</h1>
			<nav id="colorlib-main-menu" role="navigation" style={{marginTop:80}}>
				<ul>
					<li><Link to="/" style={{fontSize:20}}>好店推荐</Link></li>
					<li><Link to="/SearchPage" style={{fontSize:20}}>店铺搜索</Link></li>
				</ul>
			</nav>

			<div className="colorlib-footer">
				<p className="pfooter">
					Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
				</p>
			</div>
		</aside> 
       )
   }
}
export default connect()(Navigation);