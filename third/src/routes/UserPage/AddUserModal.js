import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { userRegister } from '../../services/user';

const HorizontalLoginForm = (props) => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState(); // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = async values => {
        const result = await userRegister({ name: values.username, password: values.password });
        if (result.exist === 1) {
            message.warning('该用户名已存在，请注册新用户名', 2);
        } else if (result.exist === 0) {
            message.success(`用户${result.name}创建成功`, 2);
            form.resetFields();
        }
    };

    return (
        <Modal
            visible={props.show}
            footer={null}
            title="预约吧"
            onCancel={props.handleCancel}
        >
            <Form form={form} name="horizontal_login" layout="horizontal" onFinish={onFinish}>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!'
                        }, {
                            pattern: /((^[^\s]).*([^\s]$))|(^[^\s]$)/g,
                            message: '前后不能输入空格',
                        }
                    ]}
                >
                    <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码!'
                        }, {
                            pattern: /\w{6,18}/g,
                            message: '密码在6-18位',
                        }
                    ]}
                >
                    <Input
                        size="large"
                        type="password"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                !form.isFieldsTouched(true) ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            添加用户
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default HorizontalLoginForm;