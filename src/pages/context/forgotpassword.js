import React from 'react'
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function Forgotpassword() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh', width: '100vw'}}>
    <div style={{width: '30vw', height: '60vh', justifyContent: 'center', alignItems: 'center'}}>
        <img src='' alt='Logo' style={{justifyContent: 'center', display: 'flex', alignItems: 'center'}}/>
        <h2 style={{fontWeight:'unset', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>Smartphone</h2>
        <div style={{border: '0 solid black', borderRadius: '10px 10px 10px 10px',marginTop: '30px',display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFE8ED'}}> 
            <div style={{marginTop: '25px'}}>
            <Form
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            style={{
            maxWidth: 600,
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Email"
            name="email"
            rules={[
                {
                required: true,
                message: 'Please input your email!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Lấy lại mật khẩu"
            name="lấy lại mmật khẩu"
            rules={[
                {
                required: true,
                message: 'Please input your forgotpassword!',
                },
            ]}
            >
            <Input.Password />
            </Form.Item>
            <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Link to={'/login'}>
            <Button type="primary" htmlType="đăng nhập">
                Đăng nhập
            </Button>
            </Link>
            </Form.Item>
        </Form>
        </div>    
        </div>
    </div>
    </div>
  )
}

export default Forgotpassword