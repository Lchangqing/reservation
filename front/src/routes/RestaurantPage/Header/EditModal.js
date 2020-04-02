import { Modal, Input, Form, Button, Row, Col, Icon } from 'antd';
import { updateRe } from '../../../services/restaurant';
import React from 'react';
function hasErrors(fieldsError) {
    console.log('fieldsError', fieldsError);
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class EditModal extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { name, rid } = this.props;
                const newName = values.name;
                if (name !== newName) {
                    updateRe({ rid, datas: [{ name: 'name', val: newName }] }).then(rsp => {
                        if(rsp){
                            this.props.handleCancel();
                            this.props.updateName(newName);
                        }
                    });
                }
            }
        });
    };
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const { name } = this.props;
        const nameError = isFieldTouched('name') && getFieldError('name');
        return (
            <Modal
                visible={this.props.show}
                footer={null}
                title="预约吧"
                onCancel={this.props.handleCancel}
            >
                <Form layout='vertical' onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
                        {getFieldDecorator('name', {
                            initialValue:name,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入您的店铺名!'
                                }, {
                                    pattern: /((^[^\s]).*([^\s]$))|(^[^\s]$)/g,
                                    message: '前后不能输入空格',
                                }
                            ]
                        })(
                            <Input
                                prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="店铺名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item style={{ marginBottom: -10 }}>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                    修改
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
export default Form.create({ name: ' EditModal' })(EditModal);