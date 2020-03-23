import React from 'react';
import { connect } from 'dva'
import { Modal, Form, Input, Button, Icon, Row, Col, message } from 'antd';
import cookie from 'react-cookies';
import { userGetUsersInfo } from '../../../models/actionType';
function mapStateToProps(state) {
    return { user: state.user };
}
function hasErrors(fieldsError) {
    console.log('fieldsError', fieldsError);
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class NewModuleModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            show: this.props.show,
            button: 'l'
        }
    }
    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        const { button } = this.state;
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                if (button === 'l') {
                    await this.props.dispatch({
                        type: userGetUsersInfo,
                        payload: { name: values.name, password: values.password }
                    })
                    const { userinfo } = this.props.user;
                    if (userinfo) {
                        cookie.save('user', userinfo);
                        this.props.handleCancel();
                        this.props.updateUserInfo(userinfo)
                    } else {
                        message.config({
                            top: 60
                          });
                        message.error('用户名或密码有误',2)
                    }
                }
                console.log('Received values of form: ', values);

            }
        });
    };
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Modal
                visible={this.props.show}
                footer={null}
                title="订餐吧"
                onCancel={this.props.handleCancel}
            >
                <Form layout='vertical' onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入您的用户名!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入您的密码!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item style={{ marginBottom: -10 }}>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button onClick={() => this.setState({ button: 'l' })} type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                    登录
                                </Button>
                                <Button onClick={() => this.setState({ button: 'r' })} type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} style={{ marginLeft: 10 }}>
                                    注册
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

const WrappedNewModuleModal = Form.create({ name: ' NewModuleModal' })(NewModuleModal);
export default connect(mapStateToProps)(WrappedNewModuleModal);