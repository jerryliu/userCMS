import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

import './midPage.css';
interface LoginFormValues {
  email: string;
  password: string;
}
const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

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
          Cookies.remove('userData');
          Cookies.remove('userPicture');

          let userDataWithoutPicture = { ...response.data.data.login };
          delete userDataWithoutPicture.picture;
          Cookies.set('userData', JSON.stringify(userDataWithoutPicture));
          // Save the user's picture in another cookie
          Cookies.set('userPicture', response.data.data.login.picture);
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
