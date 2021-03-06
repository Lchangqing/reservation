import React from 'react';
import { connect } from 'dva'
import { Modal, Form, Input, Button, Icon, Row, Col, message } from 'antd';
import cookie from 'react-cookies';
import { userGetUsersInfo } from '../../../models/actionType';
import { userRegister } from '../../../services/user';
import Coding from './Coding';
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
            shouldUpdate: false
        }
    }
    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        const { buttonv } = this.props;
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                if (buttonv === 'l') {
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
                        message.error('用户名或密码有误', 2)
                    }
                } else {
                    const result = await userRegister({ name: values.name, password: values.password });
                    if (result.exist === 1) {
                        message.warning('该用户名已存在，请注册新用户名', 2);
                    } else if (result.exist === 0) {
                        message.success(`用户${result.name}创建成功`, 2);
                    }
                    console.log('userRegister', result)
                }
                this.props.form.resetFields();
                this.setState({ shouldUpdate: true })

            }
        });
    };
    switchUpdate = () => {
        this.setState({ shouldUpdate: false });
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const { buttonv } = this.props;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('name') && getFieldError('name');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        console.log('usernameError', usernameError, 'passwordError', passwordError);
        return (
            <Modal
                visible={this.props.show}
                footer={null}
                title="预约吧"
                onCancel={this.props.handleCancel}
            >
                <Form layout='vertical' onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入您的用户名!'
                                }, {
                                    pattern: /((^[^\s]).*([^\s]$))|(^[^\s]$)/g,
                                    message: '前后不能输入空格',
                                }
                            ],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入您的密码!'
                                }, {
                                    pattern: /\w{6,18}/g,
                                    message: '密码在6-18位',
                                }
                            ],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Coding form={this.props.form} shouldUpdate={this.state.shouldUpdate} switchUpdate={this.switchUpdate} />
                    <Form.Item style={{ marginBottom: -10 }}>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                    {buttonv === 'l' ? '登录' : '注册'}
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