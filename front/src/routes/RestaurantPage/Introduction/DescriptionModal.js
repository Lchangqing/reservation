import { Modal, Input, Form, Button, Row, Col, Icon } from 'antd';
import { updateRe } from '../../../services/restaurant';
import React from 'react';
const { TextArea } = Input;
function hasErrors(fieldsError) {
    console.log('fieldsError', fieldsError);
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class DescriptionModal extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { description, id, additional } = this.props.ad;
                const newDescription = values.description;
                const newAdditional = values.additional;
                if (description !== newDescription || additional !== newAdditional) {
                    updateRe({ rid:id, datas: [{ name: 'additional', val: newAdditional }, { name: 'description', val: newDescription }] }).then(rsp => {
                        if (rsp) {
                            this.props.handleCancel();
                            this.props.updateVal({ description: newDescription, additional: newAdditional });
                        }
                    });
                }
            }
        });
    };
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const { description, additional } = this.props.ad;
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
                                    required: true,
                                    message: '请输入您的店铺介绍!'
                                }, {
                                    pattern: /((^[^\s]).*([^\s]$))|(^[^\s]$)/g,
                                    message: '前后不能输入空格',
                                }
                            ]
                        })(
                            <TextArea
                                prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="店铺介绍"
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
                                placeholder="店铺介绍补充"
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
export default Form.create({ name: ' DescriptionModal' })(DescriptionModal);