import React, { useContext } from 'react';
import { Descriptions, Avatar } from 'antd';
import UserContext from './UserContext';
import './midPage.css';
const UserInfoPage = () => {
  console.log(useContext(UserContext), 'dddddd');
  const context = useContext(UserContext);

  if (!context) {
    // handle this situation differently, such as return null or throw an error
    return null;
  }

  const { user } = context;

  if (!user) {
    return <p>No user logged in</p>;
  }

  return (
    <div className="App">
      <Descriptions title="User Info" layout="vertical" bordered>
        <Descriptions.Item label="Name">
          {user.data.login.name}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {user.data.login.email}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          {user.data.login.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Company">
          {user.data.login.company}
        </Descriptions.Item>
        <Descriptions.Item label="Picture">
          <img
            src={user.data.login.picture}
            alt={user.name}
            style={{ width: '50px', height: '50px' }}
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default UserInfoPage;
