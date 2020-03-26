import React from 'react';
import { Avatar, Divider, Popover, Popconfirm } from 'antd';
import cookie from 'react-cookies';
import Login from '../Login';
import creatHistory from 'history/createHashHistory';
const history = creatHistory();
class Nav extends React.Component {
    constructor(props) {
        super(props);
        const user = cookie.load('user');
        this.state = {
            show: false,
            user,
            buttonv: ''
        }
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    componentDidMount() {
        console.log('this.props', this.props);
    }
    showModal(e) {
        console.log(e)
        this.setState({ show: true, buttonv: e });
    }
    handleCancel() {
        this.setState({ show: false });
    }
    updateUserInfo(user) {
        this.setState({ user })
    }
    logOut() {
        cookie.remove('user');
        this.setState({ user: null })
    }
    render() {
        const { show, user, buttonv } = this.state;
        const content = (
            <div>
                <a onClick={() => this.showModal('l')}>登录</a>
                <hr />
                <a onClick={() => this.showModal('r')}>注册</a>
            </div>
        );
        return (
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                    <Login show={show} handleCancel={this.handleCancel} updateUserInfo={this.updateUserInfo} buttonv={buttonv} />
                    <a className="navbar-brand" onClick={() => history.goBack()} style={{color:'white'}}>返回</a>

                    <div className="navbar-nav " style={{ color: 'white' }}>

                        {user ? (
                            <Popconfirm
                                placement="bottom"
                                title='您确认退出吗'
                                onConfirm={this.logOut}
                                okText="是的"
                                cancelText="取消"
                            >
                                <Avatar size="large" icon="user" src="images/drink-12.jpg" />
                                <Divider type="vertical" />
                                {user.name}
                            </Popconfirm>
                        ) : (
                                <Popover content={content} trigger="click">
                                    <Avatar size="large" icon="user" src="images/login.jpg" />
                                </Popover>
                            )}
                    </div>
                </div>
            </nav>
        )
    }
}
export default Nav;