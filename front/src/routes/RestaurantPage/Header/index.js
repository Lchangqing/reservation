import React from 'react';
import { connect } from 'dva';
import { Link } from "dva/router";
import { Avatar, Divider, Popover, Popconfirm } from 'antd';
import cookie from 'react-cookies';
import Login from '../Login'
// const style = {
//     float: 'right',
//     cursor: 'pointer',
//     color: '#fff',
//     position: 'absolute',
//     right: 100
// }
class Header extends React.Component {
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
            <div>
                <Login show={show} handleCancel={this.handleCancel} updateUserInfo={this.updateUserInfo} buttonv={buttonv} />
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                    <div className="container">
                        <Link className="navbar-brand" to='/'>返回</Link>

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
                <section className="home-slider owl-carousel owl-drag">

                    <div className="slider-item" style={{ backgroundImage: `url(images2/bg_1.jpg)` }}>
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row slider-text align-items-center justify-content-center text-center">
                                <div className="col-md-10 col-sm-12 ">
                                    <h1 className="m-b-200" >{this.props.name}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default connect()(Header)