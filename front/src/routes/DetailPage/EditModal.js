import { Modal, Input, Form, Button, Row, Col, Icon, message } from 'antd';
import { editDish } from '../../services/restaurant';
import React from 'react';
const { TextArea } = Input;
function hasErrors(fieldsError) {
    console.log('fieldsError', fieldsError);
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class EditModal extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { description, additional } = values;
                const { one_command, two_command, id } = this.props.menu;
                if (description !== one_command || additional !== two_command) {
                    editDish({ one_command: description, two_command: additional, id }).then(rsp2 => {
                        if (rsp2) {
                            message.success('修改成功');
                            this.props.updateMenu({ one_command: description, two_command: additional });
                            this.props.handleCancel();
                        }
                    })
                } else {
                    return;
                }
            }
        });
    };
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const { one_command: description, two_command: additional } = this.props.menu;
        const descriptionError = isFieldTouched('description') && getFieldError('description');
        const additionalError = isFieldTouched('additional') && getFieldError('additional');
        return (
            <Modal
                visible={this.props.show}
                footer={null}
                title="预约吧"
                onCancel={this.props.handleCancel}
            >
                <Form layout='vertical' onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={descriptionError ? 'error' : ''} help={descriptionError || ''}>
                        {getFieldDecorator('description', {
                            initialValue: description,
                            rules: [
                                {
                                    pattern: /((^[^\s]).*([^\s]$))|(^[^\s]$)/g,
                                    message: '前后不能输入空格',
                                }
                            ]
                        })(
                            <TextArea
                                prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="菜品介绍"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={additionalError ? 'error' : ''} help={additionalError || ''}>
                        {getFieldDecorator('additional', {
                            initialValue: additional,
                            rules: [
                                {
                                    pattern: /((^[^\s]).*([^\s]$))|(^[^\s]$)/g,
                                    message: '前后不能输入空格',
                                }
                            ]
                        })(
                            <TextArea
                                prefix={<Icon type="tags" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="菜品介绍补充"
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