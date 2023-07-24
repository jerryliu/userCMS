import { useContext, useState } from 'react';
import UserContext from './UserContext'; // Make sure to import UserContext
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

import './midPage.css';
interface LoginFormValues {
  email: string;
  password: string;
}
interface RegistFormValues {
  name: string;
  email: string;
  password: string;
  phone: string;
  picture: string;
  company: string;
}
const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const context = useContext(UserContext);
  if (!context) {
    // handle this situation differently, such as return null or throw an error
    return null;
  }

  const { setUser } = context;
  const onFinish = async (values: LoginFormValues) => {
    var data = JSON.stringify({
      query: `mutation Login ($email: String!, $password: String!){
        login(password:$password, email: $email) {
                
              id
              name
              email
              phone
              company
              picture
                friends{
                  name
                  phone
                  email
                  company
                }
            }
        }`,
      variables: { email: values.email, password: values.password },
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
        if (response.data.data !== null) {
          setUser(response.data);
          Cookies.set('userData', JSON.stringify(response.data.data.login));

          navigate(`/userinfo/${response.data.data.login.id}`);
        } else {
          setError(
            'Login failed. Please check your credentials and try again.'
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginPage;
