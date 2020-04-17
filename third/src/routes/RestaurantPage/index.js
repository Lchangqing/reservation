import React from 'react';
import { Table, Divider, Popconfirm, Button, Input, Spin, message } from 'antd';
import { SyncOutlined, RestOutlined, ReconciliationOutlined } from '@ant-design/icons';
import { resetPassword, deleteUser, getOrderByid } from '../../services/user';
import { getReByName, getAdsById, deleteRestaurant } from '../../services/restaurant';
import Orders from './Orders';
import AddModal from './AddModal';
const { Search } = Input;
class RestaurantPage extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '店铺',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '菜系',
                dataIndex: 'class',
                key: 'class',
            },
            {
                title: '编辑店铺',
                dataIndex: 'edit',
                key: 'edit',
                render: (text, record) =>
                    <div >
                        <Button icon={<ReconciliationOutlined />} disabled={this.state.orderLoading} onClick={() => this.handleOrders(record)} >店铺订单</Button>
                        <Popconfirm title="确定注销吗?" onConfirm={() => this.handleDelete(record)}>
                            <Button icon={<RestOutlined />} >注销店铺</Button>
                        </Popconfirm>
                    </div>
            }
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

    searchRestaurants = async (value) => {
        await this.setState({ loading: true });
        getReByName({ where: { name: value } }).then(rsp => {
            if (rsp) {
                console.log('getReByName', rsp)
                const datas = rsp.map((item, index) => {
                    return { ...item, key: index };
                })
                this.setState({ oldValue: value, loading: false, datas });
            }
        })
    }

    addRestaurant = () => {
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
        await this.setState({ loading: true });
        const ad = await getAdsById({ rid: record.id })
        if (ad) {
            await this.setState({ loading: false });
            message.warning('该店铺存在广告位，请先删除广告位');
            return;
        }
        deleteRestaurant({ id: record.id }).then(async rsp => {
            console.log('deleteRestaurant', rsp);
            if (rsp) {
                const { oldValue } = this.state;
                await this.searchRestaurants(oldValue);
                message.success('删除成功')
            } else {
                await this.setState({ loading: false });
                message.error('删除失败')
            }
        })
    }

    handleOrders = async (record) => {
        await this.setState({ orderLoading: true })
        getOrderByid({ rid: record.id }).then(async rsp => {
            if (rsp) {
                await this.setState({ showOrders: true, orders: rsp, orderLoading: false });
                // this.corder.setOrders();
            }
        })
    }

    render() {
        const { datas, loading, showAddUserModal, showOrders, orders } = this.state;
        return (
            <div style={{ margin: '2em' }} >
                <AddModal show={showAddUserModal} handleCancel={this.handleCancel} />
                <Orders ref={corder => this.corder = corder} show={showOrders} orders={orders} handleCancel={this.handleCancel} />
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                    <Search size="large" placeholder="请输入用户名" onSearch={this.searchRestaurants} enterButton />
                    <Button size="large" onClick={this.addRestaurant} style={{ flexGrow: 0, marginLeft: '1em' }} type="primary">新增店铺</Button>
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
export default RestaurantPage;