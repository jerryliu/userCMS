import React, { useContext } from 'react';
import { LikeOutlined } from '@ant-design/icons';

import { Descriptions, Table, Col, Row, Statistic } from 'antd';
import UserContext from './UserContext';
import './midPage.css';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
  },
];
type Friend = {
  name: string;
  phone: string;
  email: string;
  company: string | null;
};

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
  const dataSource = user.data.login.friends.map(
    (friend: Friend, index: number) => ({
      key: index, // generate a unique key
      name: friend.name,
      phone: friend.phone,
      email: friend.email,
      company: friend.company,
    })
  );
  return (
    <fieldset className="infor-list">
      <h2>Your Information</h2>
      <Row gutter={16} title="User Information">
        <Col span={3}>
          <Statistic
            title="Name"
            value={user.data.login.name}
            // prefix={<LikeOutlined />}
          />
        </Col>
        <Col span={3}>
          <Statistic title="Email" value={user.data.login.email} />
        </Col>
        <Col span={3}>
          <Statistic title="Phone" value={user.data.login.phone} />
        </Col>
        <Col span={3}>
          <Statistic title="Company" value={user.data.login.company} />
        </Col>
        <Col span={3}>
          <p>Picture</p>
          <img
            src={user.data.login.picture}
            alt={user.name}
            style={{ width: '50px', height: '50px' }}
          />
        </Col>
      </Row>
      <h2>Your Friend List</h2>
      <Table dataSource={dataSource} columns={columns} />
    </fieldset>
  );
};

export default UserInfoPage;
