import { Modal, Table, Divider, Input, Button, message } from 'antd';
import { getRestaurant } from '../../services/restaurant';
import React from 'react';
const { Search } = Input;
const columns = [
    {
        title: '店铺',
        dataIndex: 'restaurant',
        key: 'restaurant',
    },
    {
        title: '店铺地址',
        dataIndex: 'address',
        key: 'address',
    },
];

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRows: [],
            datas: [],
            selectedRowKeys: [],
        }
    }

    componentDidMount() {
        getRestaurant().then(rsp => {
            if (rsp) {
                console.log('rsp', rsp)

                this.setState({ allRestaurants: rsp });
            }
        })
    }

    getNewRe = async () => {
        const { selectedRows, tmpRestaurants } = this.state;
        const result = tmpRestaurants.map(item => item.rid);
        let addResult = selectedRows.filter(item => !result.includes(item.rid));
        if (!addResult.length) {
            message.warning('请选择店铺');
            return;
        }
        const len = tmpRestaurants.length;
        addResult = addResult.map((item, index) => {
            return { ...item, opriority: index + len + 1, npriority: index + len + 1, key: index + len + 1 };
        })
        const finRe = tmpRestaurants.concat(addResult);
        await this.props.addRe(finRe);
        await this.setState({ tmpRestaurants: finRe });
        this.handleCancel();
        message.success('选择成功');
    }

    searchRe = (value) => {
        const { allRestaurants } = this.state;
        let result = allRestaurants.filter(item => item.name.includes(value));
        result = result.map((item, index) => {
            return { rid: item.id, key: index, restaurant: item.name, address: item.address };
        });
        this.setState({ datas: result, selectedRowKeys: [], selectedRows: [] });
    }

    getRestaurants = () => {
        const { restaurants, tmpRestaurants } = this.props;
        this.setState({ restaurants, tmpRestaurants });
    }

    handleCancel = () => {
        this.setState({ selectedRowKeys: [], selectedRows: [] });
        this.props.handleCancel();
    }

    render() {
        const { datas, selectedRowKeys, tmpRestaurants, selectedRows } = this.state;
        const rowSelection = {
            type: 'Checkbox',
            selectedRowKeys,
            selectedRows,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({ selectedRows, selectedRowKeys });
            },
            getCheckboxProps: record => {
                const result = tmpRestaurants.map(item => item.rid);
                return ({
                    disabled: result.includes(record.rid), // Column configuration not to be checked
                    name: record.name,
                })
            }
        };
        return (
            <Modal
                visible={this.props.show}
                footer={null}
                title="店铺广告添加"
                onCancel={this.handleCancel}
            >
                <div style={{ display: 'flex' }}>
                    <Search placeholder="请输入店铺进行搜索" onSearch={this.searchRe} enterButton />
                    <Button onClick={this.getNewRe} style={{ flexGrow: 0, marginLeft: '1em' }} type="primary">添加</Button>
                </div>
                <Divider />

                <Table
                    rowSelection={{
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={datas}
                />
            </Modal>
        )
    }
}
export default EditModal;