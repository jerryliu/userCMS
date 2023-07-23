import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './midPage.css';
interface RegistFormValues {
  name: string;
  email: string;
  password: string;
  phone: string;
  picture: string;
  company: string;
}

const RegisterPage = () => {
  const [renderCount, setRenderCount] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [base64String, setBase64String] = useState('');
  useEffect(() => {
    setRenderCount((count) => count + 1);
  }, []);

  const onFinish = async (values: RegistFormValues) => {
    console.log(base64String, 'base64 string');
    values.picture = base64String;
    var data = JSON.stringify({
      query: `mutation CreateUser($name: String!, $password: String!, $email:String!, $phone:String!, $picture:String!, $company:String!){
            createUser(
                input: {
                name: $name
                email: $email
                password: $password
                phone: $phone
                picture:$picture
                company:$company
                }
            ) {
                name
            }
        }`,
      variables: {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        picture: values.picture,
        company: values.company,
      },
    });

    var config = {
      method: 'post',
      url: 'http://localhost:3000/graphql',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const beforeUpload = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setBase64String(reader.result);
      }
    };

    reader.readAsDataURL(file);

    // Return false here to prevent automatically uploading the file
    return false;
  };

  function normFile(...args: any) {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="App">
      <Form
        name="register"
        className="register-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'The input is not a valid Email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Company"
          name="company"
          rules={[
            {
              required: true,
              message: 'Please input your company name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Profile Picture"
          name="picture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              //   required: true,
              required: false,
              message: 'Please upload your profile picture!',
            },
          ]}
        >
          <Upload name="logo" listType="picture" beforeUpload={beforeUpload}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Register
          </Button>
        </Form.Item>
        <p>Render count: {renderCount}</p>
      </Form>
    </div>
  );
};

export default RegisterPage;
