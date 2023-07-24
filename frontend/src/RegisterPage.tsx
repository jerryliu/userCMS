import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Upload, Alert } from 'antd';
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
interface UploadChangeEvent {
  file: {
    size: number;
  };
}
const RegisterPage = () => {
  const [renderCount, setRenderCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [base64String, setBase64String] = useState('');
  useEffect(() => {
    setRenderCount((count) => count + 1);
  }, []);

  const onFinish = async (values: RegistFormValues) => {
    values.picture = base64String;
    var data = JSON.stringify({
      query: `mutation CreateUser($name: String!, $password: String!, $email:String!, $phone:String!, $picture:String!, $company:String!){
            createUser(
                data: {
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
        console.log(response.data, 'aa');
        if (response.data.errors == null) {
          navigate('/');
        } else {
          console.log(response.data.errors);
          setError(response.data.errors[0].message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
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

  function normFile() {}

  return (
    <div className="App">
      <Form
        {...layout}
        name="register"
        // className="register-form"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
          />
        )}
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
          <Input.Password />
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
          <Upload
            name="logo"
            listType="picture"
            beforeUpload={beforeUpload}
            // onChange={handleChange}
            maxCount={1}
          >
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
