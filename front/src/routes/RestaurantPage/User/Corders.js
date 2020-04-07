import { List, Empty, Descriptions, Tag, Modal, message } from 'antd';
import { connect } from 'dva';
import { deleteReserve } from '../../../services/user';
import { userGetUserOrders, searchRePageGetLayout } from '../../../models/actionType';
import React from 'react';
const { confirm } = Modal
function mapStateToProps(state) {
    return { user: state.user };
}
class Corders extends React.Component {
    async componentDidMount() {
        this.getOrders();
    }
    getOrders = async () => {
        await this.props.dispatch({
            type: userGetUserOrders,
            payload: { uid: this.props.uid }
        })
    }

    setOrders = () => {
        const listData = [];
        const { userOrders } = this.props.user;
        userOrders.forEach(item => {
            listData.push({
                order: item,
                content:
                    (
                        <Descriptions bordered>
                            <Descriptions.Item label="店铺" span={3}>{item.restaurant_name}</Descriptions.Item>
                            <Descriptions.Item label="餐桌" span={2}>{item.number}号餐桌</Descriptions.Item>
                            <Descriptions.Item label="用餐时段" span={1}>{item.time}</Descriptions.Item>
                            <Descriptions.Item label="用餐环境" span={3}>
                                <Tag color="blue">{item.table}</Tag>
                                <Tag color="geekblue">{item.window}</Tag>
                                <Tag color="purple">{item.smoking}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="姓名">
                                {item.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="号码" span={2}>
                                {item.phone}
                            </Descriptions.Item>
                        </Descriptions>
                    )
            });
        })
        return listData;
    }

    deleteOrder = (item) => {
        const { order } = item;
        confirm({
            title: '确认删除订单吗?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                deleteReserve(order).then(async rsp => {
                    if (rsp) {
                        message.success('订单删除成功');
                        await this.getOrders();
                        await this.props.dispatch({
                            type: searchRePageGetLayout,
                            payload: { id: order.rid }
                        });
                    }
                })
            },
            onCancel() {
                return;
            },
        });
    }

    render() {
        let listData = this.setOrders();
        return (
            <Modal
                visible={this.props.show}
                footer={null}
                title="预约吧"
                onCancel={this.props.handleCancel}
                width={600}
            >
                {
                    1 && listData ?
                        (<List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 2,
                            }}
                            dataSource={listData}
                            renderItem={item => (
                                <List.Item
                                    key={item.id}
                                    actions={[
                                        <a key="list-loadmore-edit"
                                            style={{
                                                display: 'block',
                                                width: 552,
                                                textAlign: 'right',
                                                color: 'black',
                                                fontWeight: 'bold'
                                            }}
                                            onClick={this.deleteOrder.bind(this, item)}
                                        >删除订单</a>
                                    ]}
                                >
                                    {item.content}
                                </List.Item>
                            )}
                        />)
                        :
                        <Empty description='您目前暂无订单' />
                }
            </Modal>
        )
    }
}

export default connect(mapStateToProps)(Corders);