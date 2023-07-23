import { Form, Input, Button } from 'antd';
import axios from 'axios';
import './midPage.css';
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const onFinish = async (values: LoginFormValues) => {
    var data = JSON.stringify({
      query: `mutation Login ($email: String!, $password: String!){
        login(password:$password, email: $email) {
                name
                id
                email
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
        console.log(JSON.stringify(response.data));
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
