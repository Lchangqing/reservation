import { Spin, Modal, message, Form, Button, Row, Col, Icon, Upload, Input, InputNumber, Divider, Table } from 'antd';
import React from 'react';
import { addDish, addRestaurant, upload, addLayout } from '../../services/restaurant';
import { searchUserByName, resetPassword, deleteUser, getOrderByid } from '../../services/user';
const { TextArea, Search } = Input;

const columns = [
    {
        title: '用户',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '店铺',
        dataIndex: 'restaurant',
        key: 'restaurant',
    },
];

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class AddModal extends React.Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            fileList: null,
            img: '',
            selectedRows: [],
            datas: [],
            selectedRowKeys: [],
            loading: false
        };
    }
    beforeUpload = (file) => {
        getBase64(file, imageUrl =>
            this.setState({
                imageUrl,
                imgloading: false,
                fileList: file
            }),
        );
        return false;
    }



    handleSubmit = async values => {
        console.log('values', values);
        const { fileList, selectedRows } = this.state;
        if (!selectedRows.length) {
            message.warning('请选择店铺用户');
            return;
        }
        const { name, description, classify, address, tables } = values;
        const formData = new FormData();
        formData.append('file', fileList);
        upload(formData).then(rsp => {
            console.log('upload', rsp)
            if (rsp) {
                const restaurant = { name, description, class: classify, address, img: rsp.url, uid: selectedRows[0].id };
                addRestaurant({ restaurant, tables }).then(async rsp2 => {
                    if (rsp2) {
                        console.log('addRestaurant', rsp2);
                        message.success("店铺添加成功");
                        await this.setState({datas: []});
                        await this.props.handleCancel();
                        this.formRef.current.resetFields();
                    }
                })
            }
        })
        // this.formRef.current.validateFields(async (err, values) => {
        //     if (!err) {
        //         const { fileList, selectedRows } = this.state;
        //         if (!selectedRows.length) {
        //             message.warning('请选择店铺用户');
        //             return;
        //         }

        // 
        // const formData = new FormData();
        // formData.append('file', fileList);
        // uploadDish(formData).then(rsp => {
        //     if (rsp) {
        //         addDish({ name, price, img: rsp.url, description, classify, rid: this.props.rid }).then(rsp2 => {
        //             if (rsp2) {
        //                 message.success('菜品增加成功');
        //                 this.setState({ imageUrl: '' })
        //                 this.props.updateMenu();
        //                 this.props.handleCancel();
        //             }
        //         })
        //     }
        // })
        // this.props.form.resetFields();
        // }
        // }); 
    };


    onReset = () => {
        console.log(this.formRef);
        this.formRef.current.resetFields();
    };

    searchRe = async (value) => {
        await this.setState({ loading: true });
        searchUserByName({ name: value }).then(rsp => {
            if (rsp) {
                const datas = rsp.map((item, index) => {
                    return { ...item, key: index, restaurant: item.restaurant || '' };
                })
                this.setState({ oldValue: value, loading: false, datas, selectedRowKeys: [], selectedRows: [] });
            }
        })
    }

    render() {
        const { imageUrl, datas, selectedRowKeys, tmpRestaurants, selectedRows, loading } = this.state;

        const uploadButton = (
            <div>
                <Icon type={this.state.imgloading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            selectedRows,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({ selectedRows, selectedRowKeys });
            },
            getCheckboxProps: record => {
                return ({
                    disabled: record.rid, // Column configuration not to be checked
                    name: record.name,
                })
            }
        };
        return (
            <Modal
                visible={this.props.show}
                title="预约吧"
                onCancel={this.props.handleCancel}
                footer={null}
            >
                <Form layout='vertical' onFinish={this.handleSubmit} ref={this.formRef}>
                    <Form.Item
                        name="img"
                        label="菜品图"
                        rules={[
                            {
                                required: true,
                                message: '请上传图片!'
                            }]}
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={this.beforeUpload}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="店铺名字"
                        rules={[
                            {
                                required: true,
                                message: '请輸入店铺名字'
                            }, {
                                pattern: /((^[^\s]).*([^\s]$))|(^[^\s]$)/g,
                                message: '前后不能输入空格',
                            }
                        ]}
                    >
                        <TextArea
                            placeholder="店铺名字"
                        />
                    </Form.Item>
                    <Form.Item
                        name="classify"
                        label="菜系类别"
                        rules={[
                            {
                                required: true,
                                message: '菜系类别'
                            }, {
                                pattern: /((^[^\s]).*([^\s]$))|(^[^\s]$)/g,
                                message: '前后不能输入空格',
                            }
                        ]}
                    >
                        <TextArea
                            placeholder="菜系类别"
                        />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="店铺描述"
                        rules={[
                            {
                                required: true,
                                message: '请输入店铺描述'
                            }, {
                                pattern: /((^[^\s]).*([^\s]$))|(^[^\s]$)/g,
                                message: '前后不能输入空格',
                            }
                        ]}
                    >
                        <TextArea
                            placeholder="店铺描述"
                        />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="店铺地址"
                        rules={[
                            {
                                required: true,
                                message: '请输入店铺地址'
                            }, {
                                pattern: /((^[^\s]).*([^\s]$))|(^[^\s]$)/g,
                                message: '前后不能输入空格',
                            }
                        ]}
                    >
                        <TextArea
                            placeholder="店铺地址"
                        />
                    </Form.Item>
                    <Form.Item
                        name="tables"
                        label="餐桌数量"
                        rules={[
                            {
                                required: true,
                                message: '请輸入餐桌数'
                            }
                        ]}
                    >
                        <InputNumber min={1} max={500} />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    确认添加
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
                <Search placeholder="请输入店铺进行搜索" onSearch={this.searchRe} enterButton />
                <Divider />

                <Spin tip="数据加载中..." size="small" spinning={loading}>
                    <Table
                        rowSelection={{
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={datas}
                        pagination={{
                            pageSize: 4,
                        }}
                    />
                </Spin>
            </Modal>
        );
    }
}
export default AddModal;