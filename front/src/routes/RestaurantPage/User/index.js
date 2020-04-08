import React from 'react';
import { connect } from 'dva';
import { Avatar, Divider, Popover, Modal } from 'antd';
import { getReById } from '../../../services/restaurant';
import { withRouter } from "react-router-dom";
import cookie from 'react-cookies';
import Login from '../Login';
import Corders from './Corders';
import Rorders from './Rorders';
const { confirm } = Modal;
class User extends React.Component {
    constructor(props) {
        super(props);
        const user = cookie.load('user');
        this.state = {
            show: false,
            user,
            buttonv: '',
            corderShow: false,
            rorderShow: false
        }
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.logOut = this.logOut.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.goOwnRe = this.goOwnRe.bind(this);
    }

    async componentDidMount() {
        const { user } = this.state;
        if (user && user.rid) {
            const ad = await getReById({ id: user.rid });
            this.setState({ ad, user })
        }
    }

    showModal(e) {
        this.setState({ show: true, buttonv: e });
    }
    handleCancel() {
        this.setState({ show: false, corderShow: false, rorderShow: false });
    }
    async updateUserInfo(user) {
        const { ad } = this.state;
        if (user.rid && !ad) {
            const ad = await getReById({ id: user.rid });
            this.setState({ ad, user })
        } else {
            this.setState({ user })
        }
    }
    async logOut() {
        cookie.remove('user');
        await this.props.dispatch({
            type: 'user/save',
            payload: { userinfo: null }
        })
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
        const { ad } = this.state;
        this.props.history.push({ pathname: '/RestaurantPage', state: { ad: ad, update: 1 } });
    }
    showCorder = () => {
        this.setState({ corderShow: true });
    }
    showRorder = () => {
        this.setState({ rorderShow: true });
    }
    render() {
        const { show, user, buttonv, corderShow, rorderShow, ad } = this.state;
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
                        <a onClick={this.showRorder}>店铺订单</a>
                        <hr />
                        <a onClick={this.goOwnRe}>我的店铺</a>
                        <hr />
                    </div>
                ) : null}
                <a onClick={this.showCorder}>我的订单</a>
                <hr />
                <a onClick={this.handleLogout}>退出登录</a>
            </div>
        ) : null;
        return (
            <div className="navbar-nav " style={{ color: 'white' }}>
                <Login show={show} handleCancel={this.handleCancel} updateUserInfo={this.updateUserInfo} buttonv={buttonv} />
                {user ? <Corders show={corderShow} handleCancel={this.handleCancel} uid={user.id} /> : null}
                {user && user.rid && ad ? <Rorders show={rorderShow} handleCancel={this.handleCancel} rid={user.rid} /> : null}
                {
                    user ? (
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
                        )
                }
            </div>
        )
    }
}
const userModal = withRouter(User);
export default connect()(userModal); 