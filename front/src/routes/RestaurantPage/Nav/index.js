import React from 'react';
import User from '../User'
import creatHistory from 'history/createHashHistory';
const history = creatHistory();
class Nav extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                    <a className="navbar-brand" onClick={() => history.goBack()} style={{color:'white'}}>返回</a>

                    <User/>
                </div>
            </nav>
        )
    }
}
export default Nav;