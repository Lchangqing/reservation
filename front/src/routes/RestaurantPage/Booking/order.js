import React from 'react';
import { Descriptions, Tag, Modal } from 'antd';
export default class Order extends React.Component {
    render() {
        const { detail:order } = this.props;
        return (
            <Modal
                visible={this.props.show}
                footer={null}
                onCancel={this.props.handleCancel}
                width={600}
            >
                <Descriptions title={`${order.restaurant_name}等待您的光临`} bordered>
                    <Descriptions.Item label="店铺" span={3}>{order.restaurant_name}</Descriptions.Item>
                    <Descriptions.Item label="餐桌" span={2}>{order.number}号餐桌</Descriptions.Item>
                    <Descriptions.Item label="用餐时段" span={1}>{order.time}</Descriptions.Item>
                    <Descriptions.Item label="用餐环境" span={3}>
                        <Tag color="blue">{order.table}</Tag>
                        <Tag color="geekblue">{order.window}</Tag>
                        <Tag color="purple">{order.smoking}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="姓命">
                        {order.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="号码" span={2}>
                        {order.phone}
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        )
    }
}