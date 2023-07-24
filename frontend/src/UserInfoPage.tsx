import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { columns } from './columns';
import { Table, Col, Row, Statistic, Button } from 'antd';
import './midPage.css';
type Friend = {
  name: string;
  phone: string;
  email: string;
  company: string | null;
};
type UserDataType = {
  name: string;
  email: string;
  phone: string;
  company: string;
  picture: string;
  friends: Friend[];
};
const UserInfoPage = () => {
  const { id } = useParams(); // get the id from the URL
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false); // Initialize isOwner state to false
  const dataSource = userData?.friends?.map(
    (friend: Friend, index: number) => ({
      key: index, // generate a unique key
      name: friend.name,
      phone: friend.phone,
      email: friend.email,
      company: friend.company,
    })
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cookieData = Cookies.get('userData'); // replace 'user' with the key you used to store the user data in the cookie
        const user = cookieData ? JSON.parse(cookieData) : null;
        if (user && user.id === id) {
          setIsOwner(true);
          setUserData(user);
        } else {
          // setOwner(false);
          // User is not owner
          var data = JSON.stringify({
            query: `query getUser($id:Int!){
                      user(id:$id){
                        name
                        email
                        phone
                        company
                        picture
                        
                      }
                    }`,
            variables: { id: Number(id) },
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
              setUserData(response.data.data.user);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);
  const addFriend = async () => {
    try {
      var data = JSON.stringify({
        query: `mutation addFriend($userId:ID!, $friendId:ID!){
                  addFriend(data:{userId:$userId, friendId:$friendId}){
                    name
                  }
                }`,
        variables: { userId: 4, friendId: 6 },
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
    } catch (error) {
      // Handle the error here...
      console.error('An error occurred while adding the friend:', error);
    }
  };
  if (loading) return <div>Loading...</div>;

  return (
    <fieldset className="infor-list">
      <h2>
        {isOwner ? 'Your Information' : `${userData?.name}'s Information`}
      </h2>
      <Row gutter={16} title="User Information">
        <Col span={3}>
          <Statistic title="Name" value={userData?.name || ''} />
        </Col>
        <Col span={3}>
          <Statistic title="Email" value={userData?.email || ''} />
        </Col>
        <Col span={3}>
          <Statistic title="Phone" value={userData?.phone || ''} />
        </Col>
        <Col span={3}>
          <Statistic title="Company" value={userData?.company || ''} />
        </Col>
        <Col span={3}>
          <p>Picture</p>
          <img
            src={userData?.picture}
            alt={userData?.name}
            style={{ width: '50px', height: '50px' }}
          />
        </Col>
      </Row>
      {isOwner ? (
        <>
          <h1>Your Friends List</h1>
          <Table dataSource={dataSource || []} columns={columns} />
        </>
      ) : (
        <Button type="primary" onClick={addFriend}>
          Add Friend
        </Button>
      )}
    </fieldset>
  );
};

export default UserInfoPage;
