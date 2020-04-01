import React from 'react';
import { Avatar, Divider, Popover, Modal } from 'antd';
import { getReById } from '../../../services/restaurant';
import { withRouter } from "react-router-dom";
import cookie from 'react-cookies';
import Login from '../Login';
const { confirm } = Modal;
class User extends React.Component {
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
        this.handleLogout = this.handleLogout.bind(this);
        this.goOwnRe = this.goOwnRe.bind(this);
    }
    componentDidMount() {
        console.log('this.props', this.props);
    }
    showModal(e) {
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
    handleLogout() {
        confirm({
            title: '确认退出登录?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.logOut()
            },
            onCancel() {
                return;
            },
        });
    }

    async goOwnRe() {
        const { user } = this.state;
        const ad = await getReById({ id: user.rid });
        this.props.history.push({ pathname: '/RestaurantPage', state: { ad: ad, update: 1 } });
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
        const content2 = user ? (
            <div>
                {user.rid ? (
                    <div>
                        <a onClick={() => this.showModal('r')}>店铺订单</a>
                        <hr />
                        <a onClick={() => this.goOwnRe()}>我的店铺</a>
                        <hr />
                    </div>
                ) : null}
                <a onClick={() => this.showModal('l')}>我的订单</a>
                <hr />
                <a onClick={() => this.handleLogout()}>退出登录</a>
            </div>
        ) : null;
        return (
            <div className="navbar-nav " style={{ color: 'white' }}>
                <Login show={show} handleCancel={this.handleCancel} updateUserInfo={this.updateUserInfo} buttonv={buttonv} />
                {user ? (
                    <Popover
                        content={content2}
                        trigger="click"
                    >
                        <Avatar size="large" icon="user" src="images/drink-12.jpg" />
                        <Divider type="vertical" />
                        {user.name}
                    </Popover>
                ) : (
                        <Popover content={content} trigger="click">
                            <Avatar size="large" icon="user" src="images/login.jpg" />
                        </Popover>
                    )}
            </div>
        )
    }
}
export default withRouter(User);