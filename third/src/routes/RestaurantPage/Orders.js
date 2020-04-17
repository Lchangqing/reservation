import { List, Empty, Descriptions, Modal, message } from 'antd';
import { deleteReserve } from '../../services/user';
import React from 'react';
const { confirm } = Modal
class Corders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantOrders: null
        }
    }

    setOrders = (newOrders) => {
        const listData = [];
        const restaurantOrders = newOrders || this.props.orders;
        restaurantOrders.forEach(item => {
            listData.push({
                order: item,
                restaurantOrders: restaurantOrders,
                content:
                    (
                        <Descriptions bordered>
                            <Descriptions.Item label="餐桌" span={2}>{item.number}号餐桌</Descriptions.Item>
                            <Descriptions.Item label="用餐时段" span={1}>{item.time}</Descriptions.Item>
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
        const { order, restaurantOrders } = item;
        confirm({
            title: '确认删除订单吗?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                deleteReserve(order).then(async rsp => {
                    if (rsp) {
                        const index = restaurantOrders.forEach((item, i) => {
                            if (item.id === order.id) {
                                return i;
                            }
                        })
                        restaurantOrders.splice(index, 1);
                        await this.setState({ restaurantOrders });
                        message.success('订单删除成功');
                    }
                })
            },
            onCancel() {
                return;
            },
        });
    }

    render() {
        const { restaurantOrders } = this.state;
        let listData = restaurantOrders ? this.setOrders(restaurantOrders) : this.setOrders();
        return (
            <Modal
                visible={this.props.show}
                footer={null}
                title="预约吧"
                onCancel={this.props.handleCancel}
                width={600}
            >
                {
                    listData.length ?
                        (<List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 4,
                            }}
                            dataSource={listData}
                            renderItem={item => (
                                <List.Item
                                    key={item.order.id}
                                    actions={[
                                        <a key="list-loadmore-edit"
                                            style={{
                                                display: 'block',
                                                width: 528,
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
                        <Empty description='目前暂无订单' />
                }
            </Modal>
        )
    }
}

export default Corders;