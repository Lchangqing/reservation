import React from 'react';
import { Table, Divider, Popconfirm, Button, Input, Spin, message } from 'antd';
import { SyncOutlined, RestOutlined, ReconciliationOutlined } from '@ant-design/icons';
import { searchUserByName, resetPassword, deleteUser, getOrderByid } from '../../services/user';
import { deleteRestaurant, getAdsById } from '../../services/restaurant';
import AddUserModal from './AddUserModal';
import Corders from './Corders';
import "./index.css";
const { Search } = Input;
class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '编辑用户',
                dataIndex: 'edit',
                key: 'edit',
                render: (text, record) =>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button icon={<ReconciliationOutlined />} disabled={this.state.orderLoading} onClick={() => this.handleOrders(record)} >用户订单</Button>
                        <Popconfirm title={`确认重置用户${record.name}密码为123456吗?`} onConfirm={() => this.handleReset(record)}>
                            <Button icon={<SyncOutlined />}>重置用户密码</Button>
                        </Popconfirm>
                        <Popconfirm title="确定注销吗?" onConfirm={() => this.handleDelete(record)}>
                            <Button icon={<RestOutlined />} >注销用户</Button>
                        </Popconfirm>
                    </div>
            },
            {
                title: '用户店铺',
                dataIndex: 'restaurant',
                key: 'restaurant',
            },
        ];
        this.state = {
            loading: false,
            oldValue: null,
            datas: [],
            showAddUserModal: false,
            showOrders: false,
            orders: [],
            orderLoading: false
        }
    }

    searchUser = async (value) => {
        await this.setState({ loading: true });
        searchUserByName({ name: value }).then(rsp => {
            if (rsp) {
                const datas = rsp.map((item, index) => {
                    return { ...item, key: index, restaurant: item.restaurant || '' };
                })
                this.setState({ oldValue: value, loading: false, datas });
            }
        })
    }

    addUser = () => {
        this.setState({ showAddUserModal: true });
    }

    handleCancel = () => {
        this.setState({ showAddUserModal: false, showOrders: false });
    }

    handleReset = async (record) => {
        await this.setState({ loading: true });
        await resetPassword(record).then(async rsp => {
            if (rsp) {
                await this.setState({ loading: false });
                message.success(`用户${record.name}密码重置成功`);
            }
        })
    }

    handleDelete = async (record) => {
        const ad = await getAdsById({ rid: record.rid });
        if (ad) {
            await this.setState({ loading: false });
            message.warning('该店铺存在广告位，请先删除广告位');
            return;
        }
        await this.setState({ loading: true });
        await deleteUser(record).then(async rsp => {
            if (rsp) {
                console.log('handleDelete', rsp);
                if (record.rid) {
                    await deleteRestaurant({ id: record.rid });
                }
                const { oldValue } = this.state;
                await this.searchUser(oldValue);
                message.success(`用户${record.name}注销成功`);
            }
        })
    }

    handleOrders = async (record) => {
        await this.setState({ orderLoading: true })
        getOrderByid({ uid: record.id }).then(async rsp => {
            if (rsp) {
                await this.setState({ showOrders: true, orders: rsp, orderLoading: false });
                // this.corder.setOrders();
            }
        })
    }

    render() {
        const { datas, loading, showAddUserModal, showOrders, orders } = this.state;
        return (
            <div style={{ margin: '2em' }} className="userpage-warpper">
                <AddUserModal handleOrders={this.handleOrders} show={showAddUserModal} handleCancel={this.handleCancel} />
                <Corders ref={corder => this.corder = corder} show={showOrders} orders={orders} handleCancel={this.handleCancel} />
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                    <Search size="large" placeholder="请输入用户名" onSearch={this.searchUser} enterButton />
                    <Button size="large" onClick={this.addUser} style={{ flexGrow: 0, marginLeft: '1em' }} type="primary">新增用户</Button>
                </div>
                <Divider />
                <Spin tip="数据加载中..." size="large" spinning={loading}>
                    <Table
                        columns={this.columns}
                        dataSource={datas}
                    />
                </Spin>
            </div>
        )
    }
}
export default UserPage;