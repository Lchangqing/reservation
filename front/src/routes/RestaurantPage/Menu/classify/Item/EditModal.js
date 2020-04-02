import { Modal, message, Form, Button, Row, Col, Icon, Upload, Input, InputNumber } from 'antd';
import React from 'react';
import { editDish, uploadDish } from '../../../../../services/restaurant';
const { TextArea } = Input;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: null,
            img: ''
        };
    }
    beforeUpload = (file) => {
        getBase64(file, imageUrl =>
            this.setState({
                imageUrl,
                loading: false,
                fileList: file
            }),
        );
        return false;
    }



    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { fileList } = this.state;
                const { name, price, describe } = values;
                const { id } = this.props.details;
                const formData = new FormData();
                formData.append('file', fileList);
                if (!fileList) {
                    editDish({ name, price, id, describe }).then(rsp2 => {
                        if (rsp2) {
                            message.success('修改成功');
                            this.props.updateMenu();
                            this.props.handleCancel();
                        }
                    })
                } else {
                    uploadDish(formData).then(rsp => {
                        if (rsp) {
                            editDish({ name, price, id, img: rsp.url, describe }).then(rsp2 => {
                                if (rsp2) {
                                    message.success('修改成功');
                                    this.setState({ imageUrl: '' })
                                    this.props.updateMenu();
                                    this.props.handleCancel();
                                }
                            })
                        }
                    })
                }
                this.props.form.resetFields();
            }
        });
    };
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const { imageUrl } = this.state;
        const { describe, name, price } = this.props.details;
        const nameError = isFieldTouched('name') && getFieldError('name');
        const priceError = isFieldTouched('price') && getFieldError('price');
        const describeError = isFieldTouched('describe') && getFieldError('describe');
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Modal
                visible={this.props.show}
                title="预约吧"
                onCancel={this.props.handleCancel}
                footer={null}
            >
                <Form layout='vertical' onSubmit={this.handleSubmit}>
                    <Form.Item label="菜品图">
                        {getFieldDecorator('img')(
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={this.beforeUpload}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item label="菜品价格" validateStatus={priceError ? 'error' : ''} help={priceError || ''}>
                        {getFieldDecorator('price', {
                            initialValue: price,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入价格!'
                                }
                            ]
                        })(
                            <InputNumber
                                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="菜品名字" validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入菜名!'
                                }, {
                                    pattern: /((^[^\s]).*([^\s]$))|(^[^\s]$)/g,
                                    message: '前后不能输入空格',
                                }
                            ]
                        })(
                            <TextArea
                                prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="菜品名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="菜品描述" validateStatus={describeError ? 'error' : ''} help={describeError || ''}>
                        {getFieldDecorator('describe', {
                            initialValue: describe,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入菜品描述!'
                                }, {
                                    pattern: /((^[^\s]).*([^\s]$))|(^[^\s]$)/g,
                                    message: '前后不能输入空格',
                                }
                            ]
                        })(
                            <TextArea
                                prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="菜品描述"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item style={{ marginBottom: -10 }}>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                    确认修改
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
export default Form.create({ name: ' EditModal' })(EditModal);